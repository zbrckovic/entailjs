import { Deduction, TermDependencyGraph } from '../deduction-structure'
import { createError, ErrorName } from '../error'
import { RulesInterface } from './rules-interface'
import _ from 'lodash'

// Interface which can be used to perform deduction by repeatedly applying available rules. Validity
// of deduction is ensured on each step. Therefore validity of the resulting deduction is guaranteed
// if deduction provided at the start (if any) was valid.
export const startDeduction = (deduction = Deduction()) => {
  const createIndexes = (...ordinals) => {
    const stepOrdinalOutOfRange = ordinals.find(ordinal => !(
      Number.isInteger(ordinal) && ordinal >= 1 && ordinal <= deduction.getSize()
    ))

    if (stepOrdinalOutOfRange !== undefined) {
      throw createError(
        ErrorName.STEP_ORDINAL_OUT_OF_RANGE,
        undefined,
        { stepOrdinalOutOfRange, size: deduction.getSize() }
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

    const {
      ruleApplicationSummary: {
        addedTermDependencies,
        removedTermDependencies
      }
    } = _.last(steps)

    const newTermDependencyGraph = TermDependencyGraph({ ...termDependencyGraph.map })

    // Add term dependencies which were deleted in last step.
    removedTermDependencies
      .getEntries()
      .forEach(([dependentTerm, removedDependencyTerms]) => {
        const newDependencyTerms =
          new Set(newTermDependencyGraph.getDirectDependencies(dependentTerm))
        newTermDependencyGraph.setDirectDependencies(dependentTerm, newDependencyTerms)
        removedDependencyTerms.forEach(removedDependencyTerm => {
          newDependencyTerms.add(removedDependencyTerm)
        })
      })

    // Delete term dependencies which were added in last step.
    if (addedTermDependencies !== undefined) {
      const newDependencyTerms = new Set(
        newTermDependencyGraph.getDirectDependencies(addedTermDependencies.dependent)
      )
      addedTermDependencies.dependencies.forEach(dependencyTerm => {
        newDependencyTerms.delete(dependencyTerm)
      })

      if (newDependencyTerms.size > 0) {
        newTermDependencyGraph.setDirectDependencies(
          addedTermDependencies.dependent,
          newDependencyTerms
        )
      } else {
        newTermDependencyGraph.deleteDirectDependencies(addedTermDependencies.dependent)
      }
    }

    const newDeduction = Deduction({
      ...deduction,
      steps: steps.slice(0, -1),
      termDependencyGraph: newTermDependencyGraph
    })

    return startDeduction(newDeduction)
  }

  return ({ deduction, selectSteps, deleteLastStep })
}
