import { AstDeduction } from './ast-deduction'
import { AstFormula } from './ast-formula'
import { parse } from './grammar'

export const parseFormula = (text: string): AstFormula =>
    parse(text, {startRule: 'StartFormula'}) as AstFormula

export const parseDeduction = (text: string): AstDeduction =>
    parse(text, {startRule: 'StartDeduction'}) as AstDeduction
