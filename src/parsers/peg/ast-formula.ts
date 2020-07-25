import { Placement } from '../../presentation/sym-presentation/placement'

interface BracketedExpression {
    expression: AstFormula
}

interface NonBracketedExpression {
    sym: string
    boundSym?: string
    symPlacement: Placement
    children: AstFormula[]
}

export type AstFormula = BracketedExpression | NonBracketedExpression

export const isBracketed = (ast: AstFormula): ast is BracketedExpression => {
    return (ast as BracketedExpression).expression !== undefined
}
