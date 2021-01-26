import stampit from '@stamp/it'
import { Rule } from '../../deduction-structure'
import { RegularRuleApplicationSpec } from '../../deduction-structure/rule-application-spec'
import { Base } from '../../utils'
import { startDeduction } from '../deduction-interface'

export const ConjunctionEliminationRuleInterface = stampit({
  name: 'ConjunctionEliminationRuleInterface',
  init ({ deduction, premiseIndex }) {
    this.deduction = deduction
    this.premiseIndex = premiseIndex
  },
  methods: {
    // Expects 0 or 1.
    apply (childIndex) {
      const premise = this.deduction.getStep(this.premiseIndex).formula
      const conclusion = premise.children[childIndex]

      const ruleApplicationSpec = RegularRuleApplicationSpec({
        rule: Rule.ConjunctionElimination,
        premises: [this.premiseIndex],
        conclusion
      })
      const newDeduction = this.deduction.applyRule(ruleApplicationSpec)

      return startDeduction(newDeduction)
    }
  }
}).compose(Base)
