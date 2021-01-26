import stampit from '@stamp/it'
import { Expression } from '../../abstract-structures'
import { Rule } from '../../deduction-structure'
import { RegularRuleApplicationSpec } from '../../deduction-structure/rule-application-spec'
import { negation } from '../../primitive-syms'
import { Base } from '../../utils'
import { startDeduction } from '../deduction-interface'

export const NegationIntroductionRuleInterface = stampit({
  name: 'NegationIntroductionRuleInterface',
  init ({
    deduction,
    step1Index,
    step2Index,
    step3Index
  }) {
    this.deduction = deduction
    this.step1Index = step1Index
    this.step2Index = step2Index
    this.step3Index = step3Index
  },
  methods: {
    apply () {
      const ruleApplicationSpec = RegularRuleApplicationSpec({
        rule: Rule.NegationIntroduction,
        premises: [this.step1Index, this.step2Index, this.step3Index],
        conclusion: Expression({
          sym: negation,
          children: [this.deduction.getStep(this.step1Index).formula]
        }),
        assumptionToRemove: this.step1Index
      })
      const newDeduction = this.deduction.applyRule(ruleApplicationSpec)

      return startDeduction(newDeduction)
    }
  }
}).compose(Base)
