import { Map, Set } from 'immutable'
import { Sym } from '../../abstract-structures/sym'
import { ErrorName } from '../../error'
import { Entries } from '../../utils'
import { TermDependencyGraph } from './term-dependency-graph'

const term0 = Sym.tt({ id: 0 })
const term1 = Sym.tt({ id: 1 })
const term2 = Sym.tt({ id: 2 })
const term3 = Sym.tt({ id: 3 })
const term4 = Sym.tt({ id: 4 })

describe('#addDirectDependency()', () => {
    test(`throws ${ErrorName.TERM_ALREADY_USED}`, () => {
        const graph = new TermDependencyGraph({
            dependencies: Map([
                [term0, Set()]
            ] as Entries<Sym, Set<Sym>>)
        })

        expect(() => { graph.addDependencies(term0, term1) }).toThrow(ErrorName.TERM_ALREADY_USED)
    })

    test(`throws ${ErrorName.CYCLIC_DEPENDENCIES}`, () => {
        const graph = new TermDependencyGraph({
            dependencies: Map([
                [term0, Set.of(term1, term2)],
                [term2, Set.of(term3)]
            ] as Entries<Sym, Set<Sym>>)
        })

        expect(() => { graph.addDependencies(term1, term0) }).toThrow(ErrorName.CYCLIC_DEPENDENCIES)
        expect(() => { graph.addDependencies(term3, term0) }).toThrow(ErrorName.CYCLIC_DEPENDENCIES)
    })

    test('basic case', () => {
        const actual = new TermDependencyGraph()
            .addDependencies(term0, term1, term2)
            .addDependencies(term2, term3)

        const expected = new TermDependencyGraph({
            dependencies: Map([
                [term0, Set.of(term1, term2)],
                [term2, Set.of(term3)]
            ] as Entries<Sym, Set<Sym>>)
        })

        expect(actual.equals(expected)).toBe(true)
    })

    test.each([
        [
            new TermDependencyGraph({
                dependencies: Map([
                    [term0, Set.of(term1, term2)]
                ] as Entries<Sym, Set<Sym>>)
            }),
            new TermDependencyGraph({
                dependencies: Map([
                    [term0, Set.of(term1)],
                    [term1, Set.of(term2)]
                ] as Entries<Sym, Set<Sym>>)
            }),
            term1,
            term2
        ],
        [
            new TermDependencyGraph({
                dependencies: Map([
                    [term0, Set.of(term1, term3)],
                    [term2, Set.of(term3)]
                ] as Entries<Sym, Set<Sym>>)
            }),
            new TermDependencyGraph({
                dependencies: Map([
                    [term0, Set.of(term1)],
                    [term1, Set.of(term2)],
                    [term2, Set.of(term3)]
                ] as Entries<Sym, Set<Sym>>)
            }),
            term1,
            term2
        ]
    ])('normalization', (graph, expected, dependent, dependency) => {
        const actual = graph.addDependencies(dependent, dependency)

        expect(actual.equals(expected)).toBe(true)
    })
})

test('#hasDirectDependency()', () => {
    const graph = new TermDependencyGraph({
        dependencies: Map([
            [term0, Set.of(term1, term2)],
            [term2, Set.of(term3)]
        ] as Entries<Sym, Set<Sym>>)
    })

    expect(graph.hasDirectDependency(term0, term4)).toBe(false)
    expect(graph.hasDirectDependency(term0, term3)).toBe(false)
    expect(graph.hasDependency(term0, term1)).toBe(true)
    expect(graph.hasDependency(term0, term2)).toBe(true)
})

test('#hasDependency()', () => {
    const graph = new TermDependencyGraph({
        dependencies: Map([
            [term0, Set.of(term1, term2)],
            [term2, Set.of(term3)]
        ] as Entries<Sym, Set<Sym>>)
    })

    expect(graph.hasDependency(term0, term4)).toBe(false)
    expect(graph.hasDependency(term0, term1)).toBe(true)
    expect(graph.hasDependency(term0, term3)).toBe(true)
})

test('#getDirectDependents()', () => {
    const graph = new TermDependencyGraph({
        dependencies: Map([
            [term0, Set.of(term2, term3)],
            [term1, Set.of(term2)]
        ] as Entries<Sym, Set<Sym>>)
    })

    expect(graph.getDirectDependents(term2).equals(Set.of(term0, term1))).toBe(true)
    expect(graph.getDirectDependents(term0).equals(Set.of())).toBe(true)
})

test('#getDependents()', () => {
    const graph = new TermDependencyGraph({
        dependencies: Map([
            [term0, Set.of(term1)],
            [term1, Set.of(term3)],
            [term2, Set.of(term3)]
        ] as Entries<Sym, Set<Sym>>)
    })

    expect(graph.getDependents(term1).equals(Set.of(term0))).toBe(true)
    expect(graph.getDependents(term3).equals(Set.of(term0, term1, term2))).toBe(true)
})

test('#getDependencies()', () => {
    const graph = new TermDependencyGraph({
        dependencies: Map([
            [term0, Set.of(term1, term2)],
            [term2, Set.of(term3)]
        ] as Entries<Sym, Set<Sym>>)
    })

    expect(graph.getDependencies(term2).equals(Set.of(term3))).toBe(true)
    expect(graph.getDependencies(term0).equals(Set.of(term1, term2, term3))).toBe(true)
})
