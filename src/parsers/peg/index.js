import { parse } from './grammar'

export const parseFormula = text => parse(text, { startRule: 'StartFormula' })
export const parseDeduction = text => parse(text, { startRule: 'StartDeduction' })
