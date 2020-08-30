export class QuantificationRuleInterface {
  constructor(deduction, stepIndex) {
    this.deduction = deduction
    this.stepIndex = stepIndex
  }

  get premise() { return this.deduction.getStep(this.stepIndex).formula }
}
