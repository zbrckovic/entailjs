import { parseDeduction } from '../peg'
import { AstProcessor } from './ast-processor'

export class DeductionParser {
  get presentationCtx() { return this.astProcessor.presentationCtx }

  get textToSymMap() { return this.astProcessor.textToSymMap }

  get maxSymId() { return this.astProcessor.maxSymId }

  constructor(presentationCtx) {
    this.astProcessor = new AstProcessor(presentationCtx)
  }

  parse(text) { return this.astProcessor.process(parseDeduction(text)) }

  addPresentation(sym, presentation) {
    this.astProcessor.addPresentation(sym, presentation)
  }

  getSym(text) { return this.astProcessor.getSym(text) }
}
