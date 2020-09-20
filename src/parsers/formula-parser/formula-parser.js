import { parseFormula } from '../peg'
import { AstProcessor } from './ast-processor'

export const FormulaParser = ({ syms, presentationCtx }) => {
  const astProcessor = AstProcessor({ syms, presentationCtx })

  const parse = text => astProcessor.process(parseFormula(text))

  return ({
    get syms() {
      return astProcessor.syms
    },
    presentationCtx: astProcessor.presentationCtx,
    textToSymMap: astProcessor.textToSymMap,
    maxSymId: astProcessor.maxSymId,
    parse,
    getSym: astProcessor.getSym,
    addPresentation: astProcessor.addPresentation
  })
}
