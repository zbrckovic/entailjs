import { Sym } from '../../abstract-structures/sym'
import { SymPresentation } from '../../presentation/sym-presentation'
import { PresentationCtx } from '../../presentation/sym-presentation/presentation-ctx'
import { parseFormula } from '../peg'
import { AstProcessor } from './ast-processor'

export class FormulaParser {
    private readonly astProcessor: AstProcessor

    get presentationCtx() { return this.astProcessor.presentationCtx }

    get textToSymMap() { return this.astProcessor.textToSymMap }

    get maxSymId() { return this.astProcessor.maxSymId }

    constructor(presentationCtx: PresentationCtx) {
        this.astProcessor = new AstProcessor(presentationCtx)
    }

    parse(text: string) { return this.astProcessor.process(parseFormula(text)) }

    addPresentation(sym: Sym, presentation: SymPresentation) {
        const newSym = sym.set('id', this.maxSymId + 1)
        this.astProcessor.addPresentation(newSym, presentation)
        return newSym
    }

    getSym(text: string) { return this.astProcessor.getSym(text) }
}
