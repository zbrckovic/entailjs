import { Deduction } from '../../deduction-structure'
import { Rule } from '../../deduction-structure/rule'
import { existentialQuantifier, universalQuantifier } from '../../primitive-syms'
import { DeductionRuleInterface } from './deduction-rule-interface'
import { PremiseRuleInterface } from './premise-rule-interface'
import {
    ExistentialGeneralizationRuleInterface,
    ExistentialInstantiationRuleInterface,
    UniversalGeneralizationRuleInterface,
    UniversalInstantiationRuleInterface
} from './quantification'
import { TautologicalImplicationRuleInterface } from './tautological-implication-rule-interface'
import { TheoremRuleInterface } from './theorem-rule-interface'

/**
 * Accept deduction and selected steps (step indexes), determine possible rules which could be
 * applied and return interfaces for their application.
 */
export const RulesInterface = (deduction: Deduction, ...steps: number[]): RulesInterface => {
    const result: RulesInterface = {}

    result[Rule.TautologicalImplication] = new TautologicalImplicationRuleInterface(
        deduction,
        steps
    )

    if (steps.length === 0) {
        result[Rule.Premise] = new PremiseRuleInterface(deduction)
        result[Rule.Theorem] = new TheoremRuleInterface(deduction)
    } else if (steps.length == 1) {
        const [step] = steps

        const premise = deduction.getStep(step).formula

        if (premise.sym.equals(universalQuantifier)) {
            result[Rule.UniversalInstantiation] = new UniversalInstantiationRuleInterface(
                deduction,
                step
            )
        } else if (premise.sym.equals(existentialQuantifier)) {
            result[Rule.ExistentialInstantiation] = new ExistentialInstantiationRuleInterface(
                deduction,
                step
            )

        }

        result[Rule.UniversalGeneralization] = new UniversalGeneralizationRuleInterface(
            deduction,
            step
        )
        result[Rule.ExistentialGeneralization] = new ExistentialGeneralizationRuleInterface(
            deduction,
            step
        )
    } else if (steps.length === 2) {
        const [firstStepIndex, secondStepIndex] = steps
        const [firstStep, secondStep] = steps.map(i => deduction.getStep(i))

        const firstStepIsPremise = firstStep.ruleApplicationSummary.rule === Rule.Premise
        const firstIsAssumptionForSecond = secondStep.assumptions
                                                     .contains(firstStepIndex)

        if (firstStepIsPremise && firstIsAssumptionForSecond) {
            result[Rule.Deduction] = new DeductionRuleInterface(
                deduction,
                firstStepIndex,
                secondStepIndex
            )
        }
    }

    return result
}

export interface RulesInterface {
    [Rule.Premise]?: PremiseRuleInterface
    [Rule.Deduction]?: DeductionRuleInterface
    [Rule.TautologicalImplication]?: TautologicalImplicationRuleInterface
    [Rule.UniversalInstantiation]?: UniversalInstantiationRuleInterface
    [Rule.UniversalGeneralization]?: UniversalGeneralizationRuleInterface
    [Rule.ExistentialInstantiation]?: ExistentialInstantiationRuleInterface
    [Rule.ExistentialGeneralization]?: ExistentialGeneralizationRuleInterface
    [Rule.Theorem]?: TheoremRuleInterface
}
