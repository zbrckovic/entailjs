import stampit from '@stamp/it'
import { Expression } from '../../../abstract-structures'
import { Rule } from '../../../deduction-structure'
import { RegularRuleApplicationSpec } from '../../../deduction-structure/rule-application-spec'
import { existentialQuantifier } from '../../../primitive-syms'
import { startDeduction } from '../../deduction-interface'
import { GeneralizationRuleInterfaceMixin } from './generalization-rule-interface-mixin'

export const ExistentialGeneralizationRuleInterface = stampit({
  name: 'ExistentialGeneralizationRuleInterface',
  methods: {
    _concreteApply (newTerm, oldTerm) {
      const premise = this._getPremise()

      const child = oldTerm !== undefined
        ? premise.replaceFreeOccurrences(oldTerm, newTerm)
        : premise

      const ruleApplicationSpec = RegularRuleApplicationSpec({
        rule: Rule.ExistentialGeneralization,
        premises: [this._stepIndex],
        conclusion: Expression({
          sym: existentialQuantifier,
          boundSym: newTerm,
          children: [child]
        })
      })

      const newDeduction = this._deduction.applyRule(ruleApplicationSpec)

      return startDeduction(newDeduction)
    }
  }
}).compose(GeneralizationRuleInterfaceMixin)
