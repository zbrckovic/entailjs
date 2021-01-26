import stampit from '@stamp/it'
import { Rule } from '../../deduction-structure'
import { RegularRuleApplicationSpec } from '../../deduction-structure/rule-application-spec'
import { Base } from '../../utils'
import { startDeduction } from '../deduction-interface'

export const PremiseRuleInterface = stampit({
  name: 'PremiseRuleInterface',
  init ({ deduction }) {
    this.deduction = deduction
  },
  methods: {
    apply (formula) {
      const ruleApplicationSpec = RegularRuleApplicationSpec({
        rule: Rule.Premise,
        conclusion: formula
      })

      const newDeduction = this.deduction.applyRule(ruleApplicationSpec)

      return startDeduction(newDeduction)
    }
  }
}).compose(Base)
