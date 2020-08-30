import { List, Record } from 'immutable'
import { Rule } from './rule'
import {
  RegularRuleApplicationSummary,
  TheoremRuleApplicationSummary
} from './rule-application-summary'
import { Step } from './step'
import { TermDependencyGraph } from './term-dependency-graph'

/**
 * Structure containing all relevant information about some deduction (proof) carried out as a
 * sequence of steps.
 */
export class Deduction extends Record({
  steps: List(),
  termDependencyGraph: new TermDependencyGraph()
}, 'Deduction') {
  get size() { return this.steps.size }

  /**
   * Derive new deduction by applying rule.
   *
   * @param ruleApplicationSpec - Specification of the rule to apply.
   */
  applyRule(ruleApplicationSpec) {
    return ruleApplicationSpec.rule === Rule.Theorem
      ? this._applyTheoremRule(ruleApplicationSpec)
      : this._applyRegularRule(ruleApplicationSpec)
  }

  _applyTheoremRule({ theorem: formula, theoremId }) {
    const ruleApplicationSummary = new TheoremRuleApplicationSummary({
      rule: Rule.Theorem,
      theoremId
    })
    const step = new Step({ formula, ruleApplicationSummary })
    return this.addStep(step)
  }

  _applyRegularRule({
    rule,
    premises,
    conclusion,
    termDependencies,
    assumptionToRemove
  }) {
    const assumptions = this._calculateAssumptions(
      premises,
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
      : this._updateGraph(termDependencies)

    return this.addStep(step)._setGraph(graph)
  }

  /**
   * Get step by its ordinal number.
   *
   * From regular user's perspective steps are referenced by positive integers starting from 1.
   * Internally we use list indexes which start from 0.
   */
  getStepByOrdinal(ordinal) {
    return this.getStep(ordinal - 1)
  }

  getStep(stepIndex) {
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
   * Calculate which assumptions must be added according to the specified rule premises.
   *
   * Assumptions are inherited from all premises. In addition to that if premise was introduced
   * by `Premise` or `Theorem` rule, its index is also added as an assumption.
   */
  _calculateAssumptions(premises, toRemove) {
    let assumptions = premises
      .toIndexedSeq()
      .flatMap(premise => {
        const step = this.getStep(premise)

        let { assumptions } = step
        const { ruleApplicationSummary: { rule } } = step

        if (rule === Rule.Premise || rule === Rule.Theorem) {
          assumptions = assumptions.add(premise)
        }

        return assumptions
      })
      .toSet()

    if (toRemove !== undefined) assumptions = assumptions.remove(toRemove)

    return assumptions
  }

  /** Calculate new graph according to changes required by the rule. */
  _updateGraph({ dependent, dependencies }) {
    return this.termDependencyGraph.addDependencies(dependent, ...dependencies.toArray())
  }

  addStep(step) { return this.update('steps', steps => steps.push(step)) }

  _setGraph(graph) { return this.set('termDependencyGraph', graph) }
}
