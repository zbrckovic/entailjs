import { Rule } from 'deduction-structure/rule'
import { OrderedSet, Record } from 'immutable'
import { TermDependencies } from '../term-dependency-graph/term-dependencies'

export class RegularRuleApplicationSummary extends Record<{
    rule: Exclude<Rule, Rule.Theorem>
    premises: OrderedSet<number>

    /** term dependencies introduced in this rule */
    termDependencies?: TermDependencies
}>({
    rule: Rule.Premise,
    premises: OrderedSet(),
    termDependencies: undefined
}, 'RegularRuleApplicationSummary') {}
