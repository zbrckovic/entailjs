interface EntailCoreError<T = undefined> extends Error {
    extra: T
}

export function createError<T>(name: ErrorName, message = '', extra?: T) {
    const error = new Error(message) as EntailCoreError<T>
    error.name = name
    error.message = `${name}: ${message}`
    error.extra = extra
    return error
}

export enum ErrorName {
    EXPRESSION_DOESNT_BIND = 'EXPRESSION_DOESNT_BIND',
    NO_CHILD_AT_INDEX = 'NO_CHILD_AT_INDEX',
    CANT_GET_PARENT_OF_ROOT = 'CANT_GET_PARENT_OF_ROOT',
    NOT_ENOUGH_EXPRESSIONS = 'NOT_ENOUGH_EXPRESSIONS',
    CYCLIC_DEPENDENCIES = 'CYCLIC_DEPENDENCIES',
    TERM_ALREADY_USED = 'TERM_ALREADY_USED',
    GENERALIZED_TERM_ILLEGALLY_BINDS = 'GENERALIZED_TERM_ILLEGALLY_BINDS',
    GENERALIZED_TERM_BECOMES_ILLEGALLY_BOUND = 'GENERALIZED_TERM_BECOMES_ILLEGALLY_BOUND',
    TERM_NOT_PROVIDED_FOR_NON_VACUOUS_QUANTIFICATION = 'TERM_NOT_PROVIDED_FOR_NON_VACUOUS_QUANTIFICATION',
    INSTANCE_TERM_BECOMES_ILLEGALLY_BOUND = 'INSTANCE_TERM_BECOMES_ILLEGALLY_BOUND',
    INVALID_SUBSTITUTION_RESULT = 'INVALID_SUBSTITUTION_RESULT',
    INVALID_TAUTOLOGICAL_IMPLICATION = 'INVALID_TAUTOLOGICAL_IMPLICATION',
    INVALID_STEP_ORDINAL = 'INVALID_STEP_ORDINAL',
    DUPLICATE_ASSUMPTIONS_ORDINALS = 'DUPLICATE_ASSUMPTIONS_ORDINALS',
    ASSUMPTION_ORDINAL_OUT_OF_RANGE = 'ASSUMPTION_ORDINAL_OUT_OF_RANGE',
    ASSUMPTION_INVALID_RULE = 'ASSUMPTION_INVALID_RULE',
    INVALID_ASSUMPTION_ORDINALS = 'INVALID_ASSUMPTION_ORDINALS',
    RULE_NOT_ALLOWED = 'RULE_NOT_ALLOWED',
    INVALID_FORMULA = 'INVALID_FORMULA',
    INVALID_BOUND_SYMBOL_CATEGORY = 'INVALID_BOUND_SYMBOL_CATEGORY',
    INVALID_BOUND_SYMBOL_ARITY = 'INVALID_BOUND_SYMBOL_ARITY',
    INVALID_ARITY = 'INVALID_ARITY',
    INVALID_SYMBOL_KIND = 'INVALID_SYMBOL_KIND',
    INVALID_SYMBOL_PLACEMENT = 'INVALID_SYMBOL_PLACEMENT',
    NOT_TRUTH_FUNCTIONAL = 'NOT_TRUTH_FUNCTIONAL',
    NO_ASSIGNED_VALUE_ERROR = 'NO_ASSIGNED_VALUE_ERROR',
    STEP_ORDINAL_OUT_OF_RANGE = 'STEP_ORDINAL_OUT_OF_RANGE'
}
