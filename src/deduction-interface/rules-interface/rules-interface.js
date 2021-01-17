import _ from 'lodash'
import { Deduction, Rule } from '../../deduction-structure'
import { createError, ErrorName } from '../../error'
import {
  conditional,
  conjunction,
  disjunction,
  biconditional,
  existentialQuantifier,
  universalQuantifier
} from '../../primitive-syms'
import {
  isConditionalFrom,
  isConditionalTo,
  isDoubleNegation,
  isNegationOf
} from '../../propositional-logic/propositional-logic-util'
import { BiconditionalEliminationRuleInterface } from './biconditional-elimination-rule-interface'
import { BiconditionalIntroductionRuleInterface } from './biconditional-introduction-rule-interface'
import { ConditionalEliminationRuleInterface } from './conditional-elimination-rule-interface'
import { ConjunctionEliminationRuleInterface } from './conjunction-elimination-rule-interface'
import { ConjunctionIntroductionRuleInterface } from './conjunction-introduction-rule-interface'
import { ConditionalIntroductionRuleInterface } from './conditional-introduction-rule-interface'
import { DisjunctionEliminationRuleInterface } from './disjunction-elimination-rule-interface'
import { DisjunctionIntroductionRuleInterface } from './disjunction-introduction-rule-interface'
import { NegationEliminationRuleInterface } from './negation-elimination-rule-interface'
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
import { ExplosionRuleInterface } from './explosion-rule-interface'

// Accepts deduction and selected steps (step indexes), returns interface for choosing rule.
export const RulesInterface = (deduction, ...steps) => {
  const handlers = {
    [Rule.Premise]: () => {
      if (steps.length !== 0) return undefined

      return PremiseRuleInterface(deduction)
    },
    [Rule.ConditionalIntroduction]: () => {
      if (steps.length !== 2) return undefined

      const [step1Index, step2Index] = steps
      const [step1, step2] = steps.map(i => Deduction.getStep(deduction, i))

      const step1IsPremise = step1.ruleApplicationSummary.rule === Rule.Premise
      const step1IsAssumptionForStep2 = step2.assumptions.has(step1Index)

      if (!(step1IsPremise && step1IsAssumptionForStep2)) return undefined

      return ConditionalIntroductionRuleInterface(deduction, step1Index, step2Index)
    },
    [Rule.TautologicalImplication]: () => TautologicalImplicationRuleInterface(deduction, steps),
    [Rule.UniversalInstantiation]: () => {
      if (steps.length !== 1) return undefined

      const [step] = steps
      const universallyQuantifiedFormula = Deduction.getStep(deduction, step).formula
      if (!universallyQuantifiedFormula.sym.equals(universalQuantifier)) return undefined

      return UniversalInstantiationRuleInterface(deduction, step)
    },
    [Rule.UniversalGeneralization]: () => {
      if (steps.length !== 1) return undefined

      const [step] = steps

      return UniversalGeneralizationRuleInterface(deduction, step)
    },
    [Rule.ExistentialInstantiation]: () => {
      if (steps.length !== 1) return undefined

      const [step] = steps
      const existentiallyQuantifiedFormula = Deduction.getStep(deduction, step).formula
      if (!existentiallyQuantifiedFormula.sym.equals(existentialQuantifier)) return undefined

      return ExistentialInstantiationRuleInterface(deduction, step)
    },
    [Rule.ExistentialGeneralization]: () => {
      if (steps.length !== 1) return undefined

      const [step] = steps

      return ExistentialGeneralizationRuleInterface(deduction, step)
    },
    [Rule.Theorem]: () => {
      if (steps.length !== 0) return undefined

      return TheoremRuleInterface(deduction)
    },
    [Rule.NegationIntroduction]: () => {
      if (steps.length !== 3) return undefined

      const [
        premiseStepIndex,
        conclusion1StepIndex,
        conclusion2StepIndex
      ] = steps

      const [
        premiseStep,
        conclusion1Step,
        conclusion2Step
      ] = steps.map(stepIndex => Deduction.getStep(deduction, stepIndex))

      if (premiseStep.ruleApplicationSummary.rule !== Rule.Premise) return undefined

      if (!conclusion1Step.assumptions.has(premiseStepIndex)) return undefined
      if (!conclusion2Step.assumptions.has(premiseStepIndex)) return undefined

      if (!isNegationOf(conclusion2Step.formula, conclusion1Step.formula)) return undefined

      return NegationIntroductionRuleInterface(
        deduction,
        premiseStepIndex,
        conclusion1StepIndex,
        conclusion2StepIndex
      )
    },
    [Rule.NegationElimination]: () => {
      if (steps.length !== 1) return undefined

      const [stepIndex] = steps
      const { formula } = Deduction.getStep(deduction, stepIndex)

      if (!isDoubleNegation(formula)) return undefined

      return NegationEliminationRuleInterface(deduction, stepIndex)
    },
    [Rule.Explosion]: () => {
      if (steps.length !== 2) return undefined

      const [step1Index, step2Index] = steps
      const [step1, step2] = steps.map(i => Deduction.getStep(deduction, i))

      if (!isNegationOf(step2.formula, step1.formula)) return undefined

      return ExplosionRuleInterface(deduction, step1Index, step2Index)
    },
    [Rule.ConditionalElimination]: () => {
      if (steps.length !== 2) return undefined

      const [conditionalStepIndex, antecedentStepIndex] = steps
      const [conditional, antecedent] = steps.map(i => Deduction.getStep(deduction, i).formula)

      if (!isConditionalFrom(conditional, antecedent)) return undefined

      return ConditionalEliminationRuleInterface(
        deduction,
        conditionalStepIndex,
        antecedentStepIndex
      )
    },
    [Rule.ConjunctionIntroduction]: () => {
      if (steps.length !== 2) return undefined

      const [conjunct1StepIndex, conjunct2StepIndex] = steps

      return ConjunctionIntroductionRuleInterface(deduction, conjunct1StepIndex, conjunct2StepIndex)
    },
    [Rule.ConjunctionElimination]: () => {
      if (steps.length !== 1) return undefined

      const [conjunctionStepIndex] = steps
      const conjunctionFormula = Deduction.getStep(deduction, conjunctionStepIndex).formula

      if (!conjunctionFormula.sym.equals(conjunction)) return undefined

      return ConjunctionEliminationRuleInterface(deduction, conjunctionStepIndex)
    },
    [Rule.DisjunctionIntroduction]: () => {
      if (steps.length !== 1) return undefined

      const [premiseIndex] = steps

      return DisjunctionIntroductionRuleInterface(deduction, premiseIndex)
    },
    [Rule.DisjunctionElimination]: () => {
      if (steps.length !== 3) return undefined

      const [
        disjunctionStepIndex,
        conditional1StepIndex,
        conditional2StepIndex
      ] = steps

      const [
        disjunctionStep,
        conditional1Step,
        conditional2Step
      ] = steps.map(stepIndex => Deduction.getStep(deduction, stepIndex))

      if (!disjunctionStep.formula.sym.equals(disjunction)) return undefined
      if (!conditional1Step.formula.sym.equals(conditional)) return undefined
      if (!conditional2Step.formula.sym.equals(conditional)) return undefined

      const consequent = conditional1Step.formula.children[1]
      if (!isConditionalTo(conditional2Step.formula, consequent)) return undefined

      const [disjunct1, disjunct2] = disjunctionStep.formula.children

      if (!(
        isConditionalFrom(conditional1Step.formula, disjunct1) &&
        isConditionalFrom(conditional2Step.formula, disjunct2)
      )) return undefined

      return DisjunctionEliminationRuleInterface(
        deduction,
        disjunctionStepIndex,
        conditional1StepIndex,
        conditional2StepIndex,
        consequent
      )
    },
    [Rule.BiconditionalIntroduction]: () => {
      if (steps.length !== 2) return undefined

      const [conditional1, conditional2] = steps.map(i => Deduction.getStep(deduction, i).formula)

      if (!conditional1.sym.equals(conditional)) return undefined
      if (!conditional2.sym.equals(conditional)) return undefined

      const [antecedent1, consequent1] = conditional1.children
      const [antecedent2, consequent2] = conditional2.children

      if (!_.isEqual(antecedent1, consequent2)) return undefined
      if (!_.isEqual(antecedent2, consequent1)) return undefined

      return BiconditionalIntroductionRuleInterface(deduction, ...steps)
    },
    [Rule.BiconditionalElimination]: () => {
      if (steps.length !== 1) return undefined

      const [premiseIndex] = steps

      const premise = Deduction.getStep(deduction, premiseIndex).formula

      if (!premise.sym.equals(biconditional)) return undefined

      return BiconditionalEliminationRuleInterface(deduction, premiseIndex)
    }
  }

  return ({
    chooseRule(rule) {
      const ruleInterface = handlers[rule]?.()

      if (ruleInterface === undefined) {
        throw createError(ErrorName.RULE_NOT_ALLOWED, `Rule ${rule} is not allowed.`, rule)
      }

      return ruleInterface
    }
  })
}
