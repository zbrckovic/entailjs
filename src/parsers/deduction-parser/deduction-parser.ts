import { Sym } from 'abstract-structures/sym'
import { parseDeduction } from 'parsers/peg'
import { SymPresentation } from 'presentation/sym-presentation'
import { PresentationCtx } from 'presentation/sym-presentation/presentation-ctx'
import { AstProcessor } from './ast-processor'

export class DeductionParser {
    private readonly astProcessor: AstProcessor

    get presentationCtx() { return this.astProcessor.presentationCtx }

    get textToSymMap() { return this.astProcessor.textToSymMap }

    get maxSymId() { return this.astProcessor.maxSymId }

    constructor(presentationCtx: PresentationCtx) {
        this.astProcessor = new AstProcessor(presentationCtx)
    }

    parse(text: string) { return this.astProcessor.process(parseDeduction(text)) }

    addPresentation(sym: Sym, presentation: SymPresentation) {
        this.astProcessor.addPresentation(sym, presentation)
    }

    getSym(text: string) { return this.astProcessor.getSym(text) }
}
