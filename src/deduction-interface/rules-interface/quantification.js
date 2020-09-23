import { RegularRuleApplicationSpec } from '../../deduction-structure/rule-application-spec'
import { Deduction } from '../../deduction-structure'
import { startDeduction } from '../deduction-interface'
import { createError, ErrorName } from '../../error'
import { Expression } from '../../abstract-structures/expression'
import { Sym } from '../../abstract-structures/sym'

export const ExistentialGeneralizationRuleInterface = (deduction, stepIndex) => {
  const premise = QuantificationRuleInterface(deduction, stepIndex).getPremise()

  return GeneralizationRuleInterface(deduction, stepIndex, (newTerm, oldTerm) => {
    const ruleApplicationSpec = RegularRuleApplicationSpec.existentialGeneralization(
      premise, stepIndex, newTerm, oldTerm
    )
    const newDeduction = Deduction.apply(deduction, ruleApplicationSpec)

    return startDeduction(newDeduction)
  })
}

export const ExistentialInstantiationRuleInterface = (deduction, stepIndex) => {
  const premise = QuantificationRuleInterface(deduction, stepIndex).getPremise()

  return InstantiationRuleInterface(
    deduction,
    stepIndex,
    newTerm => {
      const ruleApplicationSpec = RegularRuleApplicationSpec.existentialInstantiation(
        premise, stepIndex, newTerm
      )
      const newDeduction = Deduction.applyRule(deduction, ruleApplicationSpec)

      return startDeduction(newDeduction)
    }
  )
}

export const InstantiationRuleInterface = (deduction, stepIndex, concreteApply) => {
  const premise = QuantificationRuleInterface(deduction, stepIndex).getPremise()

  // `newTerm` is an instance term which if provided will be the substituted. If instantiation is
  // vacuous `newTerm` doesn't need to be provided.
  const apply = newTerm => {
    if (newTerm === undefined) {
      if (Expression.findBoundOccurrences(premise).length > 0) {
        throw createError(ErrorName.TERM_NOT_PROVIDED_FOR_NON_VACUOUS_QUANTIFICATION)
      }
    } else {
      const oldTerm = premise.boundSym
      const [child] = premise.children
      const boundSyms = Expression.findBoundSymsAtFreeOccurrencesOfSym(child, oldTerm)
      if (boundSyms[newTerm.id] !== undefined) {
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

    try {
      return Expression.getSubexpression(formula, firstOccurrence.slice(1)).sym
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
  const premise = QuantificationRuleInterface(deduction, stepIndex).getPremise()

  return GeneralizationRuleInterface(deduction, stepIndex, (newTerm, oldTerm) => {
    const ruleApplicationSpec = RegularRuleApplicationSpec.universalGeneralization(
      premise,
      stepIndex,
      newTerm,
      oldTerm
    )
    const newDeduction = Deduction.applyRule(deduction, ruleApplicationSpec)

    return startDeduction(newDeduction)
  })
}

export const UniversalInstantiationRuleInterface = (deduction, stepIndex) => {
  const premise = QuantificationRuleInterface(deduction, stepIndex).getPremise()

  return InstantiationRuleInterface(deduction, stepIndex, newTerm => {
    const ruleApplicationSpec = RegularRuleApplicationSpec.universalInstantiation(
      premise,
      stepIndex,
      newTerm
    )
    const newDeduction = Deduction.applyRule(deduction, ruleApplicationSpec)

    return startDeduction(newDeduction)
  })
}

export const GeneralizationRuleInterface = (deduction, stepIndex, concreteApply) => {
  const premise = QuantificationRuleInterface(deduction, stepIndex).getPremise()

  // `newTerm` is the generalized term which will be the substitute and `oldTerm` is the instance
  // term which if provided will be substituted with `newTerm`. If `oldTerm` is not provided
  // generalization will be is vacuous.
  const apply = (newTerm, oldTerm) => {
    const substitutionRequired = !Sym.equals(newTerm, oldTerm)
    if (substitutionRequired) {
      if (Expression.getFreeSyms(premise)[newTerm.id] !== undefined) {
        throw createError(ErrorName.GENERALIZED_TERM_ILLEGALLY_BINDS)
      }

      if (oldTerm !== undefined) {
        const boundSyms = Expression.findBoundSymsAtFreeOccurrencesOfSym(premise, oldTerm)
        if (boundSyms[newTerm.id] !== undefined) {
          throw createError(ErrorName.GENERALIZED_TERM_BECOMES_ILLEGALLY_BOUND)
        }
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
