import { Record, Set } from 'immutable'
import { Expression } from '../abstract-structures/expression'
import { RegularRuleApplicationSummary } from './rule-application-summary'

export class Step extends Record({
  /** Indexes of assumptions previously introduced and upon which this step depends. */
  assumptions: Set(),
  /** Formula introduced in this step. */
  formula: new Expression(),
  /**
   * Justification for the introduction of `formula` in this step:
   * - Which rule was used?
   * - How was the rule applied?
   * - What change must be made to the term dependency graph?
   */
  ruleApplicationSummary: new RegularRuleApplicationSummary()
}, 'Step') {}
