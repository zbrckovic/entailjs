import { Sym } from 'abstract-structures/sym'
import { DeductionInterfaceError } from 'deduction-interface/error'
import { Deduction } from 'deduction-structure'

export abstract class QuantificationRuleInterface {
    constructor(
        protected readonly deduction: Deduction,
        protected readonly stepIndex: number
    ) {}

    protected get premise() { return this.deduction.getStep(this.stepIndex).formula }
}

export class InvalidSubstitutionResultError extends DeductionInterfaceError {}

export class TermAlreadyUsedError extends DeductionInterfaceError {
    constructor(readonly term: Sym) {
        super(`term ${term} is already used`)
    }
}

export class TermsCyclicDependenciesError extends DeductionInterfaceError {
    constructor(
        readonly dependentTerm: Sym,
        readonly dependencyTerm: Sym
    ) {
        super(`term ${dependentTerm} forms a cycle by depending on ${dependencyTerm}`)
    }
}
