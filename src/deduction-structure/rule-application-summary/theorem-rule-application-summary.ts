import { Record } from 'immutable'
import { Rule } from '../rule'

export class TheoremRuleApplicationSummary extends Record<{
    rule: Rule.Theorem
    theoremId: string
}>({
    rule: Rule.Theorem,
    theoremId: ''
}, 'TheoremRuleApplicationSummary') {}
