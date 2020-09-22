import { Rule } from '../rule'

export const RegularRuleApplicationSummary = ({
  rule = Rule.Premise,
  premises = [],

  // Term dependencies introduced by this rule.
  termDependencies
}) => ({ rule, premises, termDependencies })
