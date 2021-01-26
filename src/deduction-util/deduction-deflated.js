import stampit from '@stamp/it'
import { Base } from '../utils'

export const DeductionDeflated = stampit({
  name: 'DeductionDeflated',
  init ({ steps }) {
    this.steps = steps
  },
  methods: {
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
}).compose(Base)

export const StepDeflated = stampit({
  name: 'StepDeflated',
  init ({
    steps,
    formula,
    rule,
    oldTerm,
    newTerm
  }) {
    this.steps = steps
    this.formula = formula
    this.rule = rule
    this.oldTerm = oldTerm
    this.newTerm = newTerm
  },
  methods: {
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

      this.clone({
        formula: normalizedFormula,
        oldTerm: normalizedOldTerm,
        newTerm: normalizedNewTerm
      })
    }
  }
}).compose(Base)
