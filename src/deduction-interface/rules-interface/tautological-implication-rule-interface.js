import { RegularRuleApplicationSpec } from '../../deduction-structure/rule-application-spec'
import { createError, ErrorName } from '../../error'
import { isLogicalConsequence } from '../../propositional-logic/propositional-logic'
import { Rule } from '../../deduction-structure'
import { startDeduction } from '../deduction-interface'
import _ from 'lodash'

export const TautologicalImplicationRuleInterface = ({ deduction, stepIndexes = [] }) => _.create(
  TautologicalImplicationRuleInterface.prototype,
  {
    _deduction: deduction,
    _stepIndexes: stepIndexes
  }
)

_.assign(TautologicalImplicationRuleInterface.prototype, {
  constructor: TautologicalImplicationRuleInterface,

  apply (formula) {
    const assumptions = this._stepIndexes.map(i => this._deduction.getStep(i).formula)

    if (!isLogicalConsequence(assumptions, formula)) {
      throw createError(
        ErrorName.INVALID_TAUTOLOGICAL_IMPLICATION,
        undefined,
        { assumptions, formula }
      )
    }

    const ruleApplicationSpec = RegularRuleApplicationSpec({
      rule: Rule.TautologicalImplication,
      premises: [...this._stepIndexes].sort(),
      conclusion: formula
    })

    const newDeduction = this._deduction.applyRule(ruleApplicationSpec)

    return startDeduction(newDeduction)
  }
})
