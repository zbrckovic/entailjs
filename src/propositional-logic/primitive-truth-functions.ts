import {
    conjunction,
    disjunction,
    equivalence,
    implication,
    negation
} from 'primitive-syms'
import { Sym } from 'abstract-structures/sym'
import { List, Map } from 'immutable'

export type TruthTable = Map<List<boolean>, boolean>

export const primitiveTruthFunctions = Map<Sym, TruthTable>([
    [
        negation,
        Map([
            [List.of<boolean>(true), false],
            [List.of<boolean>(false), true]
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
