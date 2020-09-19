import { createError, ErrorName } from '../../error'

export const TermDependencyGraph = ({ ...props } = {}) => ({ ...props })

/**
 * Add direct dependency and normalize the graph.
 *
 * @param {TermDependencyGraph} graph
 * @param {number} dependent
 * @param {...number} dependencies
 * @returns {TermDependencyGraph}
 */
TermDependencyGraph.addDependencies = (graph, dependent, ...dependencies) => {
  if (graph[dependent] !== undefined) {
    throw createError(ErrorName.TERM_ALREADY_USED, undefined, dependent)
  }

  if (dependencies.length === 0) return graph

  const cycleInducingDependency = dependencies.find(
    dependency => TermDependencyGraph.hasDependency(graph, dependency, dependent)
  )
  if (cycleInducingDependency !== undefined) {
    throw createError(ErrorName.CYCLIC_DEPENDENCIES, undefined, cycleInducingDependency)
  }

  let result = { ...graph, [dependent]: new Set() }

  dependencies.forEach(dependency => {
    result = normalize(result, dependent, dependency)
    result[dependent].add(dependency)
  })

  return result
}

/**
 * Check whether graph has direct or transitive dependency between `dependent` and `dependency`.
 *
 * @param {TermDependencyGraph} graph
 * @param {number} dependent
 * @param {number} dependency
 * @param {Set<number>} traversed - For tracking traversed dependencies in order to avoid infinite
 * recursion.
 * @returns {boolean}
 */
TermDependencyGraph.hasDependency = (graph, dependent, dependency, traversed = new Set()) => {
  if (traversed.has(dependent)) throw new Error('Infinite recursion error')
  traversed.add(dependent)

  const directDependencies = graph[dependent]
  if (directDependencies === undefined) return false
  if (directDependencies.has(dependency)) return true

  return [...directDependencies].some(
    directDependency =>
      TermDependencyGraph.hasDependency(graph, directDependency, dependency, traversed)
  )
}

/**
 * Find all direct dependents of `dependency`.
 *
 * @param {TermDependencyGraph} graph
 * @param {number} dependency
 * @returns {number[]}
 */
TermDependencyGraph.getDirectDependents = (graph, dependency) =>
  Object
    .entries(graph)
    .filter(([, dependencies]) => dependencies.has(dependency))
    .map(([dependent]) => parseInt(dependent, 10))

/**
 * Find all direct or transitive dependencies of `dependent`.
 *
 * @param {TermDependencyGraph} graph
 * @param {number} dependent
 * @param {Set<number>} traversed - For tracking traversed dependents in order to avoid infinite
 * recursion.
 * @returns {number[]}
 */
TermDependencyGraph.getDependencies = (graph, dependent, traversed = new Set()) => {
  if (traversed.has(dependent)) throw new Error('Infinite recursion error')
  traversed.add(dependent)

  const directDependencies = graph[dependent]
  if (directDependencies === undefined) return []

  const transitiveDependencies = []
  directDependencies.forEach(directDependency => {
    transitiveDependencies.push(
      ...TermDependencyGraph.getDependencies(graph, directDependency, traversed)
    )
  })

  return [...directDependencies, ...transitiveDependencies]
}

TermDependencyGraph.hasDirectDependency = (graph, dependent, dependency) => {
  const directDependencies = graph[dependent]
  if (directDependencies === undefined) return false
  return directDependencies.has(dependency)
}

TermDependencyGraph.getDependents = (graph, dependency, traversed = new Set()) => {
  if (traversed.has(dependency)) throw new Error('Infinite recursion error')
  traversed.add(dependency)

  const directDependents = TermDependencyGraph.getDirectDependents(graph, dependency)

  const transitiveDependents = []
  directDependents.forEach(dependent => {
    transitiveDependents.push(...TermDependencyGraph.getDependents(graph, dependent, traversed))
  })

  return [...directDependents, ...transitiveDependents]
}

/**
 * Remove direct dependencies which would become redundant if direct dependency between `dependent`
 * and `dependency` was introduced.
 *
 * @param {TermDependencyGraph} graph
 * @param {number} dependent
 * @param {number} dependency
 * @returns {TermDependencyGraph}
 */
const normalize = (graph, dependent, dependency) => {
  const normalizedDownwards = normalizeDownwards(graph, dependent, dependency, true)

  const furtherDependents =
    TermDependencyGraph.getDirectDependents(normalizedDownwards, dependent)

  return furtherDependents.reduce(
    (intermediateGraph, furtherDependent) =>
      normalizeDownwards(intermediateGraph, furtherDependent, dependency),
    normalizedDownwards
  )
}

/**
 * Remove direct dependencies which would become redundant if direct dependency between `dependent`
 * and `dependency` was introduced.
 *
 * It looks only downstream from `dependent` (only its descendants are considered).
 *
 * @param {TermDependencyGraph} graph
 * @param {number} dependent
 * @param {number} dependency
 * @param {boolean} isRoot - this flag is used to recognize that recursive call is not the first one
 * (on root) because that's a special case which has to be handled differently.
 * @returns {TermDependencyGraph}
 */
const normalizeDownwards = (graph, dependent, dependency, isRoot = false) => {
  if (!isRoot && TermDependencyGraph.hasDirectDependency(graph, dependent, dependency)) {
    return removeDirectDependency(graph, dependent, dependency)
  }

  const transitiveDependencies = graph[dependency]

  if (transitiveDependencies === undefined) return graph

  return [...transitiveDependencies].reduce(
    (intermediateGraph, transitiveDependency) =>
      normalizeDownwards(intermediateGraph, dependent, transitiveDependency),
    graph
  )
}

/**
 * Remove direct dependency if it exists.
 *
 * @param {TermDependencyGraph} graph
 * @param {number} dependent
 * @param {number} dependency
 * @returns {TermDependencyGraph}
 */
const removeDirectDependency = (graph, dependent, dependency) => {
  const dependencies = graph[dependent]
  if (dependencies === undefined) return graph

  const newDependencies = new Set(dependencies)
  newDependencies.delete(dependency)

  const result = { ...graph }

  if (newDependencies.size === 0) {
    delete result[dependent]
  } else {
    result[dependent] = newDependencies
  }

  return result
}
