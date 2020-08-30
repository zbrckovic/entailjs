import { List, Map } from 'immutable'
import { conjunction, disjunction, equivalence, implication, negation } from '../primitive-syms'

export const primitiveTruthFunctions = Map([
  [
    negation,
    Map([
      [List.of(true), false],
      [List.of(false), true]
    ])
  ],
  [
    conjunction,
    Map([
      [List.of(true, true), true],
      [List.of(true, false), false],
      [List.of(false, true), false],
      [List.of(false, false), false]
    ])
  ],
  [
    disjunction,
    Map([
      [List.of(true, true), true],
      [List.of(true, false), true],
      [List.of(false, true), true],
      [List.of(false, false), false]
    ])
  ],
  [
    implication,
    Map([
      [List.of(true, true), true],
      [List.of(true, false), false],
      [List.of(false, true), true],
      [List.of(false, false), true]
    ])
  ],
  [
    equivalence,
    Map([
      [List.of(true, true), true],
      [List.of(true, false), false],
      [List.of(false, true), false],
      [List.of(false, false), true]
    ])
  ]
])
