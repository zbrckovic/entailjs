import { RegularRuleApplicationSpec } from '../../deduction-structure/rule-application-spec'
import { Deduction } from '../../deduction-structure'
import { startDeduction } from '../deduction-interface'
import { createError, ErrorName } from '../../error'
import { Expression } from '../../abstract-structures/expression'
import { Sym } from '../../abstract-structures/sym'

export const ExistentialGeneralizationRuleInterface = (deduction, stepIndex) => {
  const { getPremise } = QuantificationRuleInterface(deduction, stepIndex)

  return GeneralizationRuleInterface(deduction, stepIndex, (newTerm, oldTerm) => {
    const ruleApplicationSpec = RegularRuleApplicationSpec.existentialGeneralization(
      getPremise(), stepIndex, newTerm, oldTerm
    )
    const newDeduction = Deduction.apply(deduction, ruleApplicationSpec)

    return startDeduction(newDeduction)
  })
}

export const ExistentialInstantiationRuleInterface = (deduction, stepIndex) => {
  const { getPremise } = QuantificationRuleInterface(deduction, stepIndex)

  return InstantiationRuleInterface(
    deduction,
    stepIndex,
    newTerm => {
      const ruleApplicationSpec = RegularRuleApplicationSpec.existentialInstantiation(
        getPremise(), stepIndex, newTerm
      )
      const newDeduction = Deduction.applyRule(deduction, ruleApplicationSpec)

      return startDeduction(newDeduction)
    }
  )
}

export const InstantiationRuleInterface = (deduction, stepIndex, concreteApply) => {
  const { getPremise } = QuantificationRuleInterface(deduction, stepIndex)
  const premise = getPremise()

  // @param newTerm - Instance term which if provided will be the substituendum of the
  // substitution. If instantiation is vacuous newTerm doesn't need to be provided.
  const apply = newTerm => {
    if (newTerm === undefined) {
      if (Expression.findBoundOccurrences(premise).length > 0) {
        throw createError(ErrorName.TERM_NOT_PROVIDED_FOR_NON_VACUOUS_QUANTIFICATION)
      }
    } else {
      const oldTerm = premise.boundSym
      const [child] = premise.children
      if (
        Expression.findBoundSymsAtFreeOccurrencesOfSym(child, oldTerm)[newTerm.id] !== undefined
      ) {
        throw createError(ErrorName.INSTANCE_TERM_BECOMES_ILLEGALLY_BOUND)
      }
    }

    return concreteApply(newTerm)
  }

  // Under assumption that `formula` is a result of an application of this rule determine which
  // term was introduced in substitution. If instantiation was vacuous return `undefined`.
  const determineNewTermInPotentialResult = formula => {
    const [firstOccurrence] = Expression.findBoundOccurrences(premise)
    if (firstOccurrence === undefined) return undefined

    const [firstIndex] = firstOccurrence

    try {
      return formula.getSubexpression(firstIndex).sym
    } catch (e) {
      if (e.name === ErrorName.NO_CHILD_AT_INDEX) {
        throw createError(ErrorName.INVALID_SUBSTITUTION_RESULT)
      }
      throw e
    }
  }

  return ({ apply, determineNewTermInPotentialResult })
}

export const UniversalGeneralizationRuleInterface = (deduction, stepIndex) => {
  const { getPremise } = QuantificationRuleInterface(deduction, stepIndex)

  return GeneralizationRuleInterface(deduction, stepIndex, (newTerm, oldTerm) => {
    const ruleApplicationSpec = RegularRuleApplicationSpec.universalGeneralization(
      getPremise(),
      stepIndex,
      newTerm,
      oldTerm
    )

    const newDeduction = Deduction.applyRule(deduction, ruleApplicationSpec)
    return startDeduction(newDeduction)
  })
}

export const UniversalInstantiationRuleInterface = (deduction, stepIndex) => {
  const { getPremise } = QuantificationRuleInterface(deduction, stepIndex)

  return InstantiationRuleInterface(deduction, stepIndex, newTerm => {
    const ruleApplicationSpec = RegularRuleApplicationSpec.universalInstantiation(
      getPremise(),
      stepIndex,
      newTerm
    )
    const newDeduction = Deduction.applyRule(deduction, ruleApplicationSpec)
    return startDeduction(newDeduction)
  })
}

export const GeneralizationRuleInterface = (deduction, stepIndex, concreteApply) => {
  const { getPremise } = QuantificationRuleInterface(deduction, stepIndex)

  const premise = getPremise()

  // @param newTerm - Generalized term which will be the substituent of the substitution.
  // @param oldTerm - Instance term which if provided will be the substituendum of the
  // substitution. If it's not provided generalization will be is vacuous.
  const apply = (newTerm, oldTerm) => {
    const substitutionRequired = !Sym.equals(newTerm, oldTerm)
    if (substitutionRequired) {
      if (premise.getFreeSyms().contains(newTerm)) {
        throw createError(ErrorName.GENERALIZED_TERM_ILLEGALLY_BINDS)
      }

      if (
        oldTerm !== undefined &&
        Expression.findBoundSymsAtFreeOccurrencesOfSym(premise, oldTerm)[newTerm.id] !== undefined
      ) {
        throw createError(ErrorName.GENERALIZED_TERM_BECOMES_ILLEGALLY_BOUND)
      }
    }

    return concreteApply(newTerm, oldTerm)
  }

  // Under assumption that `formula` is a result of an application of this rule determine which
  // term was introduced in substitution.
  const determineSubstitutionInPotentialResult = formula => {
    const newTerm = formula.boundSym
    if (newTerm === undefined) throw createError(ErrorName.INVALID_SUBSTITUTION_RESULT)

    try {
      const [firstBoundOccurrencePosition] = Expression.findBoundOccurrences(formula)
      if (firstBoundOccurrencePosition === undefined) return { newTerm }
      const [firstIndex] = firstBoundOccurrencePosition
      const oldTerm = Expression.getSubexpression(premise, firstIndex).sym
      return { oldTerm, newTerm }
    } catch (e) {
      if (e.name === ErrorName.NO_CHILD_AT_INDEX) {
        throw createError(ErrorName.INVALID_SUBSTITUTION_RESULT)
      }
      throw e
    }
  }

  return { apply, determineSubstitutionInPotentialResult }
}

export const QuantificationRuleInterface = (deduction, stepIndex) => ({
  getPremise: () => Deduction.getStep(deduction, stepIndex).formula
})
