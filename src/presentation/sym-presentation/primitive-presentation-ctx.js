import {
  conjunction,
  disjunction,
  equivalence,
  existentialQuantifier,
  implication,
  negation,
  universalQuantifier
} from '../../primitive-syms'
import { SymPresentation, SyntacticInfo } from './sym-presentation'

// Presentations for all primitive symbols organized by symbol ids.
export const primitivePresentationCtx = {
  [negation.id]: SymPresentation({
    ascii: SyntacticInfo.prefix('~'),
    unicode: SyntacticInfo.prefix('¬')
  }),

  [conjunction.id]: SymPresentation({
    ascii: SyntacticInfo.infix('&'),
    unicode: SyntacticInfo.infix('∧')
  }),

  [disjunction.id]: SymPresentation({
    ascii: SyntacticInfo.infix('|'),
    unicode: SyntacticInfo.infix('∨')
  }),

  [implication.id]: SymPresentation({
    ascii: SyntacticInfo.infix('->'),
    unicode: SyntacticInfo.infix('→')
  }),

  [equivalence.id]: SymPresentation({
    ascii: SyntacticInfo.infix('<->'),
    unicode: SyntacticInfo.infix('↔')
  }),

  [universalQuantifier.id]: SymPresentation({
    ascii: SyntacticInfo.prefix('A'),
    unicode: SyntacticInfo.prefix('∀')
  }),

  [existentialQuantifier.id]: SymPresentation({
    ascii: SyntacticInfo.prefix('E'),
    unicode: SyntacticInfo.prefix('∃')
  })
}
