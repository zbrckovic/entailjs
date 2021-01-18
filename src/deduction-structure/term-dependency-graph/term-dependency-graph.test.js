import { ErrorName } from '../../error'
import { TermDependencyGraph } from './term-dependency-graph'

describe('#addDirectDependency()', () => {
  test(`throws ${ErrorName.TERM_ALREADY_USED}`, () => {
    const graph = TermDependencyGraph({ 0: new Set() })

    expect(() => {
      graph.addDependencies(0, [1])
    }).toThrow(ErrorName.TERM_ALREADY_USED)
  })

  test(`throws ${ErrorName.CYCLIC_DEPENDENCIES}`, () => {
    const graph = TermDependencyGraph({
      0: new Set([1, 2]),
      2: new Set([3])
    })

    expect(() => {
      graph.addDependencies(1, [0])
    }).toThrow(ErrorName.CYCLIC_DEPENDENCIES)

    expect(() => {
      graph.addDependencies(3, [0])
    }).toThrow(ErrorName.CYCLIC_DEPENDENCIES)
  })

  test('basic case', () => {
    let actual = TermDependencyGraph()
    actual = actual.addDependencies(0, [1, 2])
    actual = actual.addDependencies(2, [3])

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
      2,
      [0, 2]
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
      2,
      [0, 3]
    ]
  ])('normalization', (graph, expected, dependent, dependency, expectedRemovedDependency) => {
    const onRemove = jest.fn()
    const actual = graph.addDependencies(dependent, [dependency], onRemove)

    expect(actual).toEqual(expected)
    expect(onRemove).toHaveBeenCalledWith(...expectedRemovedDependency)
  })
})

test('#hasDirectDependency()', () => {
  const graph = TermDependencyGraph({
    0: new Set([1, 2]),
    2: new Set([3])
  })

  expect(graph.hasDirectDependency(0, 4)).toBe(false)
  expect(graph.hasDirectDependency(0, 3)).toBe(false)
  expect(graph.hasDependency(0, 1)).toBe(true)
  expect(graph.hasDependency(0, 2)).toBe(true)
})

test('#hasDependency()', () => {
  const graph = TermDependencyGraph({
    0: new Set([1, 2]),
    2: new Set([3])
  })

  expect(graph.hasDependency(0, 4)).toBe(false)
  expect(graph.hasDependency(0, 1)).toBe(true)
  expect(graph.hasDependency(0, 3)).toBe(true)
})

test('#getDirectDependents()', () => {
  const graph = TermDependencyGraph({
    0: new Set([2, 3]),
    1: new Set([2])
  })

  expect(new Set(graph.getDirectDependents(2))).toEqual(new Set([0, 1]))
  expect(new Set(graph.getDirectDependents(0))).toEqual(new Set())
})

test('#getDependents()', () => {
  const graph = TermDependencyGraph({
    0: new Set([1]),
    1: new Set([3]),
    2: new Set([3])
  })

  expect(new Set(graph.getDependents(1))).toEqual(new Set([0]))
  expect(new Set(graph.getDependents(3))).toEqual(new Set([1, 2, 0]))
})

test('#getDependencies()', () => {
  const graph = TermDependencyGraph({
    0: new Set([1, 2]),
    2: new Set([3])
  })

  expect(new Set(graph.getDependencies(2))).toEqual(new Set([3]))
  expect(new Set(graph.getDependencies(0))).toEqual(new Set([1, 2, 3]))
})
