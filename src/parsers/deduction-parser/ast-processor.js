import { startDeduction } from '../../deduction-interface'
import { getRule, Rule } from '../../deduction-structure/rule'
import { createError, ErrorName } from '../../error'
import { findDuplicates } from '../../utils'
import { AstProcessor as FormulaAstProcessor } from '../formula-parser/ast-processor'
import _ from 'lodash'
import { Deduction } from '../../deduction-structure'

// `AstProcessor` can process deduction AST (the result of parsing formula) and creates a
// `Deduction`. Internally it uses formula [`AstProcessor`](../formula-parser/ast-processor) for
// parsing formula on each step.
export const AstProcessor = ({ syms, presentationCtx }) => {
  const formulaAstProcessor = FormulaAstProcessor({ syms, presentationCtx })

  const { getSym, getSyms, getPresentationCtx, getTextToSymMap, getMaxSymId } = formulaAstProcessor

  const process = ast => {
    const { steps } = ast

    let deductionInterface = startDeduction()

    deductionInterface = steps.reduce(
      (deductionInterface, step, i) => processStep(deductionInterface, step, i + 1),
      deductionInterface
    )

    return deductionInterface.deduction
  }

  const processStep = (deductionInterface, astStep, stepOrdinal) => {
    validateStepOrdinal(stepOrdinal, astStep.ordinal)

    const assumptionsOrdinals = astStep.assumptions

    validateAssumptionsOrdinals(deductionInterface.deduction, assumptionsOrdinals)

    const rule = getRule(astStep.ruleApplicationSummary.rule)
    const premisesOrdinals = astStep.ruleApplicationSummary.premises
    const formula = formulaAstProcessor.process(astStep.formula)
    const availableRules = deductionInterface.selectSteps(...premisesOrdinals)

    const ruleInterface = availableRules[rule]

    let oldTerm
    let newTerm

    switch (rule) {
      case Rule.Premise: {
        if (ruleInterface === undefined) {
          throw createError(ErrorName.RULE_NOT_ALLOWED, undefined, { stepOrdinal, rule })
        }
        deductionInterface = ruleInterface.apply(formula)
        break
      }
      case Rule.Deduction: {
        if (ruleInterface === undefined) {
          throw createError(ErrorName.RULE_NOT_ALLOWED, undefined, rule)
        }
        deductionInterface = ruleInterface.apply()
        break
      }
      case Rule.TautologicalImplication: {
        if (ruleInterface === undefined) {
          throw createError(ErrorName.RULE_NOT_ALLOWED, undefined, { stepOrdinal, rule })
        }
        deductionInterface = ruleInterface.apply(formula)
        break
      }
      case Rule.UniversalInstantiation: {
        if (ruleInterface === undefined) {
          throw createError(ErrorName.RULE_NOT_ALLOWED, undefined, { stepOrdinal, rule })
        }
        const newSym = ruleInterface.determineNewTermInPotentialResult(formula)
        deductionInterface = ruleInterface.apply(newSym)
        break
      }
      case Rule.UniversalGeneralization: {
        if (ruleInterface === undefined) {
          throw createError(ErrorName.RULE_NOT_ALLOWED, undefined, { stepOrdinal, rule })
        }
        ({ oldTerm, newTerm } = ruleInterface.determineSubstitutionInPotentialResult(formula))
        deductionInterface = ruleInterface.apply(newTerm, oldTerm)
        break
      }
      case Rule.ExistentialInstantiation: {
        if (ruleInterface === undefined) {
          throw createError(ErrorName.RULE_NOT_ALLOWED, undefined, { stepOrdinal, rule })
        }
        const newSym = ruleInterface.determineNewTermInPotentialResult(formula)
        deductionInterface = ruleInterface.apply(newSym)
        break
      }
      case Rule.ExistentialGeneralization:
        if (ruleInterface === undefined) {
          throw createError(ErrorName.RULE_NOT_ALLOWED, undefined, { stepOrdinal, rule })
        }
        ({ oldTerm, newTerm } = ruleInterface.determineSubstitutionInPotentialResult(formula))
        deductionInterface = ruleInterface.apply(newTerm, oldTerm)
        break
      case Rule.Theorem: {
        if (ruleInterface === undefined) {
          throw createError(ErrorName.RULE_NOT_ALLOWED, undefined, { stepOrdinal, rule })
        }
        deductionInterface = ruleInterface.apply()
        break
      }
    }

    const newStep = Deduction.getLastStep(deductionInterface.deduction)

    const assumptionIndexes = new Set(assumptionsOrdinals.map(ordinal => ordinal - 1))
    if (!_.isEqual(newStep.assumptions, assumptionIndexes)) {
      throw createError(
        ErrorName.INVALID_ASSUMPTION_ORDINALS, undefined, { stepOrdinal, assumptionsOrdinals }
      )
    }

    if (!_.isEqual(newStep.formula, formula)) {
      throw createError(ErrorName.INVALID_FORMULA, undefined, formula)
    }

    return deductionInterface
  }

  return {
    process,
    getSym,
    getSyms,
    getPresentationCtx,
    getTextToSymMap,
    getMaxSymId
  }
}

const validateStepOrdinal = (actualStepOrdinal, encounteredStepOrdinal) => {
  if (encounteredStepOrdinal !== undefined && encounteredStepOrdinal !== actualStepOrdinal) {
    throw createError(
      ErrorName.INVALID_STEP_ORDINAL,
      undefined,
      {
        encounteredStepOrdinal,
        actualStepOrdinal
      }
    )
  }
}

const validateAssumptionsOrdinals = (deduction, assumptionsOrdinalsArray) => {
  const assumptionsOrdinals = new Set(assumptionsOrdinalsArray)

  if (assumptionsOrdinalsArray.length > assumptionsOrdinals.size) {
    throw createError(
      ErrorName.DUPLICATE_ASSUMPTIONS_ORDINALS,
      undefined,
      findDuplicates(assumptionsOrdinalsArray)
    )
  }

  const maxStepOrdinal = Deduction.getSize(deduction)

  for (const assumptionOrdinal of assumptionsOrdinals) {
    if (assumptionOrdinal > maxStepOrdinal) {
      throw createError(
        ErrorName.ASSUMPTION_ORDINAL_OUT_OF_RANGE,
        undefined,
        assumptionOrdinal
      )
    }

    const assumptionRule = Deduction
      .getStepByOrdinal(deduction, assumptionOrdinal)
      .ruleApplicationSummary
      .rule

    if (assumptionRule !== Rule.Premise && assumptionRule !== Rule.Theorem) {
      throw createError(
        ErrorName.ASSUMPTION_INVALID_RULE,
        undefined,
        { assumptionOrdinal, assumptionRule }
      )
    }
  }
}
