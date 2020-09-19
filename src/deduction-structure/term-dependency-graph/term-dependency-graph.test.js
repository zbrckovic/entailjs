import { ErrorName } from '../../error'
import { TermDependencyGraph } from './term-dependency-graph'

describe('#addDirectDependency()', () => {
  test(`throws ${ErrorName.TERM_ALREADY_USED}`, () => {
    const graph = TermDependencyGraph({ 0: new Set() })

    expect(() => {
      TermDependencyGraph.addDependencies(graph, 0, 1)
    }).toThrow(ErrorName.TERM_ALREADY_USED)
  })

  test(`throws ${ErrorName.CYCLIC_DEPENDENCIES}`, () => {
    const graph = TermDependencyGraph({
      0: new Set([1, 2]),
      2: new Set([3])
    })

    expect(() => {
      TermDependencyGraph.addDependencies(graph, 1, 0)
    }).toThrow(ErrorName.CYCLIC_DEPENDENCIES)

    expect(() => {
      TermDependencyGraph.addDependencies(graph, 3, 0)
    }).toThrow(ErrorName.CYCLIC_DEPENDENCIES)
  })

  test('basic case', () => {
    let actual = TermDependencyGraph()
    actual = TermDependencyGraph.addDependencies(actual, 0, 1, 2)
    actual = TermDependencyGraph.addDependencies(actual, 2, 3)

    const expected = TermDependencyGraph({
      0: new Set([1, 2]),
      2: new Set([3])
    })

    expect(actual).toEqual(expected)
  })

  test.each([
    [
      TermDependencyGraph({ 0: new Set([1, 2]) }),
      TermDependencyGraph({
        0: new Set([1]),
        1: new Set([2])
      }),
      1,
      2
    ],
    [
      TermDependencyGraph({
        0: new Set([1, 3]),
        2: new Set([3])
      }),
      TermDependencyGraph({
        0: new Set([1]),
        1: new Set([2]),
        2: new Set([3])
      }),
      1,
      2
    ]
  ])('normalization', (graph, expected, dependent, dependency) => {
    const actual = TermDependencyGraph.addDependencies(graph, dependent, dependency)

    expect(actual).toEqual(expected)
  })
})

test('#hasDirectDependency()', () => {
  const graph = TermDependencyGraph({
    0: new Set([1, 2]),
    2: new Set([3])
  })

  expect(TermDependencyGraph.hasDirectDependency(graph, 0, 4)).toBe(false)
  expect(TermDependencyGraph.hasDirectDependency(graph, 0, 3)).toBe(false)
  expect(TermDependencyGraph.hasDependency(graph, 0, 1)).toBe(true)
  expect(TermDependencyGraph.hasDependency(graph, 0, 2)).toBe(true)
})

test('#hasDependency()', () => {
  const graph = TermDependencyGraph({
    0: new Set([1, 2]),
    2: new Set([3])
  })

  expect(TermDependencyGraph.hasDependency(graph, 0, 4)).toBe(false)
  expect(TermDependencyGraph.hasDependency(graph, 0, 1)).toBe(true)
  expect(TermDependencyGraph.hasDependency(graph, 0, 3)).toBe(true)
})

test('#getDirectDependents()', () => {
  const graph = TermDependencyGraph({
    0: new Set([2, 3]),
    1: new Set([2])
  })

  expect(new Set(TermDependencyGraph.getDirectDependents(graph, 2))).toEqual(new Set([0, 1]))
  expect(new Set(TermDependencyGraph.getDirectDependents(graph, 0))).toEqual(new Set())
})

test('#getDependents()', () => {
  const graph = TermDependencyGraph({
    0: new Set([1]),
    1: new Set([3]),
    2: new Set([3])
  })

  expect(new Set(TermDependencyGraph.getDependents(graph, 1))).toEqual(new Set([0]))
  expect(new Set(TermDependencyGraph.getDependents(graph, 3))).toEqual(new Set([1, 2, 0]))
})

test('#getDependencies()', () => {
  const graph = TermDependencyGraph({
    0: new Set([1, 2]),
    2: new Set([3])
  })

  expect(new Set(TermDependencyGraph.getDependencies(graph, 2))).toEqual(new Set([3]))
  expect(new Set(TermDependencyGraph.getDependencies(graph, 0))).toEqual(new Set([1, 2, 3]))
})
