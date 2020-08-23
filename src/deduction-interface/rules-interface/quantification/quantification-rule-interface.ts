import { Deduction } from '../../../deduction-structure'

export abstract class QuantificationRuleInterface {
    constructor(
        protected readonly deduction: Deduction,
        protected readonly stepIndex: number
    ) {}

    protected get premise() { return this.deduction.getStep(this.stepIndex).formula }
}
