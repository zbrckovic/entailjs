import { Sym } from 'abstract-structures/sym'
import { BaseError } from 'error'
import { Map, Record, Set } from 'immutable'

/**
 * Graph of dependencies between free terms of a deduction.
 *
 * This graph is maintained as a part of deduction. It's updated on each application of UG and
 * EI rule.
 */
export class TermDependencyGraph extends Record<{
    /** Direct dependencies. */
    dependencies: Map<Sym, Set<Sym>>
}>({ dependencies: Map() }, 'TermDependencyGraph') {
    /**
     * Add direct dependency and normalize graph (remove redundant direct dependencies which now
     * became transitive).
     */
    addDependencies(dependent: Sym, ...dependencies: Sym[]) {
        const dependenciesSet = Set(dependencies)

        if (this.dependencies.has(dependent)) {
            throw new TermAlreadyUsedError(dependent)
        }

        const cycleInducingDependency = dependenciesSet.find(
            dependency => this.hasDependency(dependency, dependent)
        )
        if (cycleInducingDependency !== undefined) {
            throw new CyclicDependenciesError(dependent, cycleInducingDependency)
        }

        return dependenciesSet.reduce<TermDependencyGraph>(
            (acc, dependency) => acc.normalize(dependent, dependency).update(
                'dependencies',
                map => map.update(dependent, Set(), values => values.add(dependency))
            ),
            this.update('dependencies', map => map.set(dependent, Set()))
        )
    }

    getDirectDependents(sym: Sym) {
        return this.dependencies
            .entrySeq()
            .filter(([, dependencies]) => dependencies.contains(sym))
            .map(([dependent]) => dependent)
            .toSet()
    }

    getDependents(sym: Sym) { return this._getDependents(sym) }

    private _getDependents(sym: Sym, traversed = Set<Sym>()): Set<Sym> {
        if (traversed.contains(sym)) throw new Error('Infinite recursion error')
        traversed = traversed.add(sym)

        const directDependents = this.getDirectDependents(sym)

        return directDependents.reduce(
            (acc, dependent) => acc.union(this._getDependents(dependent, traversed)),
            directDependents
        )
    }

    getDependencies(sym: Sym) { return this._getDependencies(sym) }

    private _getDependencies(sym: Sym, traversed = Set<Sym>()): Set<Sym> {
        if (traversed.contains(sym)) throw new Error('Infinite recursion error')
        traversed = traversed.add(sym)

        const directDependencies = this.dependencies.get(sym, Set<Sym>())

        return directDependencies.reduce(
            (acc, dependent) => acc.union(this._getDependencies(dependent, traversed)),
            directDependencies
        )
    }

    hasDirectDependency(dependent: Sym, dependency: Sym) {
        return this.dependencies.get(dependent)?.contains(dependency) || false
    }

    hasDependency(dependent: Sym, dependency: Sym) {
        return this._hasDependency(dependent, dependency)
    }

    private _hasDependency(dependent: Sym, dependency: Sym, traversed = Set<Sym>()): boolean {
        if (traversed.contains(dependent)) throw new Error('Infinite recursion error')
        traversed = traversed.add(dependent)

        const sym1Dependencies = this.dependencies.get(dependent, Set())

        return (
            sym1Dependencies.contains(dependency) ||
            sym1Dependencies.some(sym => this._hasDependency(sym, dependency, traversed))
        )
    }

    private normalize(dependent: Sym, dependency: Sym) {
        const normalizedDownwards = this.normalizeDownwards(dependent, dependency, true)

        return normalizedDownwards.getDirectDependents(dependent).reduce(
            (graph: TermDependencyGraph, furtherDependent) =>
                graph.normalizeDownwards(furtherDependent, dependency),
            normalizedDownwards
        )
    }

    private normalizeDownwards(
        dependent: Sym,
        dependency: Sym,
        isRoot = false
    ): TermDependencyGraph {
        if (!isRoot && this.hasDirectDependency(dependent, dependency)) {
            return this.removeDirectDependency(dependent, dependency)
        }

        return this.dependencies.get(dependency)?.reduce(
            (graph: TermDependencyGraph, furtherDependency) =>
                graph.normalizeDownwards(dependent, furtherDependency),
            this
        ) || this
    }

    private removeDirectDependency(dependent: Sym, dependency: Sym) {
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

export abstract class TermDependencyGraphError extends BaseError {}

export class TermAlreadyUsedError extends TermDependencyGraphError {
    constructor(readonly term: Sym) {
        super(`term ${term} is already used`)
    }
}

export class CyclicDependenciesError extends TermDependencyGraphError {
    constructor(
        readonly dependentTerm: Sym,
        readonly dependencyTerm: Sym
    ) {
        super(`term ${dependentTerm} forms a cycle by depending on ${dependencyTerm}`)
    }
}

