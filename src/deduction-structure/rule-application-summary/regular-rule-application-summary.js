import { OrderedSet, Record } from 'immutable'
import { Rule } from '../rule'

export class RegularRuleApplicationSummary extends Record({
  rule: Rule.Premise,
  premises: OrderedSet(),
  /** Term dependencies introduced in this rule. */
  termDependencies: undefined
}, 'RegularRuleApplicationSummary') {}
