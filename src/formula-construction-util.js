import { connectWithBinarySym, Expression } from './abstract-structures/expression'
import { conjunction, implication } from './primitive-syms'

/** Create conjunction of `formulas`. If there's only one formula return it. */
export const createConjunction = formulas =>
  formulas.length === 1 ? formulas[0] : connectWithBinarySym(formulas, conjunction)

export const createImplicationWithAntecedentsAsConjunction = (antecedents, consequent) =>
  Expression.create({
    sym: implication,
    children: [createConjunction(antecedents), consequent]
  })
