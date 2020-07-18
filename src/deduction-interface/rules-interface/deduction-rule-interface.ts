import { DeductionInterface } from 'deduction-interface/deduction-interface'
import { Deduction } from 'deduction-structure'
import { RegularRuleApplicationSpec } from 'deduction-structure/rule-application-spec'

export class DeductionRuleInterface {
    constructor(
        private readonly deduction: Deduction,
        private readonly firstStepIndex: number,
        private readonly secondStepIndex: number
    ) {}

    apply() {
        const ruleApplicationSpec = RegularRuleApplicationSpec.deduction(
            this.deduction.getStep(this.firstStepIndex).formula,
            this.firstStepIndex,
            this.deduction.getStep(this.secondStepIndex).formula,
            this.secondStepIndex
        )
        const newDeduction = this.deduction.applyRule(ruleApplicationSpec)
        return new DeductionInterface(newDeduction)
    }
}
