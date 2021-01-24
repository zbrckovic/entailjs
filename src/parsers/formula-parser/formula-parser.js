import _ from 'lodash'
import { parseFormula } from '../peg'
import { AstProcessor } from './ast-processor'

export const FormulaParser = ({
  syms,
  presentations
}) => _.create(FormulaParser.prototype, {
  astProcessor: AstProcessor({ syms, presentations })
})

_.assign(FormulaParser.prototype, {
  constructor: FormulaParser,

  parse (text) {
    const ast = parseFormula(text)
    return this.astProcessor.process(ast)
  },
  createSym (kind, arity, binds, text, placement) {
    return this.astProcessor.createSym(kind, arity, binds, text, placement)
  },
  addPresentation (sym, presentation) {
    return this.astProcessor.addPresentation(sym, presentation)
  },
  getSym (text) { return this.astProcessor.getSym(text) },
  getSyms () { return this.astProcessor.getSyms() },
  getPresentations () { return this.astProcessor.getPresentations() },
  getTextToSymMap () { return this.astProcessor.getTextToSymMap() },
  getMaxSymId () { return this.astProcessor.getMaxSymId() }
})
