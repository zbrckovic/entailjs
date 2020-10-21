import { createError, ErrorName } from '../../error'

// `TermDependencyGraph` is a mapping between symbol's id (**dependent**) and a set of symbol ids on
// which it depends on (**dependencies**). It's important to note that `TermDependencyGraph`
// contains only ids, not the actual symbol objects. Whenever we mention a symbol in this context
// it's the symbol's id - not the actual symbol object - we are talking about.
export const TermDependencyGraph = ({ ...props } = {}) => ({ ...props })

// Adds direct dependency between `dependentTerm` and `dependencyTerms` and normalizes the graph.
// Calls `onRemove` whenever dependencies are removed on normalization.
TermDependencyGraph.addDependencies = (graph, dependentTerm, dependencyTerms = [], onRemove) => {
  if (graph[dependentTerm] !== undefined) {
    throw createError(ErrorName.TERM_ALREADY_USED, undefined, dependentTerm)
  }

  const cycleInducingDependency = dependencyTerms.find(
    dependencyTerm => TermDependencyGraph.hasDependency(graph, dependencyTerm, dependentTerm)
  )
  if (cycleInducingDependency !== undefined) {
    throw createError(ErrorName.CYCLIC_DEPENDENCIES, undefined, cycleInducingDependency)
  }

  let result = { ...graph, [dependentTerm]: new Set() }
  dependencyTerms.forEach(dependencyTerm => {
    result = normalize(result, dependentTerm, dependencyTerm, onRemove)

    if (result[dependentTerm] === undefined) {
      result[dependentTerm] = new Set()
    }

    result[dependentTerm].add(dependencyTerm)
  })

  return result
}

// Checks whether `graph` has direct or transitive dependency between `dependentTerm` and
// `dependencyTerm`.
TermDependencyGraph.hasDependency = (
  graph,
  dependentTerm,
  dependencyTerm,
  traversed = new Set()
) => {
  if (traversed.has(dependentTerm)) throw new Error('Infinite recursion error.')
  traversed.add(dependentTerm)

  const directDependencyTerms = graph[dependentTerm]
  if (directDependencyTerms === undefined) return false
  if (directDependencyTerms.has(dependencyTerm)) return true

  return [...directDependencyTerms].some(
    directDependencyTerm =>
      TermDependencyGraph.hasDependency(graph, directDependencyTerm, dependencyTerm, traversed)
  )
}

// Finds all direct dependent terms of `dependencyTerm` and return them as an array.
TermDependencyGraph.getDirectDependents = (graph, dependencyTerm) =>
  Object
    .entries(graph)
    .filter(([, dependencyTerms]) => dependencyTerms.has(dependencyTerm))
    .map(([dependentTerm]) => parseInt(dependentTerm, 10))

// Finds all direct or transitive dependency terms of `dependentTerm` and return them as an array.
TermDependencyGraph.getDependencies = (graph, dependentTerm, traversed = new Set()) => {
  if (traversed.has(dependentTerm)) throw new Error('Infinite recursion error')
  traversed.add(dependentTerm)

  const directDependencyTerms = graph[dependentTerm]
  if (directDependencyTerms === undefined) return []

  const transitiveDependencyTerms = []
  directDependencyTerms.forEach(directDependency => {
    transitiveDependencyTerms.push(
      ...TermDependencyGraph.getDependencies(graph, directDependency, traversed)
    )
  })

  return [...directDependencyTerms, ...transitiveDependencyTerms]
}

TermDependencyGraph.hasDirectDependency = (graph, dependentTerm, dependencyTerm) => {
  const directDependencyTerms = graph[dependentTerm]
  if (directDependencyTerms === undefined) return false
  return directDependencyTerms.has(dependencyTerm)
}

TermDependencyGraph.getDependents = (graph, dependencyTerm, traversed = new Set()) => {
  if (traversed.has(dependencyTerm)) throw new Error('Infinite recursion error.')
  traversed.add(dependencyTerm)

  const directDependencyTerms = TermDependencyGraph.getDirectDependents(graph, dependencyTerm)

  const transitiveDependentTerms = []
  directDependencyTerms.forEach(dependentTerm => {
    transitiveDependentTerms.push(
      ...TermDependencyGraph.getDependents(graph, dependentTerm, traversed)
    )
  })

  return [...directDependencyTerms, ...transitiveDependentTerms]
}

// Removes direct dependencies which would become redundant if direct dependency between
// `dependentTerm` and `dependencyTerm` was introduced to the `graph`.
const normalize = (graph, dependentTerm, dependencyTerm, onRemove) => {
  const normalizedDownwards = normalizeDownwards(
    graph,
    dependentTerm,
    dependencyTerm,
    onRemove,
    true
  )

  const furtherDependentTerms =
    TermDependencyGraph.getDirectDependents(normalizedDownwards, dependentTerm)

  return furtherDependentTerms.reduce(
    (intermediateGraph, furtherDependentTerm) =>
      normalizeDownwards(intermediateGraph, furtherDependentTerm, dependencyTerm, onRemove),
    normalizedDownwards
  )
}

// Removes direct dependencies which would become redundant if direct dependency between
// `dependentTerm` and `dependencyTerm` was introduced. It looks only downstream from
// `dependentTerm` i.e. only its descendants are considered. Calls `onRemove` whenever dependency
// is removed.
const normalizeDownwards = (graph, dependentTerm, dependencyTerm, onRemove, isRoot = false) => {
  if (!isRoot && TermDependencyGraph.hasDirectDependency(graph, dependentTerm, dependencyTerm)) {
    onRemove?.(dependentTerm, dependencyTerm)
    return removeDirectDependency(graph, dependentTerm, dependencyTerm)
  }

  const transitiveDependencyTerms = graph[dependencyTerm]

  if (transitiveDependencyTerms === undefined) return graph

  return [...transitiveDependencyTerms].reduce(
    (intermediateGraph, transitiveDependencyTerm) =>
      normalizeDownwards(intermediateGraph, dependentTerm, transitiveDependencyTerm, onRemove),
    graph
  )
}

// Removes direct dependency between `dependentTerm` and `dependencyTerm` if it exists.
const removeDirectDependency = (graph, dependentTerm, dependencyTerm) => {
  const dependencyTerms = graph[dependentTerm]
  if (dependencyTerms === undefined) return graph

  const newDependencyTerms = new Set(dependencyTerms)
  newDependencyTerms.delete(dependencyTerm)

  const result = { ...graph }

  if (newDependencyTerms.size === 0) {
    delete result[dependentTerm]
  } else {
    result[dependentTerm] = newDependencyTerms
  }

  return result
}
