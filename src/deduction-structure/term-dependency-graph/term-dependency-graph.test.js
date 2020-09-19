import { Sym } from '../../abstract-structures/sym'
import { ErrorName } from '../../error'
import { TermDependencyGraph } from './term-dependency-graph'

const term0 = Sym.tt({ id: 0 })
const term1 = Sym.tt({ id: 1 })
const term2 = Sym.tt({ id: 2 })
const term3 = Sym.tt({ id: 3 })
const term4 = Sym.tt({ id: 4 })

describe('#addDirectDependency()', () => {
  test(`throws ${ErrorName.TERM_ALREADY_USED}`, () => {
    const graph = TermDependencyGraph({ [term0.id]: new Set() })

    expect(() => {
      TermDependencyGraph.addDependencies(graph, term0.id, term1.id)
    }).toThrow(ErrorName.TERM_ALREADY_USED)
  })

  test(`throws ${ErrorName.CYCLIC_DEPENDENCIES}`, () => {
    const graph = TermDependencyGraph({
      [term0.id]: new Set([term1.id, term2.id]),
      [term2.id]: new Set([term3.id])
    })

    expect(() => {
      TermDependencyGraph.addDependencies(graph, term1.id, term0.id)
    }).toThrow(ErrorName.CYCLIC_DEPENDENCIES)

    expect(() => {
      TermDependencyGraph.addDependencies(graph, term3.id, term0.id)
    }).toThrow(ErrorName.CYCLIC_DEPENDENCIES)
  })

  test('basic case', () => {
    let actual = TermDependencyGraph()
    actual = TermDependencyGraph.addDependencies(actual, term0.id, term1.id, term2.id)
    actual = TermDependencyGraph.addDependencies(actual, term2.id, term3.id)

    const expected = TermDependencyGraph({
      [term0.id]: new Set([term1.id, term2.id]),
      [term2.id]: new Set([term3.id])
    })

    expect(actual).toEqual(expected)
  })

  test.each([
    [
      TermDependencyGraph({
        [term0.id]: new Set([term1.id, term2.id])
      }),
      TermDependencyGraph({
        [term0.id]: new Set([term1.id]),
        [term1.id]: new Set([term2.id])
      }),
      term1.id,
      term2.id
    ],
    [
      TermDependencyGraph({
        [term0.id]: new Set([term1.id, term3.id]),
        [term2.id]: new Set([term3.id])
      }),
      TermDependencyGraph({
        [term0.id]: new Set([term1.id]),
        [term1.id]: new Set([term2.id]),
        [term2.id]: new Set([term3.id])
      }),
      term1.id,
      term2.id
    ]
  ])('normalization', (graph, expected, dependent, dependency) => {
    const actual = TermDependencyGraph.addDependencies(graph, dependent, dependency)

    expect(actual).toEqual(expected)
  })
})

test('#hasDirectDependency()', () => {
  const graph = TermDependencyGraph({
    [term0.id]: new Set([term1.id, term2.id]),
    [term2.id]: new Set([term3.id])
  })

  expect(TermDependencyGraph.hasDirectDependency(graph, term0.id, term4.id)).toBe(false)
  expect(TermDependencyGraph.hasDirectDependency(graph, term0.id, term3.id)).toBe(false)
  expect(TermDependencyGraph.hasDependency(graph, term0.id, term1.id)).toBe(true)
  expect(TermDependencyGraph.hasDependency(graph, term0.id, term2.id)).toBe(true)
})

test('#hasDependency()', () => {
  const graph = TermDependencyGraph({
    [term0.id]: new Set([term1.id, term2.id]),
    [term2.id]: new Set([term3.id])
  })

  expect(TermDependencyGraph.hasDependency(graph, term0.id, term4.id)).toBe(false)
  expect(TermDependencyGraph.hasDependency(graph, term0.id, term1.id)).toBe(true)
  expect(TermDependencyGraph.hasDependency(graph, term0.id, term3.id)).toBe(true)
})

test('#getDirectDependents()', () => {
  const graph = TermDependencyGraph({
    [term0.id]: new Set([term2.id, term3.id]),
    [term1.id]: new Set([term2.id])
  })

  expect(new Set(TermDependencyGraph.getDirectDependents(graph, term2.id)))
    .toEqual(new Set([term0.id, term1.id]))

  expect(new Set(TermDependencyGraph.getDirectDependents(graph, term0.id)))
    .toEqual(new Set())
})

test('#getDependents()', () => {
  const graph = TermDependencyGraph({
    [term0.id]: new Set([term1.id]),
    [term1.id]: new Set([term3.id]),
    [term2.id]: new Set([term3.id])
  })

  expect(new Set(TermDependencyGraph.getDependents(graph, term1.id)))
    .toEqual(new Set([term0.id]))

  expect(new Set(TermDependencyGraph.getDependents(graph, term3.id)))
    .toEqual(new Set([term1.id, term2.id, term0.id]))
})

test('#getDependencies()', () => {
  const graph = TermDependencyGraph({
    [term0.id]: new Set([term1.id, term2.id]),
    [term2.id]: new Set([term3.id])
  })

  expect(new Set(TermDependencyGraph.getDependencies(graph, term2.id)))
    .toEqual(new Set([term3.id]))

  expect(new Set(TermDependencyGraph.getDependencies(graph, term0.id)))
    .toEqual(new Set([term1.id, term2.id, term3.id]))
})
