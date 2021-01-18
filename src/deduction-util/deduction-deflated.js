import _ from 'lodash'

export const DeductionDeflated = ({ steps }) => ({ steps })

DeductionDeflated.prototype = {
  constructor: DeductionDeflated,

  normalize (syms) {
    const normalizedSteps = []
    let substitutions = syms

    this.steps.forEach(step => {
      const [normalizedStep, updatedSubstitutions] = step.normalize(substitutions)
      normalizedSteps.push(normalizedStep)
      substitutions = updatedSubstitutions
    })

    const normalizedDeductionDeflated = this.constructor({
      ...this,
      steps: normalizedSteps
    })

    return [normalizedDeductionDeflated, syms]
  }
}

export const StepDeflated = ({
  steps,
  formula,
  rule,
  oldTerm,
  newTerm
}) => _.create(StepDeflated.prototype, {
  steps,
  formula,
  rule,
  oldTerm,
  newTerm
})

StepDeflated.prototype = {
  constructor: StepDeflated,

  normalize (syms) {
    let normalizedFormula
    let normalizedOldTerm
    let normalizedNewTerm
    let substitutions = syms;

    ([normalizedFormula, substitutions] = this.formula.normalize(substitutions))

    if (this.oldTerm !== undefined) {
      normalizedOldTerm = substitutions[this.oldTerm]
    }

    if (this.newTerm !== undefined) {
      normalizedNewTerm = substitutions[this.newTerm]
    }

    return StepDeflated({
      ...this,
      formula: normalizedFormula,
      oldTerm: normalizedOldTerm,
      newTerm: normalizedNewTerm
    })
  }
}
