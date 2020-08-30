import { parseFormula } from '../peg'
import { AstProcessor } from './ast-processor'

export class FormulaParser {
  get presentationCtx() { return this.astProcessor.presentationCtx }

  get textToSymMap() { return this.astProcessor.textToSymMap }

  get maxSymId() { return this.astProcessor.maxSymId }

  constructor(presentationCtx) {
    this.astProcessor = new AstProcessor(presentationCtx)
  }

  parse(text) { return this.astProcessor.process(parseFormula(text)) }

  addPresentation(sym, presentation) {
    const newSym = sym.set('id', this.maxSymId + 1)
    this.astProcessor.addPresentation(newSym, presentation)
    return newSym
  }

  getSym(text) { return this.astProcessor.getSym(text) }
}
