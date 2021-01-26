import stampit from '@stamp/it'
import { Rule } from '../../deduction-structure'
import { RegularRuleApplicationSpec } from '../../deduction-structure/rule-application-spec'
import { Base } from '../../utils'
import { startDeduction } from '../deduction-interface'

export const DisjunctionEliminationRuleInterface = stampit({
  name: 'DisjunctionEliminationRuleInterface',
  init ({
    deduction,
    disjunctionStepIndex,
    conditional1StepIndex,
    conditional2StepIndex,
    consequent
  }) {
    this.deduction = deduction
    this.disjunctionStepIndex = disjunctionStepIndex
    this.conditional1StepIndex = conditional1StepIndex
    this.conditional2StepIndex = conditional2StepIndex
    this.consequent = consequent
  },
  methods: {
    apply () {
      const ruleApplicationSpec = RegularRuleApplicationSpec({
        rule: Rule.DisjunctionElimination,
        premises: [
          this.disjunctionStepIndex,
          this.conditional1StepIndex,
          this.conditional2StepIndex
        ],
        conclusion: this.consequent
      })

      const newDeduction = this.deduction.applyRule(ruleApplicationSpec)

      return startDeduction(newDeduction)
    }
  }
}).compose(Base)
