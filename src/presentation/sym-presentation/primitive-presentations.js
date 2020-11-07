import {
  conjunction,
  disjunction,
  biconditional,
  existentialQuantifier,
  conditional,
  negation,
  universalQuantifier
} from '../../primitive-syms'
import { SymPresentation, SyntacticInfo } from './sym-presentation'

// Presentations for all primitive symbols organized by symbol ids.
export const primitivePresentations = {
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

  [conditional.id]: SymPresentation({
    ascii: SyntacticInfo.infix('->'),
    unicode: SyntacticInfo.infix('→')
  }),

  [biconditional.id]: SymPresentation({
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
