import { Rule } from './rule'
import { TermDependencyGraph } from './term-dependency-graph'

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
} = {}) => ({ assumptions, formula, ruleApplicationSummary })

export const RegularRuleApplicationSummary = ({
  rule = Rule.Premise,
  premises = [],
  // Term dependencies introduced by this rule.
  addedTermDependencies,
  // Term dependencies removed as a consequence of normalization.
  removedTermDependencies = TermDependencyGraph()
} = {}) => ({ rule, premises, addedTermDependencies, removedTermDependencies })

export const TheoremRuleApplicationSummary = ({ theoremId }) => ({ rule: Rule.Theorem, theoremId })
