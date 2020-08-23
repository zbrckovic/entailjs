import { List, Map } from 'immutable'
import { Expression } from '../../abstract-structures/expression'
import { Category, Kind, Sym } from '../../abstract-structures/sym'
import { createError, ErrorName } from '../../error'
import {
    createTextToSymMap,
    getMaxSymId,
    Placement,
    PresentationCtx,
    SymPresentation,
    SyntacticInfo
} from '../../presentation/sym-presentation'
import { AstFormula, isBracketed } from '../peg/ast-formula'

export class AstProcessor {
    private _presentationCtx: PresentationCtx
    private _textToSymMap: Map<string, Sym>
    private _maxSymId: number

    get presentationCtx(): PresentationCtx {
        return this._presentationCtx
    }

    get textToSymMap(): Map<string, Sym> {
        return this._textToSymMap
    }

    get maxSymId(): number {
        return this._maxSymId
    }

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
            throw createError(
                ErrorName.INVALID_SYMBOL_PLACEMENT,
                undefined,
                { sym: mainSym, symPlacement: ast.symPlacement }
            )
        }

        if (mainSym.arity !== arity) {
            throw createError(ErrorName.INVALID_ARITY, undefined, { sym: mainSym, arity })
        }
        if (mainSym.kind !== kind) {
            throw createError(ErrorName.INVALID_SYMBOL_KIND, undefined, { sym: mainSym, kind })
        }

        let boundSym: Sym | undefined
        if (ast.boundSym !== undefined) {
            boundSym = this._textToSymMap.get(ast.boundSym)

            if (boundSym !== undefined) {
                if (boundSym.getCategory() !== Category.TT) {
                    throw createError(
                        ErrorName.INVALID_BOUND_SYMBOL_CATEGORY,
                        undefined,
                        boundSym
                    )
                }

                if (boundSym.arity !== 0) {
                    throw createError(
                        ErrorName.INVALID_BOUND_SYMBOL_ARITY,
                        undefined,
                        boundSym
                    )
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

    private static isUpperWord(text: string) {
        return /^[A-Z]\w*/.test(text)
    }

    private static isLowerWord(text: string) {
        return /^[a-z]\w*/.test(text)
    }

    addPresentation(sym: Sym, presentation: SymPresentation) {
        this._presentationCtx = this.presentationCtx.set(sym, presentation)
        this._textToSymMap = this.textToSymMap.set(presentation.ascii.text, sym)
    }

    getSym(text: string) {
        return this.textToSymMap.get(text)
    }
}
