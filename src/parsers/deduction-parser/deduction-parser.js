import { parseDeduction } from '../peg'
import { AstProcessor } from './ast-processor'

export const DeductionParser = ({ syms, presentations }) => {
  const astProcessor = AstProcessor({ syms, presentations })

  const parse = text => {
    const ast = parseDeduction(text)
    return astProcessor.process(ast)
  }

  const {
    createSym,
    addPresentation,
    getSym,
    getSyms,
    getPresentations,
    getTextToSymMap,
    getMaxSymId
  } = astProcessor

  return ({
    parse,
    createSym,
    addPresentation,
    getSym,
    getSyms,
    getPresentations,
    getTextToSymMap,
    getMaxSymId
  })
}
