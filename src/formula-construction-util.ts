import { connectWithBinarySym, Expression } from 'abstract-structures/expression'
import { List } from 'immutable'
import { conjunction, implication } from 'primitive-syms'

/**
 * Create conjunction of `formulas`. If there's only one formula return it.
 */
export const createConjunction = (formulas: Expression[]): Expression =>
    formulas.length === 1 ? formulas[0] : connectWithBinarySym(formulas, conjunction)

export const createImplicationWithAntecedentsAsConjunction = (
    antecedents: Expression[],
    consequent: Expression
) => new Expression({
    sym: implication,
    children: List.of(
        createConjunction(antecedents),
        consequent
    )
})
