import { connectWithBinarySym, Expression } from './abstract-structures/expression'
import { conjunction, implication } from './primitive-syms'

// Creates conjunction of `formulas`. If there's only one formula it returns it.
export const createConjunction = formulas =>
  formulas.length === 1 ? formulas[0] : connectWithBinarySym(formulas, conjunction)

export const createImplicationWithAntecedentsAsConjunction = (antecedents, consequent) =>
  Expression({
    sym: implication,
    children: [createConjunction(antecedents), consequent]
  })
