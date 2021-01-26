import stampit from '@stamp/it'
import { Base } from '../../../utils'

export const QuantificationRuleInterfaceMixin = stampit({
  name: 'QuantificationRuleInterfaceMixin',
  init ({ deduction, stepIndex }) {
    this._deduction = deduction
    this._stepIndex = stepIndex
  },
  methods: {
    _getPremise () { return this._deduction.getStep(this._stepIndex).formula }
  }
}).compose(Base)
