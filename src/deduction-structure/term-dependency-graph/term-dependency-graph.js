import { createError, ErrorName } from '../../error'

// `TermDependencyGraph` is a mapping between symbol's id (**dependent**) and a set of symbol ids on
// which it depends on (**dependencies**). It's important to note that `TermDependencyGraph`
// contains only ids, not the actual symbol objects. Whenever we mention a symbol in this context
// it's the symbol's id - not the actual symbol object - we are talking about.
export const TermDependencyGraph = ({ ...props } = {}) => ({ ...props })

// Adds direct dependency between `dependent` and `dependencies` and normalize the graph.
TermDependencyGraph.addDependencies = (graph, dependent, ...dependencies) => {
  if (graph[dependent] !== undefined) {
    throw createError(ErrorName.TERM_ALREADY_USED, undefined, dependent)
  }

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

// Checks whether `graph` has direct or transitive dependency between `dependent` and `dependency`.
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

// Finds all direct dependents of `dependency` and return them as an array.
TermDependencyGraph.getDirectDependents = (graph, dependency) =>
  Object
    .entries(graph)
    .filter(([, dependencies]) => dependencies.has(dependency))
    .map(([dependent]) => parseInt(dependent, 10))

// Finds all direct or transitive dependencies of `dependent` and return them as an array.
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

// Removes direct dependencies which would become redundant if direct dependency between `dependent`
// and `dependency` was introduced to the `graph`.
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

// Removes direct dependencies which would become redundant if direct dependency between `dependent`
// and `dependency` was introduced. It looks only downstream from `dependent` i.e. only its
// descendants are considered.
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

// Removes direct dependency between `dependent` and `dependency` if it exists.
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
