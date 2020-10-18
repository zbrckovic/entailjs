// Minimal information necessary to reconstruct this deduction using deduction interface.
import { Rule } from './deduction-structure'
import { determineNewTermInInstantiationResult } from './deduction-structure/deduction'
import { startDeduction } from './deduction-interface'

export const compress = deduction =>
  deduction.steps.map(step => {
    const { formula, ruleApplicationSummary: { rule, premises } } = step

    const result = { steps: premises, rule }

    switch (rule) {
      case Rule.Premise:
        result.formula = formula
        break
      case Rule.Theorem:
        result.formula = formula
        break
      case Rule.TautologicalImplication:
        result.formula = formula
        break
      case Rule.Deduction:
        break
      case Rule.UniversalGeneralization:
        result.newTerm = formula.boundSym
        break
      case Rule.ExistentialGeneralization:
        result.newTerm = formula.boundSym
        break
      case Rule.UniversalInstantiation:
        result.newTerm = determineNewTermInInstantiationResult(
          formula,
          deduction.steps[premises[0]].formula
        )
        break
      case Rule.ExistentialInstantiation:
        result.newTerm = determineNewTermInInstantiationResult(
          formula,
          deduction.steps[premises[0]].formula
        )
        break
    }

    return result
  })

export const decompress = steps => {
  let deductionInterface = startDeduction()

  steps.forEach(step => {
    const ruleInterface = deductionInterface.selectSteps(...steps).chooseRule(step.rule)
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
