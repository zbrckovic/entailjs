import { parseFormula } from '../peg'
import { AstProcessor } from './ast-processor'

export const FormulaParser = ({ syms, presentationCtx }) => {
  const astProcessor = AstProcessor({ syms, presentationCtx })

  const parse = text => {
    const ast = parseFormula(text)
    return astProcessor.process(ast)
  }

  const {
    createSym,
    addPresentation,
    getSym,
    getSyms,
    getPresentationCtx,
    getTextToSymMap,
    getMaxSymId
  } = astProcessor

  return ({
    parse,
    createSym,
    addPresentation,
    getSym,
    getSyms,
    getPresentationCtx,
    getTextToSymMap,
    getMaxSymId
  })
}
