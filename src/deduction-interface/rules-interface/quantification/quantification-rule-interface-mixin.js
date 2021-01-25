export const QuantificationRuleInterfaceMixin = {
  _getPremise () { return this._deduction.getStep(this._stepIndex).formula }
}
