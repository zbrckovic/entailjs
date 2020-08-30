import { Map, Set } from 'immutable'
import { Category } from '../abstract-structures/sym'
import { createError, ErrorName } from '../error'
import { primitiveTruthFunctions } from './primitive-truth-functions'

export const evaluate = ({ sym, children }, interpretation = Map()) => {
  if (sym.getCategory() !== Category.FF) throw createError(ErrorName.NOT_TRUTH_FUNCTIONAL)

  if (sym.arity === 0) {
    const value = interpretation.get(sym)
    if (value === undefined) throw createError(ErrorName.NO_ASSIGNED_VALUE_ERROR)
    return value
  }

  const childrenValues = children.map(child => evaluate(child, interpretation))

  return getTruthTable(sym).get(childrenValues)
}

/** Find all interpretations of `formula` which make the value of formula equal to `value`. */
export const findInterpretations = (formula, value) =>
  findInterpretationsLimitedByBaseInterpretation(formula, value)

/** Find interpretations which are extensions of `interpretation`. */
const findInterpretationsLimitedByBaseInterpretation = (
  { sym, children },
  value,
  interpretation = Map()
) => {
  if (sym.getCategory() !== Category.FF || sym.binds) {
    throw createError(ErrorName.NOT_TRUTH_FUNCTIONAL)
  }

  if (sym.arity === 0) {
    const fixedValue = interpretation.get(sym)
    if (fixedValue !== undefined) return fixedValue !== value ? Set() : Set.of(interpretation)
    return Set.of(interpretation.set(sym, value))
  }

  return getTruthTable(sym)
    .entrySeq()
    .filter(([, tableValue]) => tableValue === value)
    .map(([tableArgs]) => tableArgs)
    .map(tableArgs => children.reduce(
      (interpretations, child, i) => findInterpretationsLimitedByBaseInterpretations(
        child,
        tableArgs.get(i),
        interpretations
      ),
      Set.of(interpretation)
    ))
    .reduce((result, interpretations) => result.union(interpretations), Set())
}

/** Find interpretations which are extensions of `interpretations`. */
const findInterpretationsLimitedByBaseInterpretations = (formula, value, interpretations) =>
  interpretations.reduce(
    (result, interpretation) =>
      result.union(findInterpretationsLimitedByBaseInterpretation(formula, value, interpretation)),
    Set()
  )

const getTruthTable = sym => {
  const truthFunction = primitiveTruthFunctions.get(sym)
  if (truthFunction === undefined) throw createError(ErrorName.NO_ASSIGNED_VALUE_ERROR)
  return truthFunction
}
