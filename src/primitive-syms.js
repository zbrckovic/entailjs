import { Sym } from './abstract-structures/sym'

export const negation = Sym.createFF({ id: 0, arity: 1 })
export const conjunction = Sym.createFF({ id: 1, arity: 2 })
export const disjunction = Sym.createFF({ id: 2, arity: 2 })
export const implication = Sym.createFF({ id: 3, arity: 2 })
export const equivalence = Sym.createFF({ id: 4, arity: 2 })
export const universalQuantifier = Sym.createFF({ id: 5, arity: 1, binds: true })
export const existentialQuantifier = Sym.createFF({ id: 6, arity: 1, binds: true })

export const primitiveSyms = {
  [negation.id]: negation,
  [conjunction.id]: conjunction,
  [disjunction.id]: disjunction,
  [implication.id]: implication,
  [equivalence.id]: equivalence,
  [universalQuantifier.id]: universalQuantifier,
  [existentialQuantifier.id]: existentialQuantifier
}
