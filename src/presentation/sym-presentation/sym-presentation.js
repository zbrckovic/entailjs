import { SyntacticInfo } from './syntactic-info'

/**
 * Ascii and unicode presentation for symbol.
 *
 * ASCII is used for plain text environments. Unicode is used in GUI.
 */
export const SymPresentation = {
  create: ({ ascii, unicode }) => ({ ascii, unicode }),

  getDefaultSyntacticInfo: presentation => presentation.unicode ?? presentation.ascii,

  createDescription: (presentation, arity = 1) =>
    SyntacticInfo.createDescription(presentation.ascii, arity)
}
