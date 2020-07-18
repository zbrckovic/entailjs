import { RuleAbbreviation } from 'deduction-structure/rule'
import { AstFormula } from './ast-formula'

export interface AstDeduction {
    steps: Step[]
}

export interface Step {
    assumptions: number[]
    ordinal?: number
    formula: AstFormula
    ruleApplicationSummary: RuleApplicationSummary
}

export interface TermSubstitution {
    oldTerm: string
    newTerm: string
}

export interface RuleApplicationSummary {
    rule: RuleAbbreviation
    premises: number[]
    termSubstitution?: TermSubstitution
}
