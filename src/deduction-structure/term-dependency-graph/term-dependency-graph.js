import _ from 'lodash'
import { createError, ErrorName } from '../../error'

// `TermDependencyGraph` is a mapping between symbol's id (**dependent**) and a set of symbol ids on
// which it depends on (**dependencies**). It's important to note that `TermDependencyGraph`
// contains only ids, not the actual symbol objects. Whenever we mention a symbol in this context
// it's the symbol's id - not the actual symbol object - we are talking about.
export const TermDependencyGraph = ({ ...props } = {}) =>
  _.create(TermDependencyGraph.prototype, { map: { ...props } })

_.assign(TermDependencyGraph.prototype, {
  constructor: TermDependencyGraph,

  getDirectDependencies (dependent) {
    return this.map[dependent]
  },

  setDirectDependencies (dependent, dependencies) {
    this.map[dependent] = dependencies
  },

  deleteDirectDependencies (dependent) {
    delete this.map[dependent]
  },

  // Adds direct dependency between `dependentTerm` and `dependencyTerms` and normalizes the graph.
  // Calls `onRemove` whenever dependencies are removed on normalization.
  addDependencies (dependentTerm, dependencyTerms = [], onRemove) {
    if (this.getDirectDependencies(dependentTerm) !== undefined) {
      throw createError(ErrorName.TERM_ALREADY_USED, undefined, dependentTerm)
    }

    const cycleInducingDependency = dependencyTerms.find(
      dependencyTerm => this.hasDependency(dependencyTerm, dependentTerm)
    )
    if (cycleInducingDependency !== undefined) {
      throw createError(ErrorName.CYCLIC_DEPENDENCIES, undefined, cycleInducingDependency)
    }

    let result = this.constructor({ ...this.map, [dependentTerm]: new Set() })
    dependencyTerms.forEach(dependencyTerm => {
      result = result._normalize(dependentTerm, dependencyTerm, onRemove)

      if (result.getDirectDependencies(dependentTerm) === undefined) {
        result.setDirectDependencies(dependentTerm, new Set())
      }

      result.getDirectDependencies(dependentTerm).add(dependencyTerm)
    })

    return result
  },

  // Checks whether `graph` has direct or transitive dependency between `dependentTerm` and
  // `dependencyTerm`.
  hasDependency (
    dependentTerm,
    dependencyTerm,
    traversed = new Set()
  ) {
    if (traversed.has(dependentTerm)) throw new Error('Infinite recursion error.')
    traversed.add(dependentTerm)

    const directDependencyTerms = this.getDirectDependencies(dependentTerm)
    if (directDependencyTerms === undefined) return false
    if (directDependencyTerms.has(dependencyTerm)) return true

    return [...directDependencyTerms].some(
      directDependencyTerm => this.hasDependency(directDependencyTerm, dependencyTerm, traversed)
    )
  },

  getEntries () {
    return Object.entries(this.map)
  },

  // Finds all direct dependent terms of `dependencyTerm` and return them as an array.
  getDirectDependents (dependencyTerm) {
    return this
      .getEntries()
      .filter(([, dependencyTerms]) => dependencyTerms.has(dependencyTerm))
      .map(([dependentTerm]) => parseInt(dependentTerm, 10))
  },

  // Finds all direct or transitive dependency terms of `dependentTerm` and return them as an array.
  getDependencies (dependentTerm, traversed = new Set()) {
    if (traversed.has(dependentTerm)) throw new Error('Infinite recursion error')
    traversed.add(dependentTerm)

    const directDependencyTerms = this.getDirectDependencies(dependentTerm)
    if (directDependencyTerms === undefined) return []

    const transitiveDependencyTerms = []
    directDependencyTerms.forEach(directDependency => {
      transitiveDependencyTerms.push(...this.getDependencies(directDependency, traversed))
    })

    return [...directDependencyTerms, ...transitiveDependencyTerms]
  },

  hasDirectDependency (dependentTerm, dependencyTerm) {
    const directDependencyTerms = this.getDirectDependencies(dependentTerm)
    if (directDependencyTerms === undefined) return false
    return directDependencyTerms.has(dependencyTerm)
  },

  getDependents (dependencyTerm, traversed = new Set()) {
    if (traversed.has(dependencyTerm)) throw new Error('Infinite recursion error.')
    traversed.add(dependencyTerm)

    const directDependencyTerms = this.getDirectDependents(dependencyTerm)

    const transitiveDependentTerms = []
    directDependencyTerms.forEach(dependentTerm => {
      transitiveDependentTerms.push(...this.getDependents(dependentTerm, traversed))
    })

    return [...directDependencyTerms, ...transitiveDependentTerms]
  },

  // Removes direct dependencies which would become redundant if direct dependency between
  // `dependentTerm` and `dependencyTerm` was introduced to the `graph`.
  _normalize (dependentTerm, dependencyTerm, onRemove) {
    const normalizedDownwards = this._normalizeDownwards(
      dependentTerm,
      dependencyTerm,
      onRemove,
      true
    )

    const furtherDependentTerms = normalizedDownwards.getDirectDependents(dependentTerm)

    return furtherDependentTerms.reduce(
      (intermediateGraph, furtherDependentTerm) =>
        intermediateGraph._normalizeDownwards(furtherDependentTerm, dependencyTerm, onRemove),
      normalizedDownwards
    )
  },

  // Removes direct dependencies which would become redundant if direct dependency between
  // `dependentTerm` and `dependencyTerm` was introduced. It looks only downstream from
  // `dependentTerm` i.e. only its descendants are considered. Calls `onRemove` whenever dependency
  // is removed.
  _normalizeDownwards (dependentTerm, dependencyTerm, onRemove, isRoot = false) {
    if (!isRoot && this.hasDirectDependency(dependentTerm, dependencyTerm)) {
      onRemove?.(dependentTerm, dependencyTerm)
      return this._removeDirectDependency(dependentTerm, dependencyTerm)
    }

    const transitiveDependencyTerms = this.getDirectDependencies(dependencyTerm)
    if (transitiveDependencyTerms === undefined) return this

    return TermDependencyGraph(
      [...transitiveDependencyTerms].reduce(
        (intermediateGraph, transitiveDependencyTerm) =>
          intermediateGraph._normalizeDownwards(dependentTerm, transitiveDependencyTerm, onRemove),
        this
      ).map
    )
  },

  // Removes direct dependency between `dependentTerm` and `dependencyTerm` if it exists.
  _removeDirectDependency (dependentTerm, dependencyTerm) {
    const dependencyTerms = this.getDirectDependencies(dependentTerm)
    if (dependencyTerms === undefined) return this

    const newDependencyTerms = new Set(dependencyTerms)
    newDependencyTerms.delete(dependencyTerm)

    const result = this.constructor({ ...this.map })

    if (newDependencyTerms.size === 0) {
      result.deleteDirectDependencies(dependentTerm)
    } else {
      result.setDirectDependencies(dependentTerm, newDependencyTerms)
    }

    return result
  }
})
