// Given that `formula` is the result of an application of an instantiation rule to the `premise`
// determines which term was introduced in the substitution. If instantiation was vacuous
// returns `undefined`.
import { createError, ErrorName } from '../error'

export const determineNewTermInInstantiationResult = (formula, premise) => {
  const [firstOccurrence] = premise.findBoundOccurrences()
  if (firstOccurrence === undefined) return undefined

  try {
    return formula.getSubexpression(firstOccurrence.slice(1)).sym
  } catch (e) {
    if (e.name === ErrorName.NO_CHILD_AT_INDEX) {
      throw createError(ErrorName.INVALID_SUBSTITUTION_RESULT)
    }
    throw e
  }
}

// Given that `formula` is the result of an application of a generalization rule to the `premise`
// determine which terms were substituted and return them as an object `{ oldTerm, newTerm }`.
export const determineSubstitutionInGeneralizationResult = (formula, premise) => {
  const newTerm = formula.boundSym
  if (newTerm === undefined) throw createError(ErrorName.INVALID_SUBSTITUTION_RESULT)

  try {
    const [firstBoundOccurrencePosition] = formula.findBoundOccurrences()
    if (firstBoundOccurrencePosition === undefined) return { newTerm }
    const [, ...restIndexes] = firstBoundOccurrencePosition
    const oldTerm = premise.getSubexpression(restIndexes).sym
    return { oldTerm, newTerm }
  } catch (e) {
    if (e.name === ErrorName.NO_CHILD_AT_INDEX) {
      throw createError(ErrorName.INVALID_SUBSTITUTION_RESULT)
    }
    throw e
  }
}
