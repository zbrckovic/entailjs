import { Map } from 'immutable'
import { Sym } from '../../abstract-structures/sym'
import { order } from '../../abstract-structures/sym/category'
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

/**
 * Group context entries by category into multiple contexts
 * (Also sort those contexts by category and their entries by symbol id).
 * */
export const groupByCategory = (presentationCtx: PresentationCtx) =>
    presentationCtx
        .sortBy((presentation, sym) => sym.id)
        .groupBy((presentation, sym) => sym.getCategory())
        .sortBy((ctx, category) => category, order)
