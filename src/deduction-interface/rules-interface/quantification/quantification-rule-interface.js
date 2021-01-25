import _ from 'lodash'

export const QuantificationRuleInterface = ({ deduction, stepIndex }) => _.create(
  QuantificationRuleInterface.prototype,
  {
    _deduction: deduction,
    _stepIndex: stepIndex
  }
)

_.assign(QuantificationRuleInterface.prototype, {
  constructor: QuantificationRuleInterface,

  _getPremise () { return this._deduction.getStep(this._stepIndex).formula }
})
