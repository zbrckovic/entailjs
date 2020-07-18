import { Expression } from 'abstract-structures/expression'
import { createImplicationWithAntecedentsAsConjunction } from 'formula-construction-util'
import { implication } from 'primitive-syms'
import { List } from 'immutable'
import * as util from './propositional-logic-util'
import { reduceToTruthFunctional } from './reduce-to-truth-functional'

export const isSatisfiable = (formula: Expression) => hasInterpretations(formula, true)

export const isFalsifiable = (formula: Expression) => hasInterpretations(formula, false)

export const isContingent = (formula: Expression) =>
    isSatisfiable(formula) && isFalsifiable(formula)

export const isTautology = (formula: Expression) => !isFalsifiable(formula)

export const isContradiction = (formula: Expression) => !isSatisfiable(formula)

export const isLogicalConsequence = (assumptions: Expression[], consequence: Expression) => {
    if (assumptions.length === 0) return isTautology(consequence)
    if (assumptions.length === 1) {
        return isTautology(
            new Expression({
                sym: implication,
                children: List.of(assumptions[0], consequence)
            })
        )
    }
    return isTautology(
        createImplicationWithAntecedentsAsConjunction(assumptions, consequence)
    )
}

const hasInterpretations = (formula: Expression, value: boolean) =>
    !findInterpretations(formula, value).isEmpty()

const findInterpretations = (formula: Expression, value: boolean) => {
    const reducedFormula = reduceToTruthFunctional(formula)
    return util.findInterpretations(reducedFormula, value)
}
