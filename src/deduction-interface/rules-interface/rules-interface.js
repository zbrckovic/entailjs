import _ from 'lodash'
import { Sym } from '../../abstract-structures'
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

      if (step1IsPremise && step1IsAssumptionForStep2) {
        return ConditionalIntroductionRuleInterface(deduction, step1Index, step2Index)
      }

      const step2IsPremise = step2.ruleApplicationSummary.rule === Rule.Premise
      const step2IsAssumptionForStep1 = step1.assumptions.has(step2Index)

      if (step2IsPremise && step2IsAssumptionForStep1) {
        return ConditionalIntroductionRuleInterface(deduction, step2Index, step1Index)
      }

      return undefined
    },
    [Rule.TautologicalImplication]: () => TautologicalImplicationRuleInterface(deduction, steps),
    [Rule.UniversalInstantiation]: () => {
      if (steps.length !== 1) return undefined

      const [step] = steps
      const universallyQuantifiedFormula = Deduction.getStep(deduction, step).formula
      if (!Sym.equals(universallyQuantifiedFormula.sym, universalQuantifier)) return undefined

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
      if (!Sym.equals(existentiallyQuantifiedFormula.sym, existentialQuantifier)) return undefined

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

      if (premiseIndex === undefined || conclusionStepIndexes.length !== 2) return undefined

      const [conclusion1StepIndex, conclusion2StepIndex] = conclusionStepIndexes

      const conclusion1Step = Deduction.getStep(deduction, conclusion1StepIndex)
      const conclusion2Step = Deduction.getStep(deduction, conclusion2StepIndex)

      // noinspection JSUnusedAssignment
      const step1IsAssumptionForStep2 = conclusion1Step.assumptions.has(premiseIndex)
      if (!step1IsAssumptionForStep2) return undefined

      // noinspection JSUnusedAssignment
      const step1IsAssumptionForStep3 = conclusion2Step.assumptions.has(premiseIndex)
      if (!step1IsAssumptionForStep3) return undefined

      if (isNegationOf(conclusion1Step.formula, conclusion2Step.formula)) {
        // noinspection JSUnusedAssignment
        return NegationIntroductionRuleInterface(
          deduction,
          premiseIndex,
          conclusion2StepIndex,
          conclusion1StepIndex
        )
      }

      if (isNegationOf(conclusion2Step.formula, conclusion1Step.formula)) {
        // noinspection JSUnusedAssignment
        return NegationIntroductionRuleInterface(
          deduction,
          premiseIndex,
          conclusion1StepIndex,
          conclusion2StepIndex
        )
      }
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

      if (isNegationOf(step1.formula, step2.formula)) {
        return ExplosionRuleInterface(deduction, step2Index, step1Index)
      }

      if (isNegationOf(step2.formula, step1.formula)) {
        return ExplosionRuleInterface(deduction, step1Index, step2Index)
      }

      return undefined
    },
    [Rule.ConditionalElimination]: () => {
      if (steps.length !== 2) return undefined

      const [premise1Index, premise2Index] = steps
      const [premise1, premise2] = steps.map(i => Deduction.getStep(deduction, i).formula)

      if (isConditionalFrom(premise1, premise2)) {
        return ConditionalEliminationRuleInterface(deduction, premise1Index, premise2Index)
      }

      if (isConditionalFrom(premise2, premise1)) {
        return ConditionalEliminationRuleInterface(deduction, premise2Index, premise1Index)
      }

      return undefined
    },
    [Rule.ConjunctionIntroduction]: () => {
      if (steps.length !== 2) return undefined

      const [premise1Index, premise2Index] = steps

      return ConjunctionIntroductionRuleInterface(deduction, premise1Index, premise2Index)
    },
    [Rule.ConjunctionElimination]: () => {
      if (steps.length !== 1) return undefined

      const [premiseIndex] = steps
      const premise = Deduction.getStep(deduction, premiseIndex).formula

      if (!Sym.equals(premise.sym, conjunction)) return undefined

      return ConjunctionEliminationRuleInterface(deduction, premiseIndex)
    },
    [Rule.DisjunctionIntroduction]: () => {
      if (steps.length !== 1) return undefined

      const [premiseIndex] = steps

      return DisjunctionIntroductionRuleInterface(deduction, premiseIndex)
    },
    [Rule.DisjunctionElimination]: () => {
      if (steps.length !== 3) return undefined

      let disjunctionStepIndex
      const conditionalStepIndexes = []

      steps.forEach(stepIndex => {
        const formula = Deduction.getStep(deduction, stepIndex).formula

        if (Sym.equals(formula.sym, disjunction)) {
          disjunctionStepIndex = stepIndex
        } else if (Sym.equals(formula.sym, conditional)) {
          conditionalStepIndexes.push(stepIndex)
        }
      })

      if (disjunctionStepIndex === undefined || conditionalStepIndexes.length !== 2) {
        return undefined
      }

      const [conditional1StepIndex, conditional2StepIndex] = conditionalStepIndexes
      const [
        conditional1,
        conditional2
      ] = conditionalStepIndexes.map(i => Deduction.getStep(deduction, i).formula)
      const consequent = conditional1.children[1]

      if (!isConditionalTo(conditional2, consequent)) return undefined

      // noinspection JSUnusedAssignment
      const [
        disjunct1,
        disjunct2
      ] = Deduction.getStep(deduction, disjunctionStepIndex).formula.children

      if (
        isConditionalFrom(conditional1, disjunct1) &&
        isConditionalFrom(conditional2, disjunct2)
      ) {
        // noinspection JSUnusedAssignment
        return DisjunctionEliminationRuleInterface(
          deduction,
          disjunctionStepIndex,
          conditional1StepIndex,
          conditional2StepIndex,
          consequent
        )
      }

      if (
        isConditionalFrom(conditional2, disjunct1) &&
        isConditionalFrom(conditional1, disjunct2)
      ) {
        // noinspection JSUnusedAssignment
        return DisjunctionEliminationRuleInterface(
          deduction,
          disjunctionStepIndex,
          conditional2StepIndex,
          conditional1StepIndex,
          consequent
        )
      }
    },
    [Rule.BiconditionalIntroduction]: () => {
      if (steps.length !== 2) return undefined

      const [premise1, premise2] = steps.map(i => Deduction.getStep(deduction, i).formula)

      if (!Sym.equals(premise1.sym, conditional)) return undefined
      if (!Sym.equals(premise2.sym, conditional)) return undefined

      const [antecedent1, consequent1] = premise1.children
      const [antecedent2, consequent2] = premise2.children

      if (!_.isEqual(antecedent1, consequent2)) return undefined
      if (!_.isEqual(antecedent2, consequent1)) return undefined

      return BiconditionalIntroductionRuleInterface(deduction, ...steps)
    },
    [Rule.BiconditionalElimination]: () => {
      if (steps.length !== 1) return undefined

      const [premiseIndex] = steps

      const premise = Deduction.getStep(deduction, premiseIndex).formula

      if (!Sym.equals(premise.sym, biconditional)) return undefined

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
