import { OrderedSet } from 'immutable'
import { RegularRuleApplicationSpec } from '../../deduction-structure/rule-application-spec'
import { createError, ErrorName } from '../../error'
import { isLogicalConsequence } from '../../propositional-logic/propositional-logic'
import { DeductionInterface } from '../deduction-interface'

export class TautologicalImplicationRuleInterface {
  constructor(deduction, stepIndexes = []) {
    this.deduction = deduction
    this.stepIndexes = stepIndexes
  }

  apply(formula) {
    const assumptions = this.stepIndexes.map(i => this.deduction.getStep(i).formula)

    if (!isLogicalConsequence(assumptions, formula)) {
      throw createError(
        ErrorName.INVALID_TAUTOLOGICAL_IMPLICATION,
        undefined,
        { assumptions, formula }
      )
    }

    const ruleApplicationSpec = RegularRuleApplicationSpec.tautologicalImplication(
      OrderedSet(this.stepIndexes),
      formula
    )
    const newDeduction = this.deduction.applyRule(ruleApplicationSpec)
    return new DeductionInterface(newDeduction)
  }
}
