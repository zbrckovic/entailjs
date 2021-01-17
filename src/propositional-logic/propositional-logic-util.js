import { Category } from '../abstract-structures'
import { createError, ErrorName } from '../error'
import { generateValuesPermutations, primitiveTruthFunctions } from './primitive-truth-functions'
import { conditional, conjunction, disjunction, negation } from '../primitive-syms'
import _ from 'lodash'

export const evaluate = (formula, interpretation = {}) => {
  const { sym, children } = formula

  if (sym.getCategory() !== Category.FF) throw createError(ErrorName.NOT_TRUTH_FUNCTIONAL)

  if (sym.arity === 0) {
    const value = interpretation[sym.id]
    if (value === undefined) throw createError(ErrorName.NO_ASSIGNED_VALUE_ERROR)
    return value
  }

  const childrenValues = children.map(child => evaluate(child, interpretation))
  const truthFunction = getTruthFunction(sym)

  return truthFunction(...childrenValues)
}

// Find all interpretations of `formula` which make the value of formula equal to `value`.
export const findInterpretations = (formula, value) =>
  findInterpretationsLimitedByBaseInterpretation(formula, value)

// Find interpretations which are extensions of `interpretation`.
const findInterpretationsLimitedByBaseInterpretation = (
  formula,
  value,
  interpretation = {}
) => {
  const { sym, children } = formula

  if (sym.getCategory() !== Category.FF || sym.binds) {
    throw createError(ErrorName.NOT_TRUTH_FUNCTIONAL)
  }

  if (sym.arity === 0) {
    const fixedValue = interpretation[sym.id]
    if (fixedValue !== undefined) {
      return fixedValue !== value ? [] : [interpretation]
    }
    return [{ ...interpretation, [sym.id]: value }]
  }

  const truthFunction = getTruthFunction(sym)

  return generateValuesPermutations(sym.arity)
    .filter(args => truthFunction(...args) === value)
    .map(args => children.reduce(
      (interpretations, child, i) => findInterpretationsLimitedByBaseInterpretations(
        child,
        args[i],
        interpretations
      ),
      [interpretation]
    ))
    .reduce((intermediateResult, interpretations) => intermediateResult.concat(interpretations), [])
}

// Find interpretations which are extensions of `interpretations`.
const findInterpretationsLimitedByBaseInterpretations = (formula, value, interpretations) =>
  interpretations.reduce(
    (intermediateResult, interpretation) =>
      intermediateResult.concat(
        findInterpretationsLimitedByBaseInterpretation(formula, value, interpretation)
      ),
    []
  )

const getTruthFunction = sym => {
  const truthFunction = primitiveTruthFunctions[sym.id]
  if (truthFunction === undefined) throw createError(ErrorName.NO_ASSIGNED_VALUE_ERROR)
  return truthFunction
}

// Checks whether first formula is the negation of the second.
export const isNegationOf = (first, second) => {
  if (!first.sym.equals(negation)) return false
  const [firstChild] = first.children
  return _.isEqual(firstChild, second)
}

// Checks whether one formula is the negation of the other.
export const areCanonicallyContradictory = (formula1, formula2) => {
  return isNegationOf(formula1, formula2) || isNegationOf(formula2, formula1)
}

// Checks whether `formula` is of the form `A & ~A` or `~A & A`.
export const isCanonicalContradiction = formula => {
  const { sym, children } = formula
  if (!sym.equals(conjunction)) return false

  const [child1, child2] = children

  return areCanonicallyContradictory(child1, child2)
}

export const isDoubleNegation = formula => {
  const { sym, children } = formula

  if (!sym.equals(negation)) return false

  const [child] = children

  return child.sym.equals(negation)
}

// Checks whether `formula1` is a conjunction containing `formula2` as one of its conjuncts.
export const isConjunctionOf = (formula1, formula2) => {
  if (!formula1.sym.equals(conjunction)) return false
  const [conjunct1, conjunct2] = formula1.children
  return _.isEqual(conjunct1, formula2) || _.isEqual(conjunct2, formula2)
}

// Checks whether `formula1` is a disjunction containing `formula2` as one of its disjuncts.
export const isDisjunctionOf = (formula1, formula2) => {
  if (!formula1.sym.equals(disjunction)) return false
  const [disjunct1, disjunct2] = formula1.children
  return _.isEqual(disjunct1, formula2) || _.isEqual(disjunct2, formula2)
}

// Checks whether `formula2` is an antecedent of `formula1`.
export const isConditionalFrom = (formula1, formula2) => {
  if (!formula1.sym.equals(conditional)) return false
  const [antecedent] = formula1.children
  return _.isEqual(antecedent, formula2)
}

// Checks whether `formula2` is a consequent of `formula1`.
export const isConditionalTo = (formula1, formula2) => {
  if (!formula1.sym.equals(conditional)) return false
  const [, consequent] = formula1.children
  return _.isEqual(consequent, formula2)
}
