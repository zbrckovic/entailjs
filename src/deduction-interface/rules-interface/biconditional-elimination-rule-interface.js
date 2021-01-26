import stampit from '@stamp/it'
import { Expression } from '../../abstract-structures'
import { Rule } from '../../deduction-structure'
import { RegularRuleApplicationSpec } from '../../deduction-structure/rule-application-spec'
import { conditional } from '../../primitive-syms'
import { Base } from '../../utils'
import { startDeduction } from '../deduction-interface'

export const BiconditionalEliminationRuleInterface = stampit({
  name: 'BiconditionalEliminationRuleInterface',
  init ({ deduction, premiseIndex }) {
    this.deduction = deduction
    this.premiseIndex = premiseIndex
  },
  methods: {
    apply (reversed = false) {
      const premise = this.deduction.getStep(this.premiseIndex).formula

      const [antecedent, consequent] = premise.children
      const children = reversed ? [consequent, antecedent] : [antecedent, consequent]

      const ruleApplicationSpec = RegularRuleApplicationSpec({
        rule: Rule.BiconditionalElimination,
        premises: [this.premiseIndex],
        conclusion: Expression({ sym: conditional, children })
      })

      const newDeduction = this.deduction.applyRule(ruleApplicationSpec)

      return startDeduction(newDeduction)
    }
  }
}).compose(Base)
