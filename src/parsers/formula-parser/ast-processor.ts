import { Expression } from 'abstract-structures/expression'
import { Category } from 'abstract-structures/sym/category'
import { Kind } from 'abstract-structures/sym/kind'
import { Sym } from 'abstract-structures/sym/sym'
import { TheoremCoreError } from 'error'
import { List, Map } from 'immutable'
import { AstFormula, isBracketed } from 'parsers/peg/ast-formula'
import { SymPresentation } from 'presentation/sym-presentation'
import { Placement } from 'presentation/sym-presentation/placement'
import {
    createTextToSymMap,
    getMaxSymId,
    PresentationCtx
} from 'presentation/sym-presentation/presentation-ctx'
import { SyntacticInfo } from 'presentation/sym-presentation/syntactic-info'

export class AstProcessor {
    private _presentationCtx: PresentationCtx
    private _textToSymMap: Map<string, Sym>
    private _maxSymId: number

    get presentationCtx(): PresentationCtx { return this._presentationCtx }

    get textToSymMap(): Map<string, Sym> { return this._textToSymMap }

    get maxSymId(): number { return this._maxSymId }

    /**
     * @param presentationCtx
     * @param textToSymMap - For optimization
     * @param maxSymId - For optimization
     */
    constructor(
        presentationCtx: PresentationCtx,
        textToSymMap?: Map<string, Sym>,
        maxSymId?: number
    ) {
        this._presentationCtx = presentationCtx
        this._textToSymMap = textToSymMap ?? createTextToSymMap(this._presentationCtx)
        this._maxSymId = maxSymId ?? getMaxSymId(this._textToSymMap)
    }

    process(ast: AstFormula, kind = Kind.Formula): Expression {
        if (isBracketed(ast)) return this.process(ast.expression, kind)

        const childrenAsts: List<AstFormula> = List(ast.children)
        const arity = childrenAsts.size

        const mainSym = this._textToSymMap.get(ast.sym)
            ?? this.createSym(kind, arity, ast.boundSym !== undefined, ast.sym, ast.symPlacement)

        if (this._presentationCtx.get(mainSym)!.ascii.placement !== ast.symPlacement) {
            throw new InvalidSymbolPlacementError(mainSym, ast.symPlacement)
        }

        if (mainSym.arity !== arity) throw new InvalidArityError(mainSym, arity)
        if (mainSym.kind !== kind) throw new InvalidSymbolKindError(mainSym, kind)

        let boundSym: Sym | undefined
        if (ast.boundSym !== undefined) {
            boundSym = this._textToSymMap.get(ast.boundSym)

            if (boundSym !== undefined) {
                if (boundSym.getCategory() !== Category.TT) {
                    throw new InvalidBoundSymbolCategoryError(boundSym)
                }

                if (boundSym.arity !== 0) {
                    throw new InvalidBoundSymbolArityError(boundSym)
                }
            } else {
                boundSym = this.createSym(Kind.Term, 0, false, ast.boundSym, Placement.Prefix)
            }
        }

        return new Expression({
            sym: mainSym,
            boundSym: boundSym,
            children: childrenAsts.map(childAst => this.process(childAst, mainSym.argumentKind))
        })
    }

    private createSym(
        kind: Kind,
        arity: number,
        binds: boolean,
        text: string,
        placement: Placement
    ): Sym {
        const argumentKind = AstProcessor.determineArgumentKind(kind, text)
        const id = this.maxSymId + 1
        const sym = new Sym({ id, kind, argumentKind, arity, binds })
        const symPresentation = new SymPresentation({
            ascii: new SyntacticInfo({ text, placement })
        })

        this._textToSymMap = this._textToSymMap.set(text, sym)
        this._presentationCtx = this._presentationCtx.set(sym, symPresentation)

        this._maxSymId = id

        return sym
    }

    private static determineArgumentKind(kind: Kind, text: string) {
        switch (kind) {
            case Kind.Formula: {
                if (AstProcessor.isUpperWord(text)) return Kind.Term
                if (AstProcessor.isLowerWord(text)) return Kind.Formula
                break
            }
            case Kind.Term: {
                if (AstProcessor.isLowerWord(text)) return Kind.Term
                break
            }
        }
    }

    private static isUpperWord(text: string) { return /^[A-Z]\w*/.test(text) }

    private static isLowerWord(text: string) { return /^[a-z]\w*/.test(text) }

    addPresentation(sym: Sym, presentation: SymPresentation) {
        this._presentationCtx = this.presentationCtx.set(sym, presentation)
        this._textToSymMap = this.textToSymMap.set(presentation.ascii.text, sym)
    }

    getSym(text: string) { return this.textToSymMap.get(text) }
}

export abstract class AstProcessorError extends TheoremCoreError {}

export class InvalidBoundSymbolCategoryError extends AstProcessorError {
    constructor(readonly sym: Sym) {
        super(`symbol ${sym} has wrong category to be bound`)
    }
}

export class InvalidBoundSymbolArityError extends AstProcessorError {
    constructor(readonly sym: Sym) {
        super(`symbol ${sym} has wrong arity to be bound`)
    }
}

export class InvalidArityError extends AstProcessorError {
    constructor(
        readonly sym: Sym,
        readonly arity: number
    ) {
        super(`symbol ${sym} is used with wrong arity ${arity}`)
    }
}

export class InvalidSymbolKindError extends AstProcessorError {
    constructor(
        readonly sym: Sym,
        readonly kind: Kind
    ) {
        super(`encountered symbol ${sym} where symbol of kind ${kind} was expected`)
    }
}

export class InvalidSymbolPlacementError extends AstProcessorError {
    constructor(
        readonly sym: Sym,
        readonly placement: Placement
    ) {
        super(`symbol ${sym} has wrong placement ${placement}`)
    }
}
