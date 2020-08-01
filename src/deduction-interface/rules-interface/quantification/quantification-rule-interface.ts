import { Sym } from '../../../abstract-structures/sym'
import { Deduction } from '../../../deduction-structure'
import { EntailCoreError } from '../../../error'

export abstract class QuantificationRuleInterface {
    constructor(
        protected readonly deduction: Deduction,
        protected readonly stepIndex: number
    ) {}

    protected get premise() { return this.deduction.getStep(this.stepIndex).formula }
}

export class TermAlreadyUsedError extends EntailCoreError {
    constructor(readonly term: Sym) {
        super(`term ${term} is already used`)
    }
}

export class TermsCyclicDependenciesError extends EntailCoreError {
    constructor(
        readonly dependentTerm: Sym,
        readonly dependencyTerm: Sym
    ) {
        super(`term ${dependentTerm} forms a cycle by depending on ${dependencyTerm}`)
    }
}
