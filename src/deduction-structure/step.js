import stampit from '@stamp/it'
import { Base } from '../utils'
import { Rule } from './rule'
import { TermDependencyGraph } from './term-dependency-graph'

// Single step of a deduction
export const Step = stampit({
  name: 'Step',
  init ({
    // Indexes of assumptions previously introduced and upon which this step depends.
    assumptions = new Set(),
    // Formula introduced in this step.
    formula,
    // Justification for the introduction of `formula` in this step:
    // - Which rule was used?
    // - How was the rule applied?
    // - What change must be made to the term dependency graph?
    ruleApplicationSummary = RegularRuleApplicationSummary()
  }) {
    this.assumptions = assumptions
    this.formula = formula
    this.ruleApplicationSummary = ruleApplicationSummary
  }
}).compose(Base)

export const RegularRuleApplicationSummary = stampit({
  name: 'RegularRuleApplicationSummary',
  init ({
    rule = Rule.Premise,
    premises = [],
    // Term dependencies introduced by this rule.
    addedTermDependencies,
    // Term dependencies removed as a consequence of normalization.
    removedTermDependencies = TermDependencyGraph()
  }) {
    this.rule = rule
    this.premises = premises
    this.addedTermDependencies = addedTermDependencies
    this.removedTermDependencies = removedTermDependencies
  }
})

export const TheoremRuleApplicationSummary = stampit({
  name: 'TheoremRuleApplicationSummary',
  init ({ theoremId }) {
    this.rule = Rule.Theorem
    this.theoremId = theoremId
  }
}).compose(Base)
