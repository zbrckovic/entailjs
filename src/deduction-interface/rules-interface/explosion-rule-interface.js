import stampit from '@stamp/it'
import { Rule } from '../../deduction-structure'
import { RegularRuleApplicationSpec } from '../../deduction-structure/rule-application-spec'
import { Base } from '../../utils'
import { startDeduction } from '../deduction-interface'

export const ExplosionRuleInterface = stampit({
  name: 'ExplosionRuleInterface',
  init ({
    deduction,
    affirmativeStepIndex,
    negativeStepIndex
  }) {
    this.deduction = deduction
    this.affirmativeStepIndex = affirmativeStepIndex
    this.negativeStepIndex = negativeStepIndex
  },
  methods: {
    apply (formula) {
      const ruleApplicationSpec = RegularRuleApplicationSpec({
        rule: Rule.Explosion,
        premises: [this.affirmativeStepIndex, this.negativeStepIndex],
        conclusion: formula
      })
      const newDeduction = this.deduction.applyRule(ruleApplicationSpec)

      return startDeduction(newDeduction)
    }
  }
}).compose(Base)
