import { Rule } from '../../deduction-structure'
import { existentialQuantifier, universalQuantifier } from '../../primitive-syms'
import { DeductionRuleInterface } from './deduction-rule-interface'
import { PremiseRuleInterface } from './premise-rule-interface'
import {
  ExistentialGeneralizationRuleInterface,
  ExistentialInstantiationRuleInterface,
  UniversalGeneralizationRuleInterface,
  UniversalInstantiationRuleInterface
} from './quantification'
import { TautologicalImplicationRuleInterface } from './tautological-implication-rule-interface'
import { TheoremRuleInterface } from './theorem-rule-interface'

// Accept deduction and selected steps (step indexes), determine possible rules which could be
// applied and return interfaces for their application.
export const RulesInterface = (deduction, ...steps) => {
  const result = {}

  result[Rule.TautologicalImplication] = TautologicalImplicationRuleInterface(deduction, steps)

  if (steps.length === 0) {
    result[Rule.Premise] = PremiseRuleInterface(deduction)
    result[Rule.Theorem] = TheoremRuleInterface(deduction)
  } else if (steps.length === 1) {
    const [step] = steps

    const premise = deduction.getStep(step).formula

    if (premise.sym.equals(universalQuantifier)) {
      result[Rule.UniversalInstantiation] = UniversalInstantiationRuleInterface(deduction, step)
    } else if (premise.sym.equals(existentialQuantifier)) {
      result[Rule.ExistentialInstantiation] = ExistentialInstantiationRuleInterface(deduction, step)
    }

    result[Rule.UniversalGeneralization] = UniversalGeneralizationRuleInterface(deduction, step)
    result[Rule.ExistentialGeneralization] = ExistentialGeneralizationRuleInterface(deduction, step)
  } else if (steps.length === 2) {
    const [firstStepIndex, secondStepIndex] = steps
    const [firstStep, secondStep] = steps.map(i => deduction.getStep(i))

    const firstStepIsPremise = firstStep.ruleApplicationSummary.rule === Rule.Premise
    const firstIsAssumptionForSecond = secondStep.assumptions.has(firstStepIndex)

    if (firstStepIsPremise && firstIsAssumptionForSecond) {
      result[Rule.Deduction] = DeductionRuleInterface(deduction, firstStepIndex, secondStepIndex)
    }
  }

  return result
}
