import _ from 'lodash'
import { RegularRuleApplicationSpec } from '../../../deduction-structure/rule-application-spec'
import { Rule } from '../../../deduction-structure'
import { startDeduction } from '../../deduction-interface'
import { InstantiationRuleInterface } from './instantiation-rule-interface'

export const UniversalInstantiationRuleInterface = ({ deduction, stepIndex }) => _.create(
  UniversalInstantiationRuleInterface.prototype,
  { ...InstantiationRuleInterface({ deduction, stepIndex }) }
)

_.assign(UniversalInstantiationRuleInterface.prototype, {
  ...InstantiationRuleInterface.prototype,

  constructor: UniversalInstantiationRuleInterface,

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
})
