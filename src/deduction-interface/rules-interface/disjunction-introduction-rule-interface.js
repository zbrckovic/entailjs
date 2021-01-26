import stampit from '@stamp/it'
import { Expression } from '../../abstract-structures'
import { Rule } from '../../deduction-structure'
import { RegularRuleApplicationSpec } from '../../deduction-structure/rule-application-spec'
import { disjunction } from '../../primitive-syms'
import { Base } from '../../utils'
import { startDeduction } from '../deduction-interface'

export const DisjunctionIntroductionRuleInterface = stampit({
  name: 'DisjunctionIntroductionRuleInterface',
  init ({ deduction, premiseIndex }) {
    this.deduction = deduction
    this.premiseIndex = premiseIndex
  },
  methods: {
    apply (disjunct, addingLeft = true) {
      const premise = this.deduction.getStep(this.premiseIndex).formula

      const children = addingLeft ? [disjunct, premise] : [premise, disjunct]

      const conclusion = Expression({
        sym: disjunction,
        children
      })

      const ruleApplicationSpec = RegularRuleApplicationSpec({
        rule: Rule.DisjunctionIntroduction,
        premises: [this.premiseIndex],
        conclusion
      })
      const newDeduction = this.deduction.applyRule(ruleApplicationSpec)

      return startDeduction(newDeduction)
    }
  }
}).compose(Base)
