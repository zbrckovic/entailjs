import { Set } from 'immutable'
import { DeductionInterface } from '../../deduction-interface'
import { getRule, Rule } from '../../deduction-structure/rule'
import { createError, ErrorName } from '../../error'
import { findDuplicates } from '../../utils'
import { AstProcessor as FormulaAstProcessor } from '../formula-parser/ast-processor'

export class AstProcessor {
  get syms() { return this.formulaAstProcessor.syms }

  get presentationCtx() { return this.formulaAstProcessor.presentationCtx }

  get textToSymMap() { return this.formulaAstProcessor.textToSymMap }

  get maxSymId() { return this.formulaAstProcessor.maxSymId }

  constructor(syms, presentationCtx) {
    this.formulaAstProcessor = new FormulaAstProcessor(syms, presentationCtx)
  }

  process({ steps }) {
    let deductionInterface = DeductionInterface.start()

    deductionInterface = steps.reduce(
      (deductionInterface, step, i) => this._processStep(deductionInterface, step, i + 1),
      deductionInterface
    )

    return deductionInterface.deduction
  }

  _processStep(deductionInterface, astStep, stepOrdinal) {
    AstProcessor._validateStepOrdinal(stepOrdinal, astStep.ordinal)

    const assumptionsOrdinals = astStep.assumptions

    AstProcessor._validateAssumptionsOrdinals(deductionInterface.deduction, assumptionsOrdinals)

    const rule = getRule(astStep.ruleApplicationSummary.rule)
    const premisesOrdinals = astStep.ruleApplicationSummary.premises
    const formula = this.formulaAstProcessor.process(astStep.formula)
    const availableRules = deductionInterface.selectSteps(...premisesOrdinals)

    const ruleInterface = availableRules[rule]

    let oldTerm
    let newTerm

    switch (rule) {
      case Rule.Premise: {
        if (ruleInterface === undefined) {
          throw createError(
            ErrorName.RULE_NOT_ALLOWED,
            undefined,
            {
              stepOrdinal,
              rule
            }
          )
        }
        deductionInterface = ruleInterface.apply(formula)
        break
      }
      case Rule.Deduction: {
        if (ruleInterface === undefined) {
          throw createError(
            ErrorName.RULE_NOT_ALLOWED,
            undefined,
            rule
          )
        }
        deductionInterface = ruleInterface.apply()
        break
      }
      case Rule.TautologicalImplication: {
        if (ruleInterface === undefined) {
          throw createError(
            ErrorName.RULE_NOT_ALLOWED,
            undefined,
            {
              stepOrdinal,
              rule
            }
          )
        }
        deductionInterface = ruleInterface.apply(formula)
        break
      }
      case Rule.UniversalInstantiation: {
        if (ruleInterface === undefined) {
          throw createError(
            ErrorName.RULE_NOT_ALLOWED,
            undefined,
            {
              stepOrdinal,
              rule
            }
          )
        }
        const newSym = ruleInterface.determineNewTermInPotentialResult(formula)
        deductionInterface = ruleInterface.apply(newSym)
        break
      }
      case Rule.UniversalGeneralization: {
        if (ruleInterface === undefined) {
          throw createError(
            ErrorName.RULE_NOT_ALLOWED,
            undefined,
            {
              stepOrdinal,
              rule
            }
          )
        }
        ({
          oldTerm,
          newTerm
        } = ruleInterface.determineSubstitutionInPotentialResult(formula))
        deductionInterface = ruleInterface.apply(newTerm, oldTerm)
        break
      }
      case Rule.ExistentialInstantiation: {
        if (ruleInterface === undefined) {
          throw createError(
            ErrorName.RULE_NOT_ALLOWED,
            undefined,
            {
              stepOrdinal,
              rule
            }
          )
        }
        const newSym = ruleInterface.determineNewTermInPotentialResult(formula)
        deductionInterface = ruleInterface.apply(newSym)
        break
      }
      case Rule.ExistentialGeneralization:
        if (ruleInterface === undefined) {
          throw createError(
            ErrorName.RULE_NOT_ALLOWED,
            undefined,
            {
              stepOrdinal,
              rule
            }
          )
        }
        ({
          oldTerm,
          newTerm
        } = ruleInterface.determineSubstitutionInPotentialResult(formula))
        deductionInterface = ruleInterface.apply(newTerm, oldTerm)
        break
      case Rule.Theorem: {
        if (ruleInterface === undefined) {
          throw createError(
            ErrorName.RULE_NOT_ALLOWED,
            undefined,
            {
              stepOrdinal,
              rule
            }
          )
        }
        deductionInterface = ruleInterface.apply()
        break
      }
    }

    const newStep = deductionInterface.deduction.getLastStep()

    const assumptionIndexes = Set(assumptionsOrdinals.map(ordinal => ordinal - 1))
    if (!newStep.assumptions.equals(assumptionIndexes)) {
      throw createError(
        ErrorName.INVALID_ASSUMPTION_ORDINALS,
        undefined,
        {
          stepOrdinal,
          assumptionsOrdinals
        }
      )
    }

    if (!newStep.formula.equals(formula)) {
      throw createError(
        ErrorName.INVALID_FORMULA,
        undefined,
        formula
      )
    }

    return deductionInterface
  }

  static _validateStepOrdinal(actualStepOrdinal, encounteredStepOrdinal) {
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

  static _validateAssumptionsOrdinals(deduction, assumptionsOrdinalsArray) {
    const assumptionsOrdinals = Set.of(...assumptionsOrdinalsArray)

    if (assumptionsOrdinalsArray.length > assumptionsOrdinals.size) {
      throw createError(
        ErrorName.DUPLICATE_ASSUMPTIONS_ORDINALS,
        undefined,
        findDuplicates(assumptionsOrdinalsArray)
      )
    }

    const maxStepOrdinal = deduction.size

    for (const assumptionOrdinal of assumptionsOrdinals.toArray()) {
      if (assumptionOrdinal > maxStepOrdinal) {
        throw createError(
          ErrorName.ASSUMPTION_ORDINAL_OUT_OF_RANGE,
          undefined,
          assumptionOrdinal
        )
      }

      const assumptionRule = deduction
        .getStepByOrdinal(assumptionOrdinal)
        .ruleApplicationSummary
        .rule

      if (assumptionRule !== Rule.Premise && assumptionRule !== Rule.Theorem) {
        throw createError(
          ErrorName.ASSUMPTION_INVALID_RULE,
          undefined,
          {
            assumptionOrdinal,
            assumptionRule
          }
        )
      }
    }
  }

  addPresentation(sym, presentation) {
    this.formulaAstProcessor.addPresentation(sym, presentation)
  }

  getSym(text) { return this.formulaAstProcessor.getSym(text) }
}
