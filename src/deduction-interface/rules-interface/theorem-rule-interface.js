import stampit from '@stamp/it'
import { Base } from '../../utils'
import { startDeduction } from '../deduction-interface'

// TODO: needs more work when theorem handling is developed
export const TheoremRuleInterface = stampit({
  name: 'TheoremRuleInterface',
  init ({ deduction }) {
    this.deduction = deduction
  },
  methods: {
    apply () { return startDeduction(this.deduction) }
  }
}).compose(Base)
