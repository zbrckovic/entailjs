import {
    conjunction,
    disjunction,
    equivalence,
    existentialQuantifier,
    implication,
    negation,
    universalQuantifier
} from 'primitive-syms'
import { Sym } from 'abstract-structures/sym'
import { Map } from 'immutable'
import { PresentationCtx } from './presentation-ctx'
import { SymPresentation } from './sym-presentation'
import { SyntacticInfo } from './syntactic-info'

/** Presentations for all primitive symbols. */
export const primitivePresentationCtx: PresentationCtx = Map<Sym, SymPresentation>([
    [
        negation,
        new SymPresentation({
            ascii: SyntacticInfo.prefix('~'),
            unicode: SyntacticInfo.prefix('¬')
        })
    ],
    [
        conjunction,
        new SymPresentation({
            ascii: SyntacticInfo.infix('&'),
            unicode: SyntacticInfo.infix('∧')
        })
    ],
    [
        disjunction,
        new SymPresentation({
            ascii: SyntacticInfo.infix('|'),
            unicode: SyntacticInfo.infix('∨')
        })
    ],
    [
        implication,
        new SymPresentation({
            ascii: SyntacticInfo.infix('->'),
            unicode: SyntacticInfo.infix('→')
        })
    ],
    [
        equivalence,
        new SymPresentation({
            ascii: SyntacticInfo.infix('<->'),
            unicode: SyntacticInfo.infix('↔')
        })
    ],
    [
        universalQuantifier,
        new SymPresentation({
            ascii: SyntacticInfo.prefix('A'),
            unicode: SyntacticInfo.prefix('∀')
        })
    ],
    [
        existentialQuantifier,
        new SymPresentation({
            ascii: SyntacticInfo.prefix('E'),
            unicode: SyntacticInfo.prefix('∃')
        })
    ]
] as readonly [Sym, SymPresentation][])
