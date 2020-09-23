import { Expression } from '../abstract-structures/expression'
import { createImplicationWithAntecedentsAsConjunction } from '../formula-construction-util'
import { implication } from '../primitive-syms'
import * as util from './propositional-logic-util'
import { reduceToTruthFunctional } from './reduce-to-truth-functional'

export const isSatisfiable = formula => hasInterpretations(formula, true)

export const isFalsifiable = formula => hasInterpretations(formula, false)

export const isContingent = formula => isSatisfiable(formula) && isFalsifiable(formula)

export const isTautology = formula => !isFalsifiable(formula)

export const isContradiction = formula => !isSatisfiable(formula)

export const isLogicalConsequence = (assumptions, consequence) => {
  if (assumptions.length === 0) return isTautology(consequence)
  if (assumptions.length === 1) {
    return isTautology(
      Expression({
        sym: implication,
        children: [assumptions[0], consequence]
      })
    )
  }
  return isTautology(createImplicationWithAntecedentsAsConjunction(assumptions, consequence))
}

const hasInterpretations = (formula, value) => findInterpretations(formula, value).length > 0

const findInterpretations = (formula, value) => {
  const reducedFormula = reduceToTruthFunctional(formula)
  return util.findInterpretations(reducedFormula, value)
}
