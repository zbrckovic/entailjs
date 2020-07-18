import { RegularRuleApplicationSpec } from './regular-rule-application-spec'
import { TheoremRuleApplicationSpec } from './theorem-rule-application-spec'

export * from './regular-rule-application-spec'
export * from './theorem-rule-application-spec'

export type RuleApplicationSpec = RegularRuleApplicationSpec | TheoremRuleApplicationSpec
