import { Sym } from '../../../abstract-structures/sym'
import { RegularRuleApplicationSpec } from '../../../deduction-structure/rule-application-spec'
import {
    CyclicDependenciesError as TermDependencyGraphCyclicDependenciesError,
    TermAlreadyUsedError as TermDependencyGraphTermAlreadyUsedError
} from '../../../deduction-structure/term-dependency-graph'
import { DeductionInterface } from '../../deduction-interface'
import { InstantiationRuleInterface } from './instantiation-rule-interface'
import { TermAlreadyUsedError, TermsCyclicDependenciesError } from './quantification-rule-interface'

export class ExistentialInstantiationRuleInterface extends InstantiationRuleInterface {
    protected concreteApply(newTerm?: Sym): DeductionInterface {
        const ruleApplicationSpec = RegularRuleApplicationSpec.existentialInstantiation(
            this.premise,
            this.stepIndex,
            newTerm
        )

        try {
            const newDeduction = this.deduction.applyRule(ruleApplicationSpec)
            return new DeductionInterface(newDeduction)
        } catch (e) {
            if (e instanceof TermDependencyGraphTermAlreadyUsedError) {
                throw new TermAlreadyUsedError(e.term)
            } else if (e instanceof TermDependencyGraphCyclicDependenciesError) {
                throw new TermsCyclicDependenciesError(e.dependentTerm, e.dependencyTerm)
            }
            throw e
        }
    }
}
