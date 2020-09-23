import { Rule } from './rule'
import {
  RegularRuleApplicationSummary,
  TheoremRuleApplicationSummary
} from './rule-application-summary'
import { Step } from './step'
import { TermDependencyGraph } from './term-dependency-graph'

// Structure containing all relevant information about some deduction (proof) carried out as a
// sequence of steps.
export const Deduction = ({ steps = [], termDependencyGraph = TermDependencyGraph() } = {}) => ({
  steps, termDependencyGraph
})

Deduction.getSize = deduction => deduction.steps.length

// Get step by its ordinal number. From regular user's perspective steps are referenced by positive
// integers starting from 1. Internally we use list indexes which start from 0.
Deduction.getStepByOrdinal = (deduction, ordinal) => Deduction.getStep(deduction, ordinal - 1)

Deduction.getStep = (deduction, stepIndex) => {
  const step = deduction.steps[stepIndex]
  if (step === undefined) throw new Error(`no step at index ${stepIndex}`)
  return step
}

Deduction.getLastStep = deduction => {
  const step = deduction.steps[deduction.steps.length - 1]
  if (step === undefined) throw new Error('no last step')
  return step
}

// Derive new deduction by applying rule specified by `ruleApplicationSpec`.
Deduction.applyRule = (deduction, ruleApplicationSpec) => {
  return ruleApplicationSpec.rule === Rule.Theorem
    ? applyTheoremRule(deduction, ruleApplicationSpec)
    : applyRegularRule(deduction, ruleApplicationSpec)
}

const applyTheoremRule = (deduction, { theorem: formula, theoremId }) => {
  const ruleApplicationSummary = TheoremRuleApplicationSummary({ theoremId })
  const step = Step({ formula, ruleApplicationSummary })
  return addStep(deduction, step)
}

const applyRegularRule = (deduction, {
  rule,
  premises,
  conclusion,
  termDependencies,
  assumptionToRemove
}) => {
  const assumptions = calculateAssumptions(deduction, premises, assumptionToRemove)

  const ruleApplicationSummary = RegularRuleApplicationSummary({ rule, premises, termDependencies })

  const step = Step({ assumptions, formula: conclusion, ruleApplicationSummary })

  const graph = termDependencies === undefined
    ? deduction.termDependencyGraph
    : updateGraph(deduction, termDependencies)

  let result = addStep(deduction, step)
  result = setGraph(result, graph)

  return result
}

// Calculate new graph according to changes required by the rule.
const updateGraph = (deduction, { dependent, dependencies }) =>
  TermDependencyGraph.addDependencies(deduction.termDependencyGraph, dependent, ...dependencies)

const setGraph = (deduction, termDependencyGraph) => ({ ...deduction, termDependencyGraph })

const addStep = (deduction, step) => {
  const newSteps = [...deduction.steps, step]
  return { ...deduction, steps: newSteps }
}

// Calculate which assumptions must be added according to the specified rule premises. Assumptions
// are inherited from all premises. In addition to that if premise was introduced by `Premise` or
// `Theorem` rule, its index is also added as an assumption.
const calculateAssumptions = (deduction, premises, toRemove) => {
  const result = new Set()

  premises.forEach((premise, i) => {
    const step = Deduction.getStep(deduction, premise)

    const { assumptions, ruleApplicationSummary: { rule } } = step

    if (rule === Rule.Premise || rule === Rule.Theorem) {
      result.add(i)
    }

    assumptions.forEach(assumption => { result.add(assumption) })
  })

  if (toRemove !== undefined) {
    toRemove.forEach(assumption => { result.delete(assumption) })
  }

  return result
}
