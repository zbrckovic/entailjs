import { Sym } from '../../abstract-structures'
import { Deduction, Rule } from '../../deduction-structure'
import { createError, ErrorName } from '../../error'
import { existentialQuantifier, universalQuantifier } from '../../primitive-syms'
import {
  isConditionalFrom,
  isDoubleNegation,
  isNegationOf
} from '../../propositional-logic/propositional-logic-util'
import { ConditionalEliminationRuleInterface } from './conditional-elimination-rule-interface'
import { ConjunctionIntroductionRuleInterface } from './conjunction-introduction-rule-interface'
import { DeductionRuleInterface } from './deduction-rule-interface'
import { DoubleNegationEliminationRuleInterface } from './double-negation-elimination-rule-interface'
import { NegationIntroductionRuleInterface } from './negation-introduction-rule-interface'
import { PremiseRuleInterface } from './premise-rule-interface'
import {
  ExistentialGeneralizationRuleInterface,
  ExistentialInstantiationRuleInterface,
  UniversalGeneralizationRuleInterface,
  UniversalInstantiationRuleInterface
} from './quantification'
import { TautologicalImplicationRuleInterface } from './tautological-implication-rule-interface'
import { TheoremRuleInterface } from './theorem-rule-interface'
import { WeakNegationEliminationRuleInterface } from './weak-negation-elimination-rule-interface'

// Accepts deduction and selected steps (step indexes), returns interface for choosing rule.
export const RulesInterface = (deduction, ...steps) => ({
  chooseRule(rule) {
    switch (rule) {
      case Rule.Premise: {
        if (steps.length === 0) return PremiseRuleInterface(deduction)
        break
      }
      case Rule.Deduction: {
        if (steps.length === 2) {
          const [step1Index, step2Index] = steps
          const [step1, step2] = steps.map(i => Deduction.getStep(deduction, i))

          const step1IsPremise = step1.ruleApplicationSummary.rule === Rule.Premise
          const step1IsAssumptionForStep2 = step2.assumptions.has(step1Index)

          if (step1IsPremise && step1IsAssumptionForStep2) {
            return DeductionRuleInterface(deduction, step1Index, step2Index)
          }

          const step2IsPremise = step2.ruleApplicationSummary.rule === Rule.Premise
          const step2IsAssumptionForStep1 = step1.assumptions.has(step2Index)

          if (step2IsPremise && step2IsAssumptionForStep1) {
            return DeductionRuleInterface(deduction, step2Index, step1Index)
          }
        }
        break
      }
      case Rule.TautologicalImplication: {
        return TautologicalImplicationRuleInterface(deduction, steps)
      }
      case Rule.UniversalInstantiation: {
        if (steps.length === 1) {
          const [step] = steps
          const premise = Deduction.getStep(deduction, step).formula

          if (Sym.equals(premise.sym, universalQuantifier)) {
            return UniversalInstantiationRuleInterface(deduction, step)
          }
        }
        break
      }
      case Rule.UniversalGeneralization: {
        if (steps.length === 1) {
          const [step] = steps
          return UniversalGeneralizationRuleInterface(deduction, step)
        }
        break
      }
      case Rule.ExistentialInstantiation: {
        if (steps.length === 1) {
          const [step] = steps
          const premise = Deduction.getStep(deduction, step).formula

          if (Sym.equals(premise.sym, existentialQuantifier)) {
            return ExistentialInstantiationRuleInterface(deduction, step)
          }
        }
        break
      }
      case Rule.ExistentialGeneralization: {
        if (steps.length === 1) {
          const [step] = steps
          return ExistentialGeneralizationRuleInterface(deduction, step)
        }
        break
      }
      case Rule.Theorem: {
        if (steps.length === 0) return TheoremRuleInterface(deduction)
        break
      }
      case Rule.NegationIntroduction: {
        if (steps.length === 3) {
          let premiseIndex
          const conclusionStepIndexes = []

          steps.forEach(stepIndex => {
            const formula = Deduction.getStep(deduction, stepIndex)
            const isPremise = formula.ruleApplicationSummary.rule === Rule.Premise

            if (isPremise) {
              premiseIndex = stepIndex
            } else {
              conclusionStepIndexes.push(stepIndex)
            }
          })

          if (premiseIndex === undefined || conclusionStepIndexes.length !== 2) break

          const [conclusion1StepIndex, conclusion2StepIndex] = conclusionStepIndexes

          const conclusion1Step = Deduction.getStep(deduction, conclusion1StepIndex)
          const conclusion2Step = Deduction.getStep(deduction, conclusion2StepIndex)

          const step1IsAssumptionForStep2 = conclusion1Step.assumptions.has(premiseIndex)
          if (!step1IsAssumptionForStep2) break

          const step1IsAssumptionForStep3 = conclusion2Step.assumptions.has(premiseIndex)
          if (!step1IsAssumptionForStep3) break

          if (isNegationOf(conclusion1Step.formula, conclusion2Step.formula)) {
            return NegationIntroductionRuleInterface(
              deduction,
              premiseIndex,
              conclusion2StepIndex,
              conclusion1StepIndex
            )
          }

          if (isNegationOf(conclusion2Step.formula, conclusion1Step.formula)) {
            return NegationIntroductionRuleInterface(
              deduction,
              premiseIndex,
              conclusion1StepIndex,
              conclusion2StepIndex
            )
          }
        }
        break
      }
      case Rule.DoubleNegationElimination: {
        if (steps.length === 1) {
          const [stepIndex] = steps
          const { formula } = Deduction.getStep(deduction, stepIndex)

          if (isDoubleNegation(formula)) {
            return DoubleNegationEliminationRuleInterface(deduction, stepIndex)
          }
        }
        break
      }
      case Rule.WeakNegationElimination:
        if (steps.length === 2) {
          const [step1Index, step2Index] = steps
          const [step1, step2] = steps.map(i => Deduction.getStep(deduction, i))

          if (isNegationOf(step1.formula, step2.formula)) {
            return WeakNegationEliminationRuleInterface(deduction, step2Index, step1Index)
          }

          if (isNegationOf(step2.formula, step1.formula)) {
            return WeakNegationEliminationRuleInterface(deduction, step1Index, step2Index)
          }
        }
        break
      case Rule.ConditionalElimination:
        if (steps.length === 2) {
          const [premise1Index, premise2Index] = steps
          const [premise1, premise2] = steps.map(i => Deduction.getStep(deduction, i).formula)

          if (isConditionalFrom(premise1, premise2)) {
            return ConditionalEliminationRuleInterface(deduction, premise1Index, premise2Index)
          }

          if (isConditionalFrom(premise2, premise1)) {
            return ConditionalEliminationRuleInterface(deduction, premise2Index, premise1Index)
          }
        }
        break
      case Rule.ConjunctionIntroduction:
        if (steps.length === 2) {
          const [premise1Index, premise2Index] = steps
          return ConjunctionIntroductionRuleInterface(deduction, premise1Index, premise2Index)
        }
        break
      case Rule.ConjunctionElimination:
        break
      case Rule.DisjunctionIntroduction:
        break
      case Rule.DisjunctionElimination:
        break
      case Rule.BiconditionalIntroduction:
        break
      case Rule.BiconditionalElimination:
        break
    }

    throw createError(ErrorName.RULE_NOT_ALLOWED, `Rule ${rule} is not allowed.`, rule)
  }
})
