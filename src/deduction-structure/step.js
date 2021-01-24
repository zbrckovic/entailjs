import { Rule } from './rule'
import { TermDependencyGraph } from './term-dependency-graph'
import _ from 'lodash'

// Single step of a deduction
export const Step = ({
  // Indexes of assumptions previously introduced and upon which this step depends.
  assumptions = new Set(),
  // Formula introduced in this step.
  formula,
  // Justification for the introduction of `formula` in this step:
  // - Which rule was used?
  // - How was the rule applied?
  // - What change must be made to the term dependency graph?
  ruleApplicationSummary = RegularRuleApplicationSummary()
} = {}) => _.create(Step.prototype, {
  assumptions,
  formula,
  ruleApplicationSummary
})

_.assign(Step.prototype, { constructor: Step })

export const RegularRuleApplicationSummary = ({
  rule = Rule.Premise,
  premises = [],
  // Term dependencies introduced by this rule.
  addedTermDependencies,
  // Term dependencies removed as a consequence of normalization.
  removedTermDependencies = TermDependencyGraph()
} = {}) => _.create(RegularRuleApplicationSummary.prototype, {
  rule,
  premises,
  addedTermDependencies,
  removedTermDependencies
})

_.assign(RegularRuleApplicationSummary.prototype, {
  constructor: RegularRuleApplicationSummary
})

export const TheoremRuleApplicationSummary = ({ theoremId }) => _.create(
  TheoremRuleApplicationSummary.prototype,
  {
    rule: Rule.Theorem,
    theoremId
  }
)

_.assign(TheoremRuleApplicationSummary.prototype, {
  constructor: TheoremRuleApplicationSummary
})
