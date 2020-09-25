import { Deduction } from '../deduction-structure'
import { createError, ErrorName } from '../error'
import { RulesInterface } from './rules-interface'

// Interface which can be used to perform deduction by repeatedly applying available rules. Validity
// of deduction is ensured on each step. Therefore validity of the resulting deduction is guaranteed
// if initial deduction (if any) provided at the start was valid.
export const startDeduction = (deduction = Deduction()) => {
  const createIndexes = (...ordinals) => {
    const stepOrdinalOutOfRange = ordinals.find(ordinal => !(
      Number.isInteger(ordinal) && ordinal >= 1 && ordinal <= Deduction.getSize(deduction)
    ))

    if (stepOrdinalOutOfRange !== undefined) {
      throw createError(
        ErrorName.STEP_ORDINAL_OUT_OF_RANGE,
        undefined,
        { stepOrdinalOutOfRange, size: Deduction.getSize(deduction) }
      )
    }

    return ordinals.map(ordinal => ordinal - 1)
  }

  // Selects steps (formulas) to use as premises in the next rule.
  const selectSteps = (...ordinals) => {
    const indexes = createIndexes(...ordinals)
    return RulesInterface(deduction, ...indexes)
  }

  return ({ deduction, selectSteps })
}
