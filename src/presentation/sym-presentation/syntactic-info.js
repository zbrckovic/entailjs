import * as _ from 'lodash'
import { Placement } from './placement'

export const SyntacticInfo = {
  create: ({ text, placement = Placement.Prefix }) => ({ text, placement }),

  createPrefix: text => SyntacticInfo.create({ text, placement: Placement.Prefix }),

  createInfix: text => SyntacticInfo.create({ text, placement: Placement.Infix }),

  createDescription: (info, arity = 1) => {
    switch (info.placement) {
      case Placement.Prefix:
        return `${info.text}${_.repeat(' _', arity).join('')}`
      case Placement.Infix:
        return `_ ${info.text} _`
    }
  }
}
