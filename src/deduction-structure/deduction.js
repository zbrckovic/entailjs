import { Rule } from './rule'
import { RegularRuleApplicationSummary, Step, TheoremRuleApplicationSummary } from './step'
import { TermDependencyGraph } from './term-dependency-graph'
import { Expression } from '../abstract-structures'
import { createError, ErrorName } from '../error'

// Structure containing all relevant information about some deduction (proof) carried out as a
// sequence of steps.
export const Deduction = ({
  // Sequence of steps.
  steps = [],
  // Graph containing information about dependencies between terms.
  termDependencyGraph = TermDependencyGraph()
} = {}) => ({
  steps, termDependencyGraph
})

Deduction.getSize = deduction => deduction.steps.length

// Gets step by its ordinal number. From regular user's perspective steps are referenced by
// positive integers starting from 1. Internally, zero-based indexes are used.
Deduction.getStepByOrdinal = (deduction, ordinal) => Deduction.getStep(deduction, ordinal - 1)

// Gets step by index or throws if there's no such step.
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

// Derives new deduction by applying rule specified by `ruleApplicationSpec`.
Deduction.applyRule = (deduction, ruleApplicationSpec) => {
  return ruleApplicationSpec.rule === Rule.Theorem
    ? applyTheoremRule(deduction, ruleApplicationSpec)
    : applyRegularRule(deduction, ruleApplicationSpec)
}

// Under the assumption that `formula` is the result of an application of instantiation rule to
// `premise` determines which term was introduced in the substitution. If instantiation was vacuous
// returns `undefined`.
export const determineNewTermInInstantiationResult = (formula, premise) => {
  const [firstOccurrence] = Expression.findBoundOccurrences(premise)
  if (firstOccurrence === undefined) return undefined

  try {
    return Expression.getSubexpression(formula, firstOccurrence.slice(1)).sym
  } catch (e) {
    if (e.name === ErrorName.NO_CHILD_AT_INDEX) {
      throw createError(ErrorName.INVALID_SUBSTITUTION_RESULT)
    }
    throw e
  }
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
  const assumptions = calculateAssumptions(deduction, premises, [assumptionToRemove])

  const ruleApplicationSummary = RegularRuleApplicationSummary({ rule, premises, termDependencies })

  const step = Step({ assumptions, formula: conclusion, ruleApplicationSummary })

  const graph = termDependencies === undefined
    ? deduction.termDependencyGraph
    : updateGraph(deduction, termDependencies)

  let result = addStep(deduction, step)
  result = setGraph(result, graph)

  return result
}

// Calculates new graph according to changes required by the rule's term dependencies.
const updateGraph = (deduction, termDependencies) => {
  const { dependent, dependencies } = termDependencies

  return TermDependencyGraph.addDependencies(
    deduction.termDependencyGraph,
    dependent,
    ...dependencies
  )
}

const setGraph = (deduction, termDependencyGraph) => ({ ...deduction, termDependencyGraph })

const addStep = (deduction, step) => ({ ...deduction, steps: [...deduction.steps, step] })

// Calculates which assumptions must be added to the next step according to the specified rule's
// premises. Assumptions are inherited from all premises of the rule. In addition to that if the
// premise was introduced by `Premise` or `Theorem` rule, its index is also added as an assumption.
const calculateAssumptions = (deduction, premises, toRemove) => {
  const result = new Set()

  premises.forEach(premise => {
    const step = Deduction.getStep(deduction, premise)

    const { assumptions, ruleApplicationSummary: { rule } } = step

    if (rule === Rule.Premise || rule === Rule.Theorem) {
      result.add(premise)
    }

    assumptions.forEach(assumption => { result.add(assumption) })
  })

  if (toRemove !== undefined) {
    toRemove.forEach(assumption => { result.delete(assumption) })
  }

  return result
}
