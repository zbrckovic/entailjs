import { parseDeduction } from '../peg'
import { AstProcessor } from './ast-processor'
import _ from 'lodash'

export const DeductionParser = ({ syms, presentations }) => _.create(DeductionParser.prototype, {
  astProcessor: AstProcessor({ syms, presentations })
})

DeductionParser.prototype = {
  parse(text) {
    const ast = parseDeduction(text)
    return this.astProcessor.process(ast)
  },
  getSym(text) { return this.astProcessor.getSym(text) },
  getSyms() { return this.astProcessor.getSyms() },
  getPresentations() { return this.astProcessor.getPresentations() },
  getTextToSymMap() { return this.astProcessor.getTextToSymMap() },
  getMaxSymId() { return this.astProcessor.getMaxSymId() }
}
