import {
  conjunction,
  disjunction,
  equivalence,
  existentialQuantifier,
  implication,
  negation,
  universalQuantifier
} from '../../primitive-syms'
import { SymPresentation } from './sym-presentation'
import { SyntacticInfo } from './syntactic-info'

/** Presentations for all primitive symbols. */
export const primitivePresentationCtx = {
  [negation.id]: SymPresentation.create({
    ascii: SyntacticInfo.prefix('~'),
    unicode: SyntacticInfo.prefix('¬')
  }),

  [conjunction.id]: SymPresentation.create({
    ascii: SyntacticInfo.infix('&'),
    unicode: SyntacticInfo.infix('∧')
  }),

  [disjunction.id]: SymPresentation.create({
    ascii: SyntacticInfo.infix('|'),
    unicode: SyntacticInfo.infix('∨')
  }),

  [implication.id]: SymPresentation.create({
    ascii: SyntacticInfo.infix('->'),
    unicode: SyntacticInfo.infix('→')
  }),

  [equivalence.id]: SymPresentation.create({
    ascii: SyntacticInfo.infix('<->'),
    unicode: SyntacticInfo.infix('↔')
  }),

  [universalQuantifier.id]: SymPresentation.create({
    ascii: SyntacticInfo.prefix('A'),
    unicode: SyntacticInfo.prefix('∀')
  }),

  [existentialQuantifier.id]: SymPresentation.create({
    ascii: SyntacticInfo.prefix('E'),
    unicode: SyntacticInfo.prefix('∃')
  })
}
