import { List, Map, Set } from 'immutable'
import { Sym } from '../abstract-structures/sym'
import { conjunction, disjunction, equivalence, implication, negation } from '../primitive-syms'
import { Entries } from '../utils'

export type TruthTable = Map<List<boolean>, boolean>

export const primitiveTruthFunctions = Map<Sym, TruthTable>([
    [
        negation,
        Map([
            [List.of<boolean>(true), false],
            [List.of<boolean>(false), true]
        ] as Entries<List<boolean>, boolean>)
    ],
    [
        conjunction,
        Map([
            [List.of(true, true), true],
            [List.of(true, false), false],
            [List.of(false, true), false],
            [List.of(false, false), false]
        ] as Entries<List<boolean>, boolean>)
    ],
    [
        disjunction,
        Map([
            [List.of(true, true), true],
            [List.of(true, false), true],
            [List.of(false, true), true],
            [List.of(false, false), false]
        ] as Entries<List<boolean>, boolean>)
    ],
    [
        implication,
        Map([
            [List.of(true, true), true],
            [List.of(true, false), false],
            [List.of(false, true), true],
            [List.of(false, false), true]
        ] as Entries<List<boolean>, boolean>)
    ],
    [
        equivalence,
        Map([
            [List.of(true, true), true],
            [List.of(true, false), false],
            [List.of(false, true), false],
            [List.of(false, false), true]
        ] as Entries<List<boolean>, boolean>)
    ]
] as Entries<Sym, TruthTable>)
