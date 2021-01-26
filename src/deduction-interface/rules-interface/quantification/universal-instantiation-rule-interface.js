import stampit from '@stamp/it'
import { Rule } from '../../../deduction-structure'
import { RegularRuleApplicationSpec } from '../../../deduction-structure/rule-application-spec'
import { startDeduction } from '../../deduction-interface'
import { InstantiationRuleInterfaceMixin } from './instantiation-rule-interface-mixin'

export const UniversalInstantiationRuleInterface = stampit({
  name: 'UniversalInstantiationRuleInterface',
  methods: {
    _concreteApply (newTerm) {
      const { boundSym, children } = this._getPremise()

      const [child] = children

      const conclusion = newTerm !== undefined
        ? child.replaceFreeOccurrences(boundSym, newTerm)
        : child

      const ruleApplicationSpec = RegularRuleApplicationSpec({
        rule: Rule.UniversalInstantiation,
        premises: [this._stepIndex],
        conclusion
      })

      const newDeduction = this._deduction.applyRule(ruleApplicationSpec)

      return startDeduction(newDeduction)
    }
  }
}).compose(InstantiationRuleInterfaceMixin)
