import stampit from '@stamp/it'
import { Category, Expression, Kind, Sym } from '../../abstract-structures'
import { createError, ErrorName } from '../../error'
import {
  createTextToSymMap,
  getMaxSymId,
  Placement,
  SymPresentation,
  SyntacticInfo
} from '../../presentation/sym-presentation'
import { Base } from '../../utils'
import { isBracketed } from '../peg/ast-formula'

// `AstProcessor` can process formula AST (the result of parsing formula) and create an
// `Expression`. As a side-effect of this processing it updates its internal state. Internal state
// tracks information about processed symbols.
export const AstProcessor = stampit({
  name: 'AstProcessor',
  init ({
    // All symbols by their ids.
    syms,
    // Presentations by symbol ids.
    presentations,
    // Symbols by their ascii representation texts (used for optimization).
    textToSymMap = createTextToSymMap(presentations, syms),
    // Used when new symbol must be introduced to decide about its id (used for optimization).
    maxSymId = getMaxSymId(textToSymMap)
  }) {
    this.syms = syms
    this.presentations = presentations
    this.textToSymMap = textToSymMap
    this.maxSymId = maxSymId
  },
  methods: {
    // Processes formula AST (returned from peg parser) and tries to construct an expression (more
    // precisely it tries to construct a formula because parser accepts only formula expressions).
    // If it can't, throws an error.
    process (ast, kind = Kind.Formula) {
      if (isBracketed(ast)) return this.process(ast.expression, kind)

      const childrenAsts = ast.children
      const arity = childrenAsts.length

      const mainSym = this.textToSymMap[ast.sym] ??
        this.createSym(kind, arity, ast.boundSym !== undefined, ast.sym, ast.symPlacement)

      const mainSymPresentation = this.presentations[mainSym.id]

      if (mainSymPresentation.ascii.placement !== ast.symPlacement) {
        throw createError(
          ErrorName.INVALID_SYMBOL_PLACEMENT,
          undefined,
          { sym: mainSym, presentation: mainSymPresentation, placement: ast.symPlacement }
        )
      }

      if (mainSym.arity !== arity) {
        throw createError(
          ErrorName.INVALID_ARITY,
          undefined,
          { sym: mainSym, presentation: mainSymPresentation, arity }
        )
      }
      if (mainSym.kind !== kind) {
        throw createError(
          ErrorName.INVALID_SYMBOL_KIND,
          undefined,
          { sym: mainSym, presentation: mainSymPresentation, kind }
        )
      }

      let boundSym
      if (ast.boundSym !== undefined) {
        boundSym = this.textToSymMap[ast.boundSym]

        if (boundSym !== undefined) {
          if (boundSym.getCategory() !== Category.TT) {
            throw createError(
              ErrorName.INVALID_BOUND_SYMBOL_CATEGORY,
              undefined,
              { sym: boundSym, presentation: this.presentations[boundSym.id] }
            )
          }

          if (boundSym.arity !== 0) {
            throw createError(
              ErrorName.INVALID_BOUND_SYMBOL_ARITY,
              undefined,
              { sym: boundSym, presentation: this.presentations[boundSym.id] }
            )
          }
        } else {
          boundSym = this.createSym(Kind.Term, 0, false, ast.boundSym, Placement.Prefix)
        }
      }

      return Expression({
        sym: mainSym,
        boundSym: boundSym,
        children: childrenAsts.map(childAst => this.process(childAst, mainSym.argumentKind))
      })
    },

    // Updates internal state by adding new association between symbol and its presentation.
    addPresentation (sym, presentation) {
      this.syms = { ...this.syms, [sym.id]: sym }
      this.presentations = { ...this.presentations, [sym.id]: presentation }
      this.textToSymMap = { ...this.textToSymMap, [presentation.ascii.text]: sym }
      this.maxSymId = Math.max(this.maxSymId, sym.id)
    },

    // Creates new symbol, generates new id for it, updates internal state according to the new
    // symbol addition and returns newly created symbol.
    createSym (kind, arity, binds, text, placement) {
      const argumentKind = determineArgumentKind(kind, text)
      const id = this.maxSymId + 1
      const sym = Sym({ id, kind, argumentKind, arity, binds })
      const presentation = SymPresentation({ ascii: SyntacticInfo({ text, placement }) })

      this.addPresentation(sym, presentation)

      return sym
    },

    // Gets symbol associated with `text`.
    getSym (text) { return this.textToSymMap[text] },
    getSyms () { return this.syms },
    getPresentations () { return this.presentations },
    getTextToSymMap () { return this.textToSymMap },
    getMaxSymId () { return this.maxSymId }
  }
}).compose(Base)

const determineArgumentKind = (kind, text) => {
  switch (kind) {
    case Kind.Formula: {
      if (isUpperWord(text)) return Kind.Term
      if (isLowerWord(text)) return Kind.Formula
      break
    }
    case Kind.Term: {
      if (isLowerWord(text)) return Kind.Term
      break
    }
  }
}

const isUpperWord = text => /^[A-Z]\w*/.test(text)
const isLowerWord = text => /^[a-z]\w*/.test(text)
