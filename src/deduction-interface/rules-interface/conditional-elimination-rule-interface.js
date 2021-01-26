import stampit from '@stamp/it'
import { Rule } from '../../deduction-structure'
import { RegularRuleApplicationSpec } from '../../deduction-structure/rule-application-spec'
import { Base } from '../../utils'
import { startDeduction } from '../deduction-interface'

export const ConditionalEliminationRuleInterface = stampit({
  name: 'ConditionalEliminationRuleInterface',
  init ({
    deduction,
    conditionalStepIndex,
    antecedentStepIndex
  }) {
    this.deduction = deduction
    this.conditionalStepIndex = conditionalStepIndex
    this.antecedentStepIndex = antecedentStepIndex
  },
  methods: {
    apply () {
      const conditional = this.deduction.getStep(this.conditionalStepIndex).formula
      const [, consequent] = conditional.children

      const ruleApplicationSpec = RegularRuleApplicationSpec({
        rule: Rule.ConditionalElimination,
        premises: [this.conditionalStepIndex, this.antecedentStepIndex],
        conclusion: consequent
      })
      const newDeduction = this.deduction.applyRule(ruleApplicationSpec)

      return startDeduction(newDeduction)
    }
  }
}).compose(Base)
