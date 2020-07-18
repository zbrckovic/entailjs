import { List, OrderedSet, Record } from 'immutable'
import { Rule } from './rule'
import {
    RegularRuleApplicationSpec,
    RuleApplicationSpec,
    TheoremRuleApplicationSpec
} from './rule-application-spec'
import {
    RegularRuleApplicationSummary,
    TheoremRuleApplicationSummary
} from './rule-application-summary'
import { Step } from './step'
import { TermDependencyGraph } from './term-dependency-graph'
import { TermDependencies } from './term-dependency-graph/term-dependencies'

/**
 * Structure containing all relevant information about some deduction (proof) carried out as a
 * sequence of steps.
 */
export class Deduction extends Record<{
    steps: List<Step>
    termDependencyGraph: TermDependencyGraph
}>({
    steps: List(),
    termDependencyGraph: new TermDependencyGraph()
}, 'Deduction') {
    get size() { return this.steps.size }

    applyRule(ruleApplicationSpec: RuleApplicationSpec) {
        return ruleApplicationSpec.rule === Rule.Theorem
            ? this.applyTheoremRule(ruleApplicationSpec)
            : this.applyRegularRule(ruleApplicationSpec)
    }

    private applyTheoremRule(
        { theorem: formula, theoremId }: TheoremRuleApplicationSpec
    ) {
        const ruleApplicationSummary = new TheoremRuleApplicationSummary({
            rule: Rule.Theorem,
            theoremId
        })
        const step = new Step({ formula, ruleApplicationSummary })
        return this.addStep(step)
    }

    private applyRegularRule(
        {
            rule,
            premises,
            conclusion,
            termDependencies,
            assumptionToAdd,
            assumptionToRemove
        }: RegularRuleApplicationSpec
    ) {
        const assumptions = this.calculateAssumptions(
            premises,
            assumptionToAdd,
            assumptionToRemove
        )

        const ruleApplicationSummary = new RegularRuleApplicationSummary({
            rule,
            premises,
            termDependencies
        })

        const step = new Step({
            assumptions,
            formula: conclusion,
            ruleApplicationSummary
        })

        const graph = termDependencies === undefined
            ? this.termDependencyGraph
            : this.updateGraph(termDependencies)

        return this.addStep(step).setGraph(graph)
    }

    getStepByOrdinal(ordinal: number) {
        return this.getStep(ordinal - 1)
    }

    getStep(stepIndex: number) {
        const step = this.steps.get(stepIndex)
        if (step === undefined) throw new Error(`no step at index ${stepIndex}`)
        return step
    }

    getLastStep() {
        const step = this.steps.last(undefined)
        if (step === undefined) throw new Error('no last step')
        return step
    }

    /**
     * Calculate which assumptions must be added according to specified rule premises.
     */
    private calculateAssumptions(
        premises: OrderedSet<number>,
        toAdd?: number,
        toRemove?: number
    ) {
        let assumptions = premises
            .toIndexedSeq()
            .map(premise => this.getStep(premise))
            .flatMap(
                ({ assumptions, ruleApplicationSummary: { rule } }: Step, i: number) => {
                    if (rule === Rule.Premise || rule === Rule.Theorem) {
                        assumptions = assumptions.add(i)
                    }
                    return assumptions
                })
            .toSet()

        if (toRemove !== undefined) assumptions = assumptions.remove(toRemove)
        if (toAdd !== undefined) assumptions = assumptions.add(toAdd)

        return assumptions
    }

    /** Calculate new graph according to changes required by the rule. */
    private updateGraph({ dependent, dependencies }: TermDependencies) {
        return this.termDependencyGraph.addDependencies(dependent, ...dependencies)
    }

    addStep(step: Step) {
        return this.update('steps', steps => steps.push(step))
    }

    private setGraph(graph: TermDependencyGraph) {
        return this.set('termDependencyGraph', graph)
    }
}
