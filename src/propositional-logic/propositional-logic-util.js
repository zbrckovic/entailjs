import { Category, Sym } from '../abstract-structures/sym'
import { createError, ErrorName } from '../error'
import { generateValuesPermutations, primitiveTruthFunctions } from './primitive-truth-functions'

export const evaluate = (formula, interpretation = {}) => {
  const { sym, children } = formula

  if (Sym.getCategory(sym) !== Category.FF) throw createError(ErrorName.NOT_TRUTH_FUNCTIONAL)

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

  if (Sym.getCategory(sym) !== Category.FF || sym.binds) {
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
