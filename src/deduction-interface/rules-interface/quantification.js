import { RegularRuleApplicationSpec } from '../../deduction-structure/rule-application-spec'
import { Deduction, Rule } from '../../deduction-structure'
import { startDeduction } from '../deduction-interface'
import { createError, ErrorName } from '../../error'
import { Expression, Sym } from '../../abstract-structures'
import { determineNewTermInInstantiationResult } from '../../deduction-interface'
import { determineSubstitutionInGeneralizationResult } from '../deduction-interface-util'
import { existentialQuantifier, universalQuantifier } from '../../primitive-syms'

export const ExistentialGeneralizationRuleInterface = (deduction, stepIndex) => {
  const premise = QuantificationRuleInterface(deduction, stepIndex).getPremise()

  return GeneralizationRuleInterface(deduction, stepIndex, (newTerm, oldTerm) => {
    const child = oldTerm !== undefined
      ? Expression.replaceFreeOccurrences(premise, oldTerm, newTerm)
      : premise

    const ruleApplicationSpec = RegularRuleApplicationSpec({
      rule: Rule.ExistentialGeneralization,
      premises: [stepIndex],
      conclusion: Expression({
        sym: existentialQuantifier,
        boundSym: newTerm,
        children: [child]
      })
    })

    const newDeduction = Deduction.applyRule(deduction, ruleApplicationSpec)

    return startDeduction(newDeduction)
  })
}

export const ExistentialInstantiationRuleInterface = (deduction, stepIndex) => {
  const premise = QuantificationRuleInterface(deduction, stepIndex).getPremise()

  return InstantiationRuleInterface(
    deduction,
    stepIndex,
    newTerm => {
      const [child] = premise.children
      const conclusion = newTerm !== undefined
        ? Expression.replaceFreeOccurrences(child, premise.boundSym, newTerm)
        : child

      let termDependencies
      if (newTerm !== undefined) {
        const freeTerms = { ...Expression.getFreeTerms(conclusion) }
        delete freeTerms[newTerm.id]

        const freeTermIds = Object.keys(freeTerms).map(id => parseInt(id, 10))

        termDependencies = { dependent: newTerm.id, dependencies: new Set(freeTermIds) }
      }

      const ruleApplicationSpec = RegularRuleApplicationSpec({
        rule: Rule.ExistentialInstantiation,
        premises: [stepIndex],
        conclusion,
        termDependencies
      })

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

  return ({
    apply,
    determineNewTermInPotentialResult: formula =>
      determineNewTermInInstantiationResult(formula, premise)
  })
}

export const UniversalGeneralizationRuleInterface = (deduction, stepIndex) => {
  const premise = QuantificationRuleInterface(deduction, stepIndex).getPremise()

  return GeneralizationRuleInterface(deduction, stepIndex, (newTerm, oldTerm) => {
    const child = oldTerm !== undefined
      ? Expression.replaceFreeOccurrences(premise, oldTerm, newTerm)
      : premise

    let termDependencies
    if (oldTerm !== undefined) {
      const freeTerms = { ...Expression.getFreeTerms(premise) }
      delete freeTerms[oldTerm.id]

      const freeTermIds = Object.keys(freeTerms).map(id => parseInt(id, 10))

      termDependencies = { dependent: oldTerm.id, dependencies: new Set(freeTermIds) }
    }

    const ruleApplicationSpec = RegularRuleApplicationSpec({
      rule: Rule.UniversalGeneralization,
      premises: [stepIndex],
      conclusion: Expression({
        sym: universalQuantifier,
        boundSym: newTerm,
        children: [child]
      }),
      termDependencies
    })

    const newDeduction = Deduction.applyRule(deduction, ruleApplicationSpec)

    return startDeduction(newDeduction)
  })
}

export const UniversalInstantiationRuleInterface = (deduction, stepIndex) => {
  const premise = QuantificationRuleInterface(deduction, stepIndex).getPremise()

  return InstantiationRuleInterface(deduction, stepIndex, newTerm => {
    const { boundSym, children } = premise

    const [child] = children

    const conclusion = newTerm !== undefined
      ? Expression.replaceFreeOccurrences(child, boundSym, newTerm)
      : child

    const ruleApplicationSpec = RegularRuleApplicationSpec({
      rule: Rule.UniversalInstantiation,
      premises: [stepIndex],
      conclusion
    })

    const newDeduction = Deduction.applyRule(deduction, ruleApplicationSpec)

    return startDeduction(newDeduction)
  })
}

export const GeneralizationRuleInterface = (deduction, stepIndex, concreteApply) => {
  const premise = QuantificationRuleInterface(deduction, stepIndex).getPremise()

  // `newTerm` is the generalized term which will be the substitute and `oldTerm` is the instance
  // term which if provided will be substituted with `newTerm`. If `oldTerm` is not provided
  // generalization will be vacuous.
  const apply = (newTerm, oldTerm) => {
    const substitutionRequired = oldTerm !== undefined && !Sym.equals(newTerm, oldTerm)
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

  return {
    apply,
    determineSubstitutionInPotentialResult: formula =>
      determineSubstitutionInGeneralizationResult(formula, premise)
  }
}

export const QuantificationRuleInterface = (deduction, stepIndex) => ({
  getPremise: () => Deduction.getStep(deduction, stepIndex).formula
})
