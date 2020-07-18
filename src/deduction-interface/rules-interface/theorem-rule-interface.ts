import { Deduction } from 'deduction-structure'
import { DeductionInterface } from 'deduction-interface/deduction-interface'

export class TheoremRuleInterface {
    constructor(private readonly deduction: Deduction) {}

    apply() { return new DeductionInterface(this.deduction) }
}
