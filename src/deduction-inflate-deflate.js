import { Rule } from './deduction-structure'
import {
  determineNewTermInInstantiationResult,
  determineSubstitutionInGeneralizationResult,
  startDeduction
} from './deduction-interface'

// Produce minimal information necessary to reconstruct this deduction using deduction interface.
export const deflate = deduction =>
  deduction.steps.map(step => {
    const { formula, ruleApplicationSummary: { rule, premises } } = step

    const result = { steps: premises.map(premise => premise + 1), rule }

    switch (rule) {
      case Rule.Premise: {
        result.formula = formula
        break
      }
      case Rule.Theorem: {
        result.formula = formula
        break
      }
      case Rule.TautologicalImplication: {
        result.formula = formula
        break
      }
      case Rule.Deduction: {
        break
      }
      case Rule.UniversalGeneralization: {
        const { oldTerm, newTerm } = determineSubstitutionInGeneralizationResult(
          formula,
          deduction.steps[premises[0]].formula
        )

        result.newTerm = formula.boundSym
        result.oldTerm = oldTerm
        result.newTerm = newTerm
        break
      }
      case Rule.ExistentialGeneralization: {
        const { oldTerm, newTerm } = determineSubstitutionInGeneralizationResult(
          formula,
          deduction.steps[premises[0]].formula
        )

        result.oldTerm = oldTerm
        result.newTerm = newTerm

        break
      }
      case Rule.UniversalInstantiation: {
        result.newTerm = determineNewTermInInstantiationResult(
          formula,
          deduction.steps[premises[0]].formula
        )
        break
      }
      case Rule.ExistentialInstantiation: {
        result.newTerm = determineNewTermInInstantiationResult(
          formula,
          deduction.steps[premises[0]].formula
        )
        break
      }
    }

    return result
  })

export const inflate = steps => {
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
      case Rule.Deduction:
        deductionInterface = ruleInterface.apply()
        break
      case Rule.UniversalGeneralization:
        deductionInterface = ruleInterface.apply(step.newTerm)
        break
      case Rule.ExistentialGeneralization:
        deductionInterface = ruleInterface.apply(step.newTerm)
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
