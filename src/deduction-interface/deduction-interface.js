import { Deduction } from '../deduction-structure'
import { createError, ErrorName } from '../error'
import { RulesInterface } from './rules-interface'

// Interface which can be used to perform deduction by repeatedly applying available rules. Validity
// of deduction is ensured on each step. Validity of the resulting deduction is guaranteed if
// initial deduction (if any) provided at the start os valid.
export const startDeduction = deduction => {
  const createIndexes = (...ordinals) => {
    const stepOrdinalOutOfRange = ordinals.find(ordinal => !(
      Number.isInteger(ordinal) && ordinal >= 1 && ordinal <= this.deduction.size
    ))

    if (stepOrdinalOutOfRange !== undefined) {
      throw createError(
        ErrorName.STEP_ORDINAL_OUT_OF_RANGE,
        undefined,
        { stepOrdinalOutOfRange, size: Deduction.getSize(deduction) }
      )
    }
  }

  // Select steps (formulas) to use as premises in the next rule.
  const selectSteps = (...ordinals) => {
    const indexes = createIndexes(...ordinals)
    return RulesInterface(this.deduction, ...indexes)
  }

  return ({ selectSteps })
}
