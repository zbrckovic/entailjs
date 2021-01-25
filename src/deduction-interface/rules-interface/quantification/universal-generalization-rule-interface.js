import { RegularRuleApplicationSpec } from '../../../deduction-structure/rule-application-spec'
import { Rule } from '../../../deduction-structure'
import { Expression } from '../../../abstract-structures'
import { universalQuantifier } from '../../../primitive-syms'
import { startDeduction } from '../../deduction-interface'
import _ from 'lodash'
import { GeneralizationRuleInterface } from './generalization-rule-interface'

export const UniversalGeneralizationRuleInterface = ({ deduction, stepIndex }) => _.create(
  UniversalGeneralizationRuleInterface.prototype,
  { ...GeneralizationRuleInterface({ deduction, stepIndex }) }
)

_.assign(UniversalGeneralizationRuleInterface.prototype, {
  ...GeneralizationRuleInterface.prototype,

  constructor: UniversalGeneralizationRuleInterface,

  _concreteApply (newTerm, oldTerm) {
    const premise = this._getPremise()

    const child = oldTerm !== undefined
      ? premise.replaceFreeOccurrences(oldTerm, newTerm)
      : premise

    let termDependencies
    if (oldTerm !== undefined) {
      const freeTerms = { ...premise.getFreeTerms() }
      delete freeTerms[oldTerm.id]

      const freeTermIds = Object.keys(freeTerms).map(id => parseInt(id, 10))

      termDependencies = { dependent: oldTerm.id, dependencies: new Set(freeTermIds) }
    }

    const ruleApplicationSpec = RegularRuleApplicationSpec({
      rule: Rule.UniversalGeneralization,
      premises: [this._stepIndex],
      conclusion: Expression({
        sym: universalQuantifier,
        boundSym: newTerm,
        children: [child]
      }),
      termDependencies
    })

    const newDeduction = this._deduction.applyRule(ruleApplicationSpec)

    return startDeduction(newDeduction)
  }
})
