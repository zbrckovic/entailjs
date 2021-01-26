import stampit from '@stamp/it'
import { Expression } from '../../abstract-structures'
import { Rule } from '../../deduction-structure'
import { RegularRuleApplicationSpec } from '../../deduction-structure/rule-application-spec'
import { conditional } from '../../primitive-syms'
import { Base } from '../../utils'
import { startDeduction } from '../deduction-interface'

export const ConditionalIntroductionRuleInterface = stampit({
  name: 'ConditionalIntroductionRuleInterface',
  init ({ deduction, step1Index, step2Index }) {
    this.deduction = deduction
    this.step1Index = step1Index
    this.step2Index = step2Index
  },
  methods: {
    apply () {
      const ruleApplicationSpec = RegularRuleApplicationSpec({
        rule: Rule.ConditionalIntroduction,
        premises: [this.step1Index, this.step2Index],
        conclusion: Expression({
          sym: conditional,
          children: [
            this.deduction.getStep(this.step1Index).formula,
            this.deduction.getStep(this.step2Index).formula
          ]
        }),
        assumptionToRemove: this.step1Index
      })
      const newDeduction = this.deduction.applyRule(ruleApplicationSpec)

      return startDeduction(newDeduction)
    }
  }
}).compose(Base)
