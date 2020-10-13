import { Deduction, Rule } from '../../deduction-structure'
import { existentialQuantifier, universalQuantifier } from '../../primitive-syms'
import { DeductionRuleInterface } from './deduction-rule-interface'
import { PremiseRuleInterface } from './premise-rule-interface'
import {
  ExistentialGeneralizationRuleInterface,
  ExistentialInstantiationRuleInterface,
  UniversalGeneralizationRuleInterface,
  UniversalInstantiationRuleInterface
} from './quantification'
import { TheoremRuleInterface } from './theorem-rule-interface'
import { Sym } from '../../abstract-structures'
import { createError, ErrorName } from '../../error'
import { TautologicalImplicationRuleInterface } from './tautological-implication-rule-interface'

// Accepts deduction and selected steps (step indexes), returns interface for choosing rule.
export const RulesInterface = (deduction, ...steps) => ({
  chooseRule(rule) {
    switch (rule) {
      case Rule.Premise:
        if (steps.length === 0) return PremiseRuleInterface(deduction)
        break
      case Rule.Deduction:
        if (steps.length === 2) {
          const [firstStepIndex, secondStepIndex] = steps
          const [firstStep, secondStep] = steps.map(i => Deduction.getStep(deduction, i))

          const firstStepIsPremise = firstStep.ruleApplicationSummary.rule === Rule.Premise
          const firstIsAssumptionForSecond = secondStep.assumptions.has(firstStepIndex)

          if (firstStepIsPremise && firstIsAssumptionForSecond) {
            return DeductionRuleInterface(deduction, firstStepIndex, secondStepIndex)
          }
        }
        break
      case Rule.TautologicalImplication:
        return TautologicalImplicationRuleInterface(deduction, steps)
      case Rule.UniversalInstantiation:
        if (steps.length === 1) {
          const [step] = steps
          const premise = Deduction.getStep(deduction, step).formula

          if (Sym.equals(premise.sym, universalQuantifier)) {
            return UniversalInstantiationRuleInterface(deduction, step)
          }
        }
        break
      case Rule.UniversalGeneralization:
        if (steps.length === 1) {
          const [step] = steps
          return UniversalGeneralizationRuleInterface(deduction, step)
        }
        break
      case Rule.ExistentialInstantiation:
        if (steps.length === 1) {
          const [step] = steps
          const premise = Deduction.getStep(deduction, step).formula

          if (Sym.equals(premise.sym, existentialQuantifier)) {
            return ExistentialInstantiationRuleInterface(deduction, step)
          }
        }
        break
      case Rule.ExistentialGeneralization:
        if (steps.length === 1) {
          const [step] = steps
          return ExistentialGeneralizationRuleInterface(deduction, step)
        }
        break
      case Rule.Theorem:
        if (steps.length === 0) return TheoremRuleInterface(deduction)
        break
    }

    throw createError(ErrorName.RULE_NOT_ALLOWED, `Rule ${rule} is not allowed.`, rule)
  }
})
