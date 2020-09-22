import { Expression } from '../../abstract-structures/expression'
import { existentialQuantifier, implication, universalQuantifier } from '../../primitive-syms'
import { Rule } from '../rule'

// Contains all information necessary to apply a regular rule (not theorem rule) against a
// deduction.
//
// Notes:
// - Deduction to which the rule will be applied we will call 'target deduction'.
// - In the following lines we sometimes refer to formulas by numbers. Number in such contexts is
//   the index of the target deduction's step which introduced the formula in question (as a result
//   of the premise rule or theorem rule).
//
// All rules (except theorem) are reduced to this object. It contains all data necessary to
// construct the next step of the target deduction. This object can be considered as some sort of a
// common denominator of all regular rules.
//
// Note: static factory methods don't validate data!
export const RegularRuleApplicationSpec = ({
  rule = Rule.Premise,

  // Formulas which will serve as the premises of this rule.
  premises = [],

  // Resulting formula which will be introduced in the next target deduction's step.
  conclusion,

  // Term dependencies with which to extend target deduction's term dependency graph.
  termDependencies,

  // Assumptions to remove from the inherited set of assumptions.
  assumptionToRemove
}) => ({ rule, premises, conclusion, termDependencies, assumptionToRemove })

RegularRuleApplicationSpec.premise = premise => RegularRuleApplicationSpec({
  rule: Rule.Premise,
  conclusion: premise
})

RegularRuleApplicationSpec.deduction = (
  antecedent, antecedentIndex, consequent, consequentIndex
) =>
  RegularRuleApplicationSpec({
    rule: Rule.Deduction,
    premises: [antecedentIndex, consequentIndex],
    conclusion: Expression({
      sym: implication,
      children: [antecedent, consequent]
    }),
    assumptionToRemove: antecedentIndex
  })

RegularRuleApplicationSpec.tautologicalImplication = (premises, conclusion) =>
  RegularRuleApplicationSpec({ rule: Rule.TautologicalImplication, premises, conclusion })

RegularRuleApplicationSpec.universalInstantiation = (
  { boundSym, children }, premiseIndex, newTerm
) => {
  const [child] = children

  const conclusion = newTerm !== undefined
    ? Expression.replaceFreeOccurrences(child, boundSym, newTerm)
    : child

  return RegularRuleApplicationSpec({
    rule: Rule.UniversalInstantiation,
    premises: [premiseIndex],
    conclusion
  })
}

RegularRuleApplicationSpec.universalGeneralization = (premise, premiseIndex, newTerm, oldTerm) => {
  const child = oldTerm !== undefined
    ? Expression.replaceFreeOccurrences(premise, oldTerm, newTerm)
    : premise

  let termDependencies
  if (oldTerm !== undefined) {
    const freeSyms = { ...Expression.getFreeTerms(premise) }
    delete freeSyms[oldTerm.id]

    const freeSymsIds = Object.keys(freeSyms).map(freeSym => parseInt(freeSym.id, 10))

    termDependencies = { dependent: oldTerm.id, dependencies: new Set(freeSymsIds) }
  }

  return RegularRuleApplicationSpec({
    rule: Rule.UniversalGeneralization,
    premises: [premiseIndex],
    conclusion: Expression({
      sym: universalQuantifier,
      boundSym: newTerm,
      children: [child]
    }),
    termDependencies
  })
}

RegularRuleApplicationSpec.existentialInstantiation = (premise, premiseIndex, newTerm) => {
  const [child] = premise.children
  const conclusion = newTerm !== undefined
    ? Expression.replaceFreeOccurrences(child, premise.boundSym, newTerm)
    : child

  let termDependencies
  if (newTerm !== undefined) {
    const freeSyms = { ...Expression.getFreeSyms(conclusion) }
    delete freeSyms[newTerm.id]

    const freeSymsIds = Object.keys(freeSyms).map(freeSym => parseInt(freeSym.id, 10))

    termDependencies = { dependent: newTerm.id, dependencies: new Set(freeSymsIds) }
  }

  return RegularRuleApplicationSpec({
    rule: Rule.ExistentialInstantiation,
    premises: [premiseIndex],
    conclusion,
    termDependencies
  })
}

RegularRuleApplicationSpec.existentialGeneralization = (
  premise, premiseIndex, newTerm, oldTerm
) => {
  const child = oldTerm !== undefined
    ? Expression.replaceFreeOccurrences(premise, oldTerm, newTerm)
    : premise

  return RegularRuleApplicationSpec({
    rule: Rule.ExistentialGeneralization,
    premises: [premiseIndex],
    conclusion: Expression({
      sym: existentialQuantifier,
      boundSym: newTerm,
      children: [child]
    })
  })
}
