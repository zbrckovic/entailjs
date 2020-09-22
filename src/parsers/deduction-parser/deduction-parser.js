import { parseDeduction } from '../peg'
import { AstProcessor } from './ast-processor'

export const DeductionParser = ({ syms, presentationCtx }) => {
  const astProcessor = AstProcessor({ syms, presentationCtx })

  const parse = text => {
    const ast = parseDeduction(text)
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
