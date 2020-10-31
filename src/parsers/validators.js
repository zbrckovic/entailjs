// These validators are for the parts of `peg` grammar. They are here to be used in UI
// implementations.
const propositionalVariablePattern = /[a-z][0-9]?/
const predicateVariablePattern = /[BCDF-SU-Z][0-9]?/
const individualVariablePattern = /[a-z][0-9]?/
const functionVariablePattern = /[a-z][0-9]?/

export const isPropositionalVariable = text => propositionalVariablePattern.test(text)
export const isPredicateVariable = text => predicateVariablePattern.test(text)
export const isIndividualVariable = text => individualVariablePattern.test(text)
export const isFunctionVariable = text => functionVariablePattern.test(text)
