import _ from 'lodash'
import { Deduction } from '../deduction-structure'

export const removeLastDeductionStep = deduction => {
  const { steps, termDependencyGraph } = deduction

  if (_.isEmpty(steps)) throw new Error('no step to remove')

  const { removedDependencyGraph } = _.last(steps)

  const newTermDependencyGraph = { ...termDependencyGraph }
  Object
    .entries(removedDependencyGraph)
    .forEach(([dependent, removedDependencies]) => {
      let dependencies = newTermDependencyGraph[dependent]
      if (dependencies === undefined) {
        dependencies = new Set()
        newTermDependencyGraph[dependent] = dependencies
      }

      removedDependencies.forEach(removedDependency => { dependencies.add(removedDependency) })
    })

  return Deduction({
    ...deduction,
    steps: steps.slice(0, -1),
    termDependencyGraph: newTermDependencyGraph
  })
}
