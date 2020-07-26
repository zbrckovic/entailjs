import { Record } from 'immutable'
import { SyntacticInfo } from './syntactic-info'

/**
 * Ascii and unicode presentation for symbol.
 *
 * ASCII is used for plain text environments. Unicode is used in GUI.
 */
export class SymPresentation extends Record<{
    ascii: SyntacticInfo
    unicode?: SyntacticInfo
}>({
    ascii: new SyntacticInfo(),
    unicode: undefined
}, 'SymPresentation') {
    getDefaultSyntacticInfo() { return this.unicode ?? this.ascii }

    createDescription(arity = 1) { return this.ascii.createDescription(arity) }
}
