import stampit from '@stamp/it'
import { Expression } from '../../abstract-structures'
import { Rule } from '../../deduction-structure'
import { RegularRuleApplicationSpec } from '../../deduction-structure/rule-application-spec'
import { conjunction } from '../../primitive-syms'
import { Base } from '../../utils'
import { startDeduction } from '../deduction-interface'

export const ConjunctionIntroductionRuleInterface = stampit({
  name: 'ConjunctionIntroductionRuleInterface',
  init ({ deduction, premise1Index, premise2Index }) {
    this.deduction = deduction
    this.premise1Index = premise1Index
    this.premise2Index = premise2Index
  },
  methods: {
    apply () {
      const ruleApplicationSpec = RegularRuleApplicationSpec({
        rule: Rule.ConjunctionIntroduction,
        premises: [this.premise1Index, this.premise2Index],
        conclusion: Expression({
          sym: conjunction,
          children: [
            this.deduction.getStep(this.premise1Index).formula,
            this.deduction.getStep(this.premise2Index).formula
          ]
        })
      })
      const newDeduction = this.deduction.applyRule(ruleApplicationSpec)

      return startDeduction(newDeduction)
    }
  }
}).compose(Base)
