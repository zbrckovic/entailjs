import { List } from 'immutable'
import { Expression } from '../../abstract-structures/expression'
import { Category, Kind, Sym } from '../../abstract-structures/sym'
import { createError, ErrorName } from '../../error'
import {
  createTextToSymMap,
  getMaxSymId,
  Placement,
  SymPresentation,
  SyntacticInfo
} from '../../presentation/sym-presentation'
import { isBracketed } from '../peg/ast-formula'

export class AstProcessor {
  get presentationCtx() {
    return this._presentationCtx
  }

  get textToSymMap() {
    return this._textToSymMap
  }

  get maxSymId() {
    return this._maxSymId
  }

  /**
   * @param presentationCtx
   * @param textToSymMap - For optimization
   * @param maxSymId - For optimization
   */
  constructor(presentationCtx, textToSymMap, maxSymId) {
    this._presentationCtx = presentationCtx
    this._textToSymMap = textToSymMap ?? createTextToSymMap(this._presentationCtx)
    this._maxSymId = maxSymId ?? getMaxSymId(this._textToSymMap)
  }

  process(ast, kind = Kind.Formula) {
    if (isBracketed(ast)) return this.process(ast.expression, kind)

    const childrenAsts = List(ast.children)
    const arity = childrenAsts.size

    const mainSym = this._textToSymMap.get(ast.sym) ??
      this._createSym(kind, arity, ast.boundSym !== undefined, ast.sym, ast.symPlacement)

    const mainSymPresentation = this._presentationCtx.get(mainSym)

    if (mainSymPresentation.ascii.placement !== ast.symPlacement) {
      throw createError(
        ErrorName.INVALID_SYMBOL_PLACEMENT,
        undefined,
        {
          sym: mainSym,
          presentation: mainSymPresentation,
          placement: ast.symPlacement
        }
      )
    }

    if (mainSym.arity !== arity) {
      throw createError(
        ErrorName.INVALID_ARITY,
        undefined,
        {
          sym: mainSym,
          presentation: mainSymPresentation,
          arity
        }
      )
    }
    if (mainSym.kind !== kind) {
      throw createError(
        ErrorName.INVALID_SYMBOL_KIND,
        undefined,
        {
          sym: mainSym,
          presentation: mainSymPresentation,
          kind
        }
      )
    }

    let boundSym
    if (ast.boundSym !== undefined) {
      boundSym = this._textToSymMap.get(ast.boundSym)

      if (boundSym !== undefined) {
        if (boundSym.getCategory() !== Category.TT) {
          throw createError(
            ErrorName.INVALID_BOUND_SYMBOL_CATEGORY,
            undefined,
            {
              sym: boundSym,
              presentation: this._presentationCtx.get(boundSym)
            }
          )
        }

        if (boundSym.arity !== 0) {
          throw createError(
            ErrorName.INVALID_BOUND_SYMBOL_ARITY,
            undefined,
            {
              sym: boundSym,
              presentation: this._presentationCtx.get(boundSym)
            }
          )
        }
      } else {
        boundSym = this._createSym(Kind.Term, 0, false, ast.boundSym, Placement.Prefix)
      }
    }

    return new Expression({
      sym: mainSym,
      boundSym: boundSym,
      children: childrenAsts.map(childAst => this.process(childAst, mainSym.argumentKind))
    })
  }

  _createSym(kind, arity, binds, text, placement) {
    const argumentKind = AstProcessor._determineArgumentKind(kind, text)
    const id = this.maxSymId + 1
    const sym = new Sym({
      id,
      kind,
      argumentKind,
      arity,
      binds
    })
    const symPresentation = new SymPresentation({
      ascii: new SyntacticInfo({
        text,
        placement
      })
    })

    this._textToSymMap = this._textToSymMap.set(text, sym)
    this._presentationCtx = this._presentationCtx.set(sym, symPresentation)

    this._maxSymId = id

    return sym
  }

  static _determineArgumentKind(kind, text) {
    switch (kind) {
      case Kind.Formula: {
        if (AstProcessor._isUpperWord(text)) return Kind.Term
        if (AstProcessor._isLowerWord(text)) return Kind.Formula
        break
      }
      case Kind.Term: {
        if (AstProcessor._isLowerWord(text)) return Kind.Term
        break
      }
    }
  }

  static _isUpperWord(text) { return /^[A-Z]\w*/.test(text) }

  static _isLowerWord(text) { return /^[a-z]\w*/.test(text) }

  addPresentation(sym, presentation) {
    this._presentationCtx = this.presentationCtx.set(sym, presentation)
    this._textToSymMap = this.textToSymMap.set(presentation.ascii.text, sym)
  }

  getSym(text) {
    return this.textToSymMap.get(text)
  }
}
