import { createError, ErrorName } from '../../error'

export const TermDependencyGraph = ({ ...props }) => ({ ...props })

/** Add direct dependency and normalize graph. */
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

TermDependencyGraph.hasDependency = (graph, dependent, dependency, traversed = new Set()) => {
  if (traversed.has(dependent)) throw new Error('Infinite recursion error')
  traversed.add(dependent)

  const dependencies = graph[dependent]
  if (dependencies === undefined) return false
  if (dependencies.has(dependency)) return true

  return [...dependencies]
    .some(sym => TermDependencyGraph.hasDependency(graph, sym, dependency, traversed))
}

TermDependencyGraph.getDirectDependents = (graph, sym) =>
  new Set(
    Object
      .entries(graph)
      .filter(([, dependencies]) => dependencies.has(sym))
      .map(([dependent]) => dependent)
  )

TermDependencyGraph.getDependencies = (graph, sym, traversed = new Set()) => {
  if (traversed.has(sym)) throw new Error('Infinite recursion error')
  traversed = traversed.add(sym)

  const directDependencies = this.dependencies.get(sym, Set())

  return directDependencies.reduce(
    (acc, dependent) => acc.union(TermDependencyGraph.getDependencies(graph, dependent, traversed)),
    directDependencies
  )
}

TermDependencyGraph.hasDirectDependency = (graph, dependent, dependency) =>
  graph[dependent]?.has(dependency) || false

TermDependencyGraph.getDependents = (graph, sym, traversed = Set()) => {
  if (traversed.contains(sym)) throw new Error('Infinite recursion error')
  traversed = traversed.add(sym)

  const directDependents = TermDependencyGraph.getDirectDependents(graph, sym)

  const transitiveDependents = directDependents.flatMap(
    directDependent => TermDependencyGraph.getDependents(graph, directDependent, traversed)
  )

  return [...directDependents, ...transitiveDependents]
}

/** Remove redundant direct dependencies if transitive dependencies exist. */
const normalize = (graph, dependent, dependency) => {
  const normalizedDownwards = normalizeDownwards(graph, dependent, dependency, true)

  return TermDependencyGraph
    .getDirectDependents(normalizedDownwards, dependent)
    .reduce(
      (g, furtherDependent) => normalizeDownwards(g, furtherDependent, dependency),
      normalizedDownwards
    )
}

const normalizeDownwards = (graph, dependent, dependency, isRoot = false) => {
  if (!isRoot && TermDependencyGraph.hasDirectDependency(graph, dependent, dependency)) {
    return removeDirectDependency(graph, dependent, dependency)
  }

  const transitiveDependencies = graph[dependency]

  if (transitiveDependencies === undefined) return graph

  return [...transitiveDependencies].reduce(
    (graph, transitiveDependency) => normalizeDownwards(graph, dependent, transitiveDependency),
    graph
  )
}

const removeDirectDependency = (graph, dependent, dependency) => {
  const dependencyTerms = graph[dependent]
  if (dependencyTerms === undefined) return graph

  const newDependencyTerms = new Set(dependencyTerms)
  newDependencyTerms.delete(dependency)

  const result = { ...graph }

  if (newDependencyTerms.size === 0) delete result[dependency]

  return result
}
