import { Rule } from '../rule'
import _ from 'lodash'

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
}) => _.create(RegularRuleApplicationSpec.prototype, {
  rule,
  premises,
  conclusion,
  termDependencies,
  assumptionToRemove
})

_.assign(RegularRuleApplicationSpec.prototype, {
  constructor: RegularRuleApplicationSpec
})
