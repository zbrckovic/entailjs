import { RegularRuleApplicationSpec } from '../../deduction-structure/rule-application-spec'
import { createError, ErrorName } from '../../error'
import { isLogicalConsequence } from '../../propositional-logic/propositional-logic'
import { Deduction, Rule } from '../../deduction-structure'
import { startDeduction } from '../deduction-interface'

export const TautologicalImplicationRuleInterface = (deduction, stepIndexes = []) => {
  const apply = formula => {
    const assumptions = stepIndexes.map(i => Deduction.getStep(deduction, i).formula)

    if (!isLogicalConsequence(assumptions, formula)) {
      throw createError(
        ErrorName.INVALID_TAUTOLOGICAL_IMPLICATION,
        undefined,
        { assumptions, formula }
      )
    }

    const ruleApplicationSpec = RegularRuleApplicationSpec({
      rule: Rule.TautologicalImplication,
      premises: stepIndexes,
      conclusion: formula
    })

    const newDeduction = Deduction.applyRule(deduction, ruleApplicationSpec)

    return startDeduction(newDeduction)
  }

  return ({ apply })
}
