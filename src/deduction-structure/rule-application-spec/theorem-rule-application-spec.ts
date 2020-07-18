import { Expression } from 'abstract-structures/expression'
import { Rule } from 'deduction-structure/rule'
import { Record } from 'immutable'

/** Contains all information necessary to apply the theorem rule against a deduction. */
export class TheoremRuleApplicationSpec extends Record<{
    rule: Rule.Theorem

    /** Identifier of the theorem in a project. */
    theoremId: string
    theorem: Expression
}>({
    rule: Rule.Theorem,
    theoremId: '',
    theorem: new Expression()
}, 'TheoremRuleApplicationSpec') {}
