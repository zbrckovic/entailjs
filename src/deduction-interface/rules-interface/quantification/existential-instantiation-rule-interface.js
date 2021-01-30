import stampit from '@stamp/it'
import { Rule } from '../../../deduction-structure'
import { RegularRuleApplicationSpec } from '../../../deduction-structure/rule-application-spec'
import { startDeduction } from '../../deduction-interface'
import { InstantiationRuleInterface } from './instantiation-rule-interface'

export const ExistentialInstantiationRuleInterface = stampit({
  name: 'ExistentialInstantiationRuleInterface',
  methods: {
    _concreteApply (newTerm) {
      const premise = this._getPremise()

      const [child] = premise.children
      const conclusion = newTerm !== undefined
        ? child.replaceFreeOccurrences(premise.boundSym, newTerm)
        : child

      let termDependencies
      if (newTerm !== undefined) {
        const freeTerms = { ...conclusion.getFreeTerms() }
        delete freeTerms[newTerm.id]

        const freeTermIds = Object.keys(freeTerms).map(id => parseInt(id, 10))

        termDependencies = { dependent: newTerm.id, dependencies: new Set(freeTermIds) }
      }

      const ruleApplicationSpec = RegularRuleApplicationSpec({
        rule: Rule.ExistentialInstantiation,
        premises: [this._stepIndex],
        conclusion,
        termDependencies
      })

      const newDeduction = this._deduction.applyRule(ruleApplicationSpec)

      return startDeduction(newDeduction)
    }
  }
}).compose(InstantiationRuleInterface)
