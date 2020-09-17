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
  get syms() {
    return this._syms
  }

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
   * @param syms - syms by id
   * @param presentationCtx - presentationsById
   * @param textToSymMap - For optimization
   * @param maxSymId - For optimization
   */
  constructor(syms, presentationCtx, textToSymMap, maxSymId) {
    this._syms = syms
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

    const mainSymPresentation = this._presentationCtx[mainSym.id]

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
      boundSym = this._textToSymMap[ast.boundSym.id]

      if (boundSym !== undefined) {
        if (Sym.getCategory(boundSym) !== Category.TT) {
          throw createError(
            ErrorName.INVALID_BOUND_SYMBOL_CATEGORY,
            undefined,
            {
              sym: boundSym,
              presentation: this._presentationCtx[boundSym.id]
            }
          )
        }

        if (boundSym.arity !== 0) {
          throw createError(
            ErrorName.INVALID_BOUND_SYMBOL_ARITY,
            undefined,
            {
              sym: boundSym,
              presentation: this._presentationCtx[boundSym.id]
            }
          )
        }
      } else {
        boundSym = this._createSym(Kind.Term, 0, false, ast.boundSym, Placement.Prefix)
      }
    }

    return Expression.create({
      sym: mainSym,
      boundSym: boundSym,
      children: childrenAsts.map(childAst => this.process(childAst, mainSym.argumentKind))
    })
  }

  _createSym(kind, arity, binds, text, placement) {
    const argumentKind = AstProcessor._determineArgumentKind(kind, text)
    const id = this.maxSymId + 1
    const sym = Sym.create({ id, kind, argumentKind, arity, binds })
    const symPresentation = SymPresentation.create({
      ascii: SyntacticInfo.create({ text, placement })
    })

    this._syms = { ...this._syms, [sym.id]: sym }
    this._textToSymMap = { ...this._textToSymMap, [text]: sym }
    this._presentationCtx = { ...this._presentationCtx, [sym.id]: symPresentation }
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
    this._syms = { ...this._syms, [sym.id]: sym }
    this._presentationCtx = { ...this.presentationCtx, [sym.id]: presentation }
    this._textToSymMap = { ...this.textToSymMap, [presentation.ascii.text]: sym }
    this._maxSymId = Math.max(this.maxSymId, sym.id)
  }

  getSym(text) {
    return this.textToSymMap[text]
  }
}
