import { Deduction } from '../deduction-structure'
import { EntailCoreError } from '../error'
import { RulesInterface } from './rules-interface'

/**
 * Interface which can be used to perform deduction by repeatedly applying available rules.
 *
 * Validity of deduction is ensured on each step. Validity of the resulting deduction is guaranteed
 * if initial deduction (if any) provided at the start os valid.
 */
export class DeductionInterface {
    static start(deduction = new Deduction()) { return new DeductionInterface(deduction) }

    constructor(readonly deduction: Deduction) {}

    /** Select steps (formulas) to use as premises in the next rule. */
    selectSteps(...ordinals: number[]) {
        const indexes = this.createIndexes(...ordinals)
        return RulesInterface(this.deduction, ...indexes)
    }

    private createIndexes(...ordinals: number[]) {
        const stepOrdinalOutOfRange = ordinals.find(ordinal => !(
            Number.isInteger(ordinal) && ordinal >= 1 && ordinal <= this.deduction.size
        ))

        if (stepOrdinalOutOfRange !== undefined) {
            throw new StepOrdinalOutOfRangeError(stepOrdinalOutOfRange, this.deduction.size)
        }

        return ordinals.map(ordinal => ordinal - 1)
    }
}

export class StepOrdinalOutOfRangeError extends EntailCoreError {
    constructor(
        readonly stepOrdinal: number,
        readonly maxStepOrdinal: number
    ) {
        super(`step ordinal ${stepOrdinal} is out of range [1 - ${maxStepOrdinal}]`)
    }
}
