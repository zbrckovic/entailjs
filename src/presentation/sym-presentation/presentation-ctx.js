import { Map } from 'immutable'
import { order } from '../../abstract-structures/sym/category'

export const createTextToSymMap = presentationCtx => Map(
  presentationCtx
    .entrySeq()
    .map(([sym, { ascii: { text } }]) => [text, sym])
)

export const getMaxSymId = textToSymMap => textToSymMap
  .valueSeq()
  .map(({ id }) => id)
  .max() ?? 0

/**
 * Group context entries by category into multiple contexts
 * (Also sort those contexts by category and their entries by symbol id).
 */
export const groupByCategory = presentationCtx =>
  presentationCtx
    .sortBy((presentation, sym) => sym.id)
    .groupBy((presentation, sym) => sym.getCategory())
    .sortBy((ctx, category) => category, order)
