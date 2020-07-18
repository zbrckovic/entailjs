import { Rule } from 'deduction-structure/rule'
import { Record } from 'immutable'

export class TheoremRuleApplicationSummary extends Record<{
    rule: Rule.Theorem
    theoremId: string
}>({
    rule: Rule.Theorem,
    theoremId: '',
}, 'TheoremRuleApplicationSummary') {}
