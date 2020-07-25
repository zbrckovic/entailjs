import { Map, Set } from 'immutable'
import { Expression } from '../../abstract-structures/expression'
import { Sym } from '../../abstract-structures/sym'
import { DeductionInterface } from '../../deduction-interface'
import { Deduction } from '../../deduction-structure'
import { getRule, Rule } from '../../deduction-structure/rule'
import { BaseError } from '../../error'
import { SymPresentation } from '../../presentation/sym-presentation'
import { PresentationCtx } from '../../presentation/sym-presentation/presentation-ctx'
import { findDuplicates } from '../../utils'
import { AstProcessor as FormulaAstProcessor } from '../formula-parser/ast-processor'
import { AstDeduction, Step as AstStep } from '../peg/ast-deduction'

export class AstProcessor {
    private readonly formulaAstProcessor: FormulaAstProcessor

    get presentationCtx(): PresentationCtx { return this.formulaAstProcessor.presentationCtx }

    get textToSymMap(): Map<string, Sym> { return this.formulaAstProcessor.textToSymMap }

    get maxSymId(): number { return this.formulaAstProcessor.maxSymId }

    constructor(presentationCtx: PresentationCtx) {
        this.formulaAstProcessor = new FormulaAstProcessor(presentationCtx)
    }

    process({ steps }: AstDeduction) {
        let deductionInterface = DeductionInterface.start()

        deductionInterface = steps.reduce(
            (deductionInterface, step, i) => this.processStep(deductionInterface, step, i + 1),
            deductionInterface
        )

        return deductionInterface.deduction
    }

    private processStep(
        deductionInterface: DeductionInterface,
        astStep: AstStep,
        stepOrdinal: number
    ): DeductionInterface {
        AstProcessor.validateStepOrdinal(stepOrdinal, astStep.ordinal)

        const assumptionsOrdinals = astStep.assumptions

        AstProcessor.validateAssumptionsOrdinals(deductionInterface.deduction, assumptionsOrdinals)

        const rule = getRule(astStep.ruleApplicationSummary.rule)
        const premisesOrdinals = astStep.ruleApplicationSummary.premises
        const formula = this.formulaAstProcessor.process(astStep.formula)
        const availableRules = deductionInterface.selectSteps(...premisesOrdinals)

        switch (rule) {
            case Rule.Premise: {
                const ruleInterface = availableRules[rule]
                if (ruleInterface === undefined) throw new RuleNotAllowedError(stepOrdinal, rule)
                deductionInterface = ruleInterface.apply(formula)
                break
            }
            case Rule.Deduction: {
                const ruleInterface = availableRules[rule]
                if (ruleInterface === undefined) throw new RuleNotAllowedError(stepOrdinal, rule)
                deductionInterface = ruleInterface.apply()
                break
            }
            case Rule.TautologicalImplication: {
                const ruleInterface = availableRules[rule]
                if (ruleInterface === undefined) throw new RuleNotAllowedError(stepOrdinal, rule)
                deductionInterface = ruleInterface.apply(formula)
                break
            }
            case Rule.UniversalInstantiation: {
                const ruleInterface = availableRules[rule]
                if (ruleInterface === undefined) throw new RuleNotAllowedError(stepOrdinal, rule)
                const newSym = ruleInterface.determineNewTermInPotentialResult(formula)
                deductionInterface = ruleInterface.apply(newSym)
                break
            }
            case Rule.UniversalGeneralization: {
                const ruleInterface = availableRules[rule]
                if (ruleInterface === undefined) throw new RuleNotAllowedError(stepOrdinal, rule)
                const {
                    oldTerm,
                    newTerm
                } = ruleInterface.determineSubstitutionInPotentialResult(formula)
                deductionInterface = ruleInterface.apply(newTerm, oldTerm)
                break
            }
            case Rule.ExistentialInstantiation: {
                const ruleInterface = availableRules[rule]
                if (ruleInterface === undefined) throw new RuleNotAllowedError(stepOrdinal, rule)
                const newSym = ruleInterface.determineNewTermInPotentialResult(formula)
                deductionInterface = ruleInterface.apply(newSym)
                break
            }
            case Rule.ExistentialGeneralization:
                const ruleInterface = availableRules[rule]
                if (ruleInterface === undefined) throw new RuleNotAllowedError(stepOrdinal, rule)
                const {
                    oldTerm,
                    newTerm
                } = ruleInterface.determineSubstitutionInPotentialResult(formula)
                deductionInterface = ruleInterface.apply(newTerm, oldTerm)
                break
            case Rule.Theorem: {
                const ruleInterface = availableRules[rule]
                if (ruleInterface === undefined) throw new RuleNotAllowedError(stepOrdinal, rule)
                deductionInterface = ruleInterface.apply()
                break
            }
        }

        const newStep = deductionInterface.deduction.getLastStep()

        const assumptionIndexes = Set(assumptionsOrdinals.map(ordinal => ordinal - 1))
        if (!newStep.assumptions.equals(assumptionIndexes)) {
            throw new InvalidAssumptionsOrdinalsError(stepOrdinal, assumptionsOrdinals)
        }

        if (!newStep.formula.equals(formula)) throw new InvalidFormulaError(formula)

        return deductionInterface
    }

    private static validateStepOrdinal(
        actualStepOrdinal: number,
        encounteredStepOrdinal?: number
    ) {
        if (encounteredStepOrdinal !== undefined && encounteredStepOrdinal != actualStepOrdinal) {
            throw new InvalidStepOrdinalError(encounteredStepOrdinal, actualStepOrdinal)
        }
    }

    private static validateAssumptionsOrdinals(
        deduction: Deduction,
        assumptionsOrdinalsArray: number[]
    ) {
        const assumptionsOrdinals = Set.of(...assumptionsOrdinalsArray)

        if (assumptionsOrdinalsArray.length > assumptionsOrdinals.size) {
            throw new DuplicateAssumptionsOrdinalsError(findDuplicates(assumptionsOrdinalsArray))
        }

        const maxStepOrdinal = deduction.size

        for (const assumptionOrdinal of assumptionsOrdinals.toArray()) {
            if (assumptionOrdinal > maxStepOrdinal) {
                throw new AssumptionOrdinalOutOfRangeError(assumptionOrdinal)
            }

            const assumptionRule = deduction
                .getStepByOrdinal(assumptionOrdinal)
                .ruleApplicationSummary
                .rule

            if (assumptionRule !== Rule.Premise && assumptionRule !== Rule.Theorem) {
                throw new AssumptionInvalidRuleError(assumptionOrdinal, assumptionRule)
            }
        }
    }

    addPresentation(sym: Sym, presentation: SymPresentation) {
        this.formulaAstProcessor.addPresentation(sym, presentation)
    }

    getSym(text: string) { return this.formulaAstProcessor.getSym(text) }
}

export abstract class AstProcessorError extends BaseError {}

export class InvalidStepOrdinalError extends AstProcessorError {
    constructor(
        readonly actual: number,
        readonly expected: number
    ) {
        super(`encountered invalid step ordinal ${actual} at step ${expected}`)
    }
}

export class DuplicateAssumptionsOrdinalsError extends AstProcessorError {
    constructor(readonly assumptionsOrdinals: Set<number>) {
        super(`encountered duplicate assumption ordinal(s): ${assumptionsOrdinals.join(', ')}`)
    }
}

export class AssumptionOrdinalOutOfRangeError extends AstProcessorError {
    constructor(readonly assumptionOrdinal: number) {
        super(`assumption ordinal ${assumptionOrdinal} is out of range`)
    }
}

export class AssumptionInvalidRuleError extends AstProcessorError {
    constructor(
        readonly stepOrdinal: number,
        readonly rule: Rule
    ) {
        super(`assumption at ${stepOrdinal} has invalid rule ${rule}`)
    }
}

export class InvalidAssumptionsOrdinalsError extends AstProcessorError {
    constructor(
        readonly stepOrdinal: number,
        readonly assumptionOrdinals: number[]
    ) {
        super(
            `invalid assumption ordinal(s) ${assumptionOrdinals.join(', ')} at step ${stepOrdinal}`
        )
    }
}

export class RuleNotAllowedError extends AstProcessorError {
    constructor(
        readonly stepOrdinal: number,
        readonly rule: Rule
    ) {
        super(`invalid rule ${rule} at step ${stepOrdinal}`)
    }
}

export class InvalidFormulaError extends AstProcessorError {
    constructor(readonly formula: Expression) {
        super(`invalid formula "${formula}"`)
    }
}

