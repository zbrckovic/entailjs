import stampit from '@stamp/it'
import { Rule } from '../../deduction-structure'
import { RegularRuleApplicationSpec } from '../../deduction-structure/rule-application-spec'
import { Base } from '../../utils'
import { startDeduction } from '../deduction-interface'

export const NegationEliminationRuleInterface = stampit({
  name: 'NegationEliminationRuleInterface',
  init ({ deduction, stepIndex }) {
    this.deduction = deduction
    this.stepIndex = stepIndex
  },
  methods: {
    apply () {
      const { formula } = this.deduction.getStep(this.stepIndex)

      const ruleApplicationSpec = RegularRuleApplicationSpec({
        rule: Rule.NegationElimination,
        premises: [this.stepIndex],
        conclusion: formula.children[0].children[0]
      })
      const newDeduction = this.deduction.applyRule(ruleApplicationSpec)

      return startDeduction(newDeduction)
    }
  }
}).compose(Base)
