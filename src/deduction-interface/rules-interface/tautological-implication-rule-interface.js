import stampit from '@stamp/it'
import { Rule } from '../../deduction-structure'
import { RegularRuleApplicationSpec } from '../../deduction-structure/rule-application-spec'
import { createError, ErrorName } from '../../error'
import { isLogicalConsequence } from '../../propositional-logic/propositional-logic'
import { Base } from '../../utils'
import { startDeduction } from '../deduction-interface'

export const TautologicalImplicationRuleInterface = stampit({
  name: 'TautologicalImplicationRuleInterface',
  init ({ deduction, stepIndexes }) {
    this.deduction = deduction
    this.stepIndexes = stepIndexes
  },
  methods: {
    apply (formula) {
      const assumptions = this.stepIndexes.map(i => this.deduction.getStep(i).formula)

      if (!isLogicalConsequence(assumptions, formula)) {
        throw createError(
          ErrorName.INVALID_TAUTOLOGICAL_IMPLICATION,
          undefined,
          { assumptions, formula }
        )
      }

      const ruleApplicationSpec = RegularRuleApplicationSpec({
        rule: Rule.TautologicalImplication,
        premises: [...this.stepIndexes].sort(),
        conclusion: formula
      })

      const newDeduction = this.deduction.applyRule(ruleApplicationSpec)

      return startDeduction(newDeduction)
    }
  }
}).compose(Base)
