import { Expression } from 'abstract-structures/expression'
import { Rule } from 'deduction-structure/rule'
import { Record } from 'immutable'

export class TheoremRuleApplicationSpec extends Record<{
    rule: Rule.Theorem
    theoremId: string
    theorem: Expression
}>({
    rule: Rule.Theorem,
    theoremId: '',
    theorem: new Expression()
}, 'TheoremRuleApplicationSpec') {}
