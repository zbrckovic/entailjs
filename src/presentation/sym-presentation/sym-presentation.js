import * as _ from 'lodash'

/**
 * ASCII and unicode presentation of a symbol.
 *
 * ASCII presentation is used for plain text environments. Unicode is used in GUI.
 */
export const SymPresentation = ({ ascii, unicode }) => ({ ascii, unicode })

SymPresentation.getDefaultSyntacticInfo =
  presentation => presentation.unicode ?? presentation.ascii

SymPresentation.createDescription =
  (presentation, arity = 1) => SyntacticInfo.createDescription(presentation.ascii, arity)

export const SyntacticInfo = ({ text, placement = Placement.Prefix }) => ({ text, placement })

SyntacticInfo.prefix = text => SyntacticInfo({ text, placement: Placement.Prefix })

SyntacticInfo.infix = text => SyntacticInfo({ text, placement: Placement.Infix })

SyntacticInfo.createDescription = (info, arity = 1) => {
  switch (info.placement) {
    case Placement.Prefix:
      return `${info.text}${_.repeat(' _', arity).join('')}`
    case Placement.Infix:
      return `_ ${info.text} _`
  }
}

/**
 * Represents two different positions a symbol can occupy relative to another syntactic entity.
 */
export const Placement = {
  Prefix: 'Prefix',
  Infix: 'Infix'
}
