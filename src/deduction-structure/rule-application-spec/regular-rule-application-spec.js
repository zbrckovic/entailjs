import { Expression } from '../../abstract-structures'
import {
  existentialQuantifier,
  conditional,
  universalQuantifier,
  negation
} from '../../primitive-syms'
import { Rule } from '../rule'

// Contains all information necessary to apply a regular rule (not theorem rule) against a
// deduction.
//
// Notes:
// - Deduction to which the rule will be applied we will call a **target deduction**.
// - In the following lines we sometimes refer to formulas by numbers. Number in such contexts is
//   the index of the target deduction's step which introduced the formula in question (as a result
//   of the premise rule or theorem rule).
//
// All regular rules (excluding theorem) are reduced to this object. It contains all data
// necessary to construct the next step of the target deduction. This object can be considered
// as a sort of common denominator of all regular rules.
//
// Note: these functions don't validate data. Data validation is performed at the earlier step where
// these functions are called. Here we assume that functions are passed valid arguments.
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
      sym: conditional,
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
    const freeTerms = { ...Expression.getFreeTerms(premise) }
    delete freeTerms[oldTerm.id]

    const freeTermIds = Object.keys(freeTerms).map(id => parseInt(id, 10))

    termDependencies = { dependent: oldTerm.id, dependencies: new Set(freeTermIds) }
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
    const freeTerms = { ...Expression.getFreeTerms(conclusion) }
    delete freeTerms[newTerm.id]

    const freeTermIds = Object.keys(freeTerms).map(id => parseInt(id, 10))

    termDependencies = { dependent: newTerm.id, dependencies: new Set(freeTermIds) }
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

RegularRuleApplicationSpec.negationIntroduction = (
  antecedent, antecedentIndex,
  consequent1, consequent1Index,
  consequent2, consequent2Index
) =>
  RegularRuleApplicationSpec({
    rule: Rule.NegationIntroduction,
    premises: [antecedentIndex, consequent1Index, consequent2Index],
    conclusion: Expression({
      sym: negation,
      children: [antecedent]
    }),
    assumptionToRemove: antecedentIndex
  })

RegularRuleApplicationSpec.doubleNegationElimination = (premise, conclusion) =>
  RegularRuleApplicationSpec({
    rule: Rule.DoubleNegationElimination,
    premises: [premise],
    conclusion
  })
