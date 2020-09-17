import { parseDeduction } from '../peg'
import { AstProcessor } from './ast-processor'

export class DeductionParser {
  get syms() { return this.astProcessor.syms }

  get presentationCtx() { return this.astProcessor.presentationCtx }

  get textToSymMap() { return this.astProcessor.textToSymMap }

  get maxSymId() { return this.astProcessor.maxSymId }

  constructor(syms, presentationCtx) {
    this.astProcessor = new AstProcessor(syms, presentationCtx)
  }

  parse(text) { return this.astProcessor.process(parseDeduction(text)) }

  addPresentation(sym, presentation) {
    this.astProcessor.addPresentation(sym, presentation)
  }

  getSym(text) { return this.astProcessor.getSym(text) }
}
