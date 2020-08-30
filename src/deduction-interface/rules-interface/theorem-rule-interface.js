import { DeductionInterface } from '../deduction-interface'

export class TheoremRuleInterface {
  constructor(deduction) {
    this.deduction = deduction
  }

  apply() { return new DeductionInterface(this.deduction) }
}
