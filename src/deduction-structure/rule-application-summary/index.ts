import { RegularRuleApplicationSummary } from './regular-rule-application-summary'
import { TheoremRuleApplicationSummary } from './theorem-rule-application-summary'

export * from './regular-rule-application-summary'
export * from './theorem-rule-application-summary'

export type RuleApplicationSummary = RegularRuleApplicationSummary | TheoremRuleApplicationSummary
