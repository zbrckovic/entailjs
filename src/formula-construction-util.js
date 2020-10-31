import { connectWithBinarySym, Expression } from './abstract-structures'
import { conjunction, conditional } from './primitive-syms'

// Creates conjunction of `formulas`. If there's only one formula it returns it.
export const createConjunction = formulas =>
  formulas.length === 1 ? formulas[0] : connectWithBinarySym(formulas, conjunction)

export const createConditionalWithAntecedentsAsConjunction = (antecedents, consequent) =>
  Expression({
    sym: conditional,
    children: [createConjunction(antecedents), consequent]
  })
