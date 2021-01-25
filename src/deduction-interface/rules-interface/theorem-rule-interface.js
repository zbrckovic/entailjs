import { startDeduction } from '../deduction-interface'
import _ from 'lodash'

// TODO: needs more work when theorem handling is developed
export const TheoremRuleInterface = ({ deduction }) => _.create(TheoremRuleInterface.prototype, {
  _deduction: deduction
})

_.assign(TheoremRuleInterface.prototype, {
  constructor: TheoremRuleInterface,

  apply () { return startDeduction(this._deduction) }
})
