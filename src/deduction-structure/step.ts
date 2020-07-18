import { Expression } from 'abstract-structures/expression'
import { Set, Record } from 'immutable'
import { RegularRuleApplicationSummary, RuleApplicationSummary } from './rule-application-summary'

export class Step extends Record<{
    /** Indexes of assumptions previously introduced and upon which this step depends. */
    assumptions: Set<number>

    /** Formula introduced in this step. */
    formula: Expression

    /**
     * Justification for the introduction of `formula` in this step:
     * - Which rule was used?
     * - How was the rule applied?
     * - What change must be made to the term dependency graph?
     */
    ruleApplicationSummary: RuleApplicationSummary
}>({
    assumptions: Set(),
    formula: new Expression(),
    ruleApplicationSummary: new RegularRuleApplicationSummary()
}, 'Step') {}
