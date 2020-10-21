import { Deduction } from '../deduction-structure'
import { createError, ErrorName } from '../error'
import { RulesInterface } from './rules-interface'
import _ from 'lodash'

// Interface which can be used to perform deduction by repeatedly applying available rules. Validity
// of deduction is ensured on each step. Therefore validity of the resulting deduction is guaranteed
// if deduction provided at the start (if any) was valid.
export const startDeduction = (deduction = Deduction()) => {
  const createIndexes = (...ordinals) => {
    const stepOrdinalOutOfRange = ordinals.find(ordinal => !(
      Number.isInteger(ordinal) && ordinal >= 1 && ordinal <= Deduction.getSize(deduction)
    ))

    if (stepOrdinalOutOfRange !== undefined) {
      throw createError(
        ErrorName.STEP_ORDINAL_OUT_OF_RANGE,
        undefined,
        { stepOrdinalOutOfRange, size: Deduction.getSize(deduction) }
      )
    }

    return ordinals.map(ordinal => ordinal - 1)
  }

  // Selects steps (formulas) to use as premises in the next rule.
  const selectSteps = (...ordinals) => {
    const indexes = createIndexes(...ordinals)
    return RulesInterface(deduction, ...indexes)
  }

  const deleteLastStep = () => {
    const { steps, termDependencyGraph } = deduction

    if (_.isEmpty(steps)) throw new Error('no step to remove')

    const { ruleApplicationSummary: { termDependencies, removedTermDependencies } } = _.last(steps)

    const newTermDependencyGraph = { ...termDependencyGraph }

    // Delete term dependencies which were added in last step.
    if (termDependencies !== undefined) {
      const newDependencies = new Set(newTermDependencyGraph[termDependencies.dependent])
      termDependencies.dependencies.forEach(dependency => { newDependencies.delete(dependency) })

      if (newDependencies.size > 0) {
        newTermDependencyGraph[termDependencies.dependent] = newDependencies
      } else {
        delete newTermDependencyGraph[termDependencies.dependent]
      }
    }

    // Add term dependencies which were deleted in last step.
    Object
      .entries(removedTermDependencies)
      .forEach(([dependent, removedDependencies]) => {
        const dependencies = new Set(newTermDependencyGraph[dependent])
        newTermDependencyGraph[dependent] = dependencies
        removedDependencies.forEach(removedDependency => { dependencies.add(removedDependency) })
      })

    const newDeduction = Deduction({
      ...deduction,
      steps: steps.slice(0, -1),
      termDependencyGraph: newTermDependencyGraph
    })

    return startDeduction(newDeduction)
  }

  return ({ deduction, selectSteps, deleteLastStep })
}
