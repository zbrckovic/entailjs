import { OrderedSet, Record } from 'immutable'
import { Rule } from '../rule'
import { TermDependencies } from '../term-dependency-graph/term-dependencies'

export class RegularRuleApplicationSummary extends Record<{
    rule: Exclude<Rule, Rule.Theorem>
    premises: OrderedSet<number>

    /** Term dependencies introduced in this rule. */
    termDependencies?: TermDependencies
}>({
    rule: Rule.Premise,
    premises: OrderedSet(),
    termDependencies: undefined
}, 'RegularRuleApplicationSummary') {}
