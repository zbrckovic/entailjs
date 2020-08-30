import { Map, Record, Set } from 'immutable'
import { createError, ErrorName } from '../../error'

/**
 * Graph of dependencies between free terms of a deduction.
 *
 * This graph is maintained as a part of deduction. It's updated on each application of UG and
 * EI rule.
 */
export class TermDependencyGraph extends Record({
  /** Direct dependencies. */
  dependencies: Map()
}, 'TermDependencyGraph') {
  /**
   * Add direct dependency and normalize graph (remove redundant direct dependencies which now
   * became transitive).
   */
  addDependencies(dependent, ...dependencies) {
    const dependenciesSet = Set(dependencies)

    if (this.dependencies.has(dependent)) {
      throw createError(ErrorName.TERM_ALREADY_USED, undefined, dependent)
    }

    const cycleInducingDependency = dependenciesSet.find(
      dependency => this.hasDependency(dependency, dependent)
    )
    if (cycleInducingDependency !== undefined) {
      throw createError(ErrorName.CYCLIC_DEPENDENCIES, undefined, cycleInducingDependency)
    }

    return dependenciesSet.reduce(
      (acc, dependency) => acc._normalize(dependent, dependency).update(
        'dependencies',
        map => map.update(dependent, Set(), values => values.add(dependency))
      ),
      this.update('dependencies', map => map.set(dependent, Set()))
    )
  }

  getDirectDependents(sym) {
    return this.dependencies
      .entrySeq()
      .filter(([, dependencies]) => dependencies.contains(sym))
      .map(([dependent]) => dependent)
      .toSet()
  }

  getDependents(sym) { return this._getDependents(sym) }

  _getDependents(sym, traversed = Set()) {
    if (traversed.contains(sym)) throw new Error('Infinite recursion error')
    traversed = traversed.add(sym)

    const directDependents = this.getDirectDependents(sym)

    return directDependents.reduce(
      (acc, dependent) => acc.union(this._getDependents(dependent, traversed)),
      directDependents
    )
  }

  getDependencies(sym) { return this._getDependencies(sym) }

  _getDependencies(sym, traversed = Set()) {
    if (traversed.contains(sym)) throw new Error('Infinite recursion error')
    traversed = traversed.add(sym)

    const directDependencies = this.dependencies.get(sym, Set())

    return directDependencies.reduce(
      (acc, dependent) => acc.union(this._getDependencies(dependent, traversed)),
      directDependencies
    )
  }

  hasDirectDependency(dependent, dependency) {
    return this.dependencies.get(dependent)?.contains(dependency) || false
  }

  hasDependency(dependent, dependency) {
    return this._hasDependency(dependent, dependency)
  }

  _hasDependency(dependent, dependency, traversed = Set()) {
    if (traversed.contains(dependent)) throw new Error('Infinite recursion error')
    traversed = traversed.add(dependent)

    const sym1Dependencies = this.dependencies.get(dependent, Set())

    return (
      sym1Dependencies.contains(dependency) ||
      sym1Dependencies.some(sym => this._hasDependency(sym, dependency, traversed))
    )
  }

  _normalize(dependent, dependency) {
    const normalizedDownwards = this._normalizeDownwards(dependent, dependency, true)

    return normalizedDownwards.getDirectDependents(dependent).reduce(
      (graph, furtherDependent) => graph._normalizeDownwards(furtherDependent, dependency),
      normalizedDownwards
    )
  }

  _normalizeDownwards(dependent, dependency, isRoot = false) {
    if (!isRoot && this.hasDirectDependency(dependent, dependency)) {
      return this._removeDirectDependency(dependent, dependency)
    }

    return this.dependencies.get(dependency)?.reduce(
      (graph, furtherDependency) => graph._normalizeDownwards(dependent, furtherDependency),
      this
    ) || this
  }

  _removeDirectDependency(dependent, dependency) {
    const dependencyTerms = this.dependencies.get(dependent)
    if (dependencyTerms === undefined) return this

    const newDependencyTerms = dependencyTerms.remove(dependency)

    return this.set(
      'dependencies',
      newDependencyTerms.isEmpty()
        ? this.dependencies.remove(dependent)
        : this.dependencies.set(dependent, newDependencyTerms)
    )
  }
}
