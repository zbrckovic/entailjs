import { Map } from 'immutable'
import { Sym } from '../../abstract-structures/sym'
import { SymPresentation } from './sym-presentation'

/** Association of each symbol with its presentation */
export type PresentationCtx = Map<Sym, SymPresentation>

export const createTextToSymMap = (presentationCtx: PresentationCtx) => Map(
    presentationCtx
        .entrySeq()
        .map(([sym, { ascii: { text } }]) => [text, sym])
)

export const getMaxSymId = (textToSymMap: Map<string, Sym>) => textToSymMap
    .valueSeq()
    .map(({ id }) => id)
    .max() ?? 0
