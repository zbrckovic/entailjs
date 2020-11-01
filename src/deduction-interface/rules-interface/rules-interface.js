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
import {
  areCanonicallyContradictory,
  isDoubleNegation
} from '../../propositional-logic/propositional-logic-util'
import { NegationIntroductionRuleInterface } from './negation-introduction-rule-interface'
import { DoubleNegationEliminationRuleInterface } from './double-negation-elimination-rule-interface'
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
          const [step1Index, step2Index, step3Index] = steps
          const [step1, step2, step3] = steps.map(i => Deduction.getStep(deduction, i))

          const step1IsPremise = step1.ruleApplicationSummary.rule === Rule.Premise
          if (!step1IsPremise) break

          const step1IsAssumptionForStep2 = step2.assumptions.has(step1Index)
          if (!step1IsAssumptionForStep2) break

          const step1IsAssumptionForStep3 = step3.assumptions.has(step1Index)
          if (!step1IsAssumptionForStep3) break

          if (!areCanonicallyContradictory(step2.formula, step3.formula)) break

          return NegationIntroductionRuleInterface(deduction, step1Index, step2Index, step3Index)
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

          if (areCanonicallyContradictory(step1.formula, step2.formula)) {
            return WeakNegationEliminationRuleInterface(deduction, step1Index, step2Index)
          }
        }
        break
      case Rule.ConditionalElimination:
        break
      case Rule.ConjunctionIntroduction:
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
