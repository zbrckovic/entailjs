import { Rule } from '../deduction-structure'
import {
  determineNewTermInInstantiationResult,
  determineSubstitutionInGeneralizationResult,
  startDeduction
} from '../deduction-interface'
import { DeductionDeflated, StepDeflated } from './deduction-deflated'

// Produce minimal information necessary to reconstruct this deduction using deduction interface.
export const deflateDeduction = deduction => {
  const deflatedSteps = deduction.steps.map(step => {
    const { formula, ruleApplicationSummary: { rule, premises } } = step

    const stepDeflated = StepDeflated({ steps: premises.map(premise => premise + 1), rule })

    switch (rule) {
      case Rule.Premise: {
        stepDeflated.formula = formula
        break
      }
      case Rule.Theorem: {
        stepDeflated.formula = formula
        break
      }
      case Rule.TautologicalImplication: {
        stepDeflated.formula = formula
        break
      }
      case Rule.ConditionalIntroduction: {
        break
      }
      case Rule.UniversalGeneralization: {
        const { oldTerm, newTerm } = determineSubstitutionInGeneralizationResult(
          formula,
          deduction.steps[premises[0]].formula
        )

        stepDeflated.newTerm = formula.boundSym
        stepDeflated.oldTerm = oldTerm
        stepDeflated.newTerm = newTerm
        break
      }
      case Rule.ExistentialGeneralization: {
        const { oldTerm, newTerm } = determineSubstitutionInGeneralizationResult(
          formula,
          deduction.steps[premises[0]].formula
        )

        stepDeflated.oldTerm = oldTerm
        stepDeflated.newTerm = newTerm

        break
      }
      case Rule.UniversalInstantiation: {
        stepDeflated.newTerm = determineNewTermInInstantiationResult(
          formula,
          deduction.steps[premises[0]].formula
        )
        break
      }
      case Rule.ExistentialInstantiation: {
        stepDeflated.newTerm = determineNewTermInInstantiationResult(
          formula,
          deduction.steps[premises[0]].formula
        )
        break
      }
    }

    return stepDeflated
  })

  return DeductionDeflated({ steps: deflatedSteps })
}

export const inflateDeduction = ({ steps }) => {
  let deductionInterface = startDeduction()

  steps.forEach(step => {
    const ruleInterface = deductionInterface.selectSteps(...step.steps).chooseRule(step.rule)
    switch (step.rule) {
      case Rule.Premise:
        deductionInterface = ruleInterface.apply(step.formula)
        break
      case Rule.Theorem:
        deductionInterface = ruleInterface.apply(step.formula)
        break
      case Rule.TautologicalImplication:
        deductionInterface = ruleInterface.apply(step.formula)
        break
      case Rule.ConditionalIntroduction:
        deductionInterface = ruleInterface.apply()
        break
      case Rule.UniversalGeneralization:
        deductionInterface = ruleInterface.apply(step.newTerm, step.oldTerm)
        break
      case Rule.ExistentialGeneralization:
        deductionInterface = ruleInterface.apply(step.newTerm, step.oldTerm)
        break
      case Rule.UniversalInstantiation:
        deductionInterface = ruleInterface.apply(step.newTerm)
        break
      case Rule.ExistentialInstantiation:
        deductionInterface = ruleInterface.apply(step.newTerm)
        break
    }
  })

  return deductionInterface.deduction
}
