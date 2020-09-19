/**
 * Organize symbols by their ASCII text presentations.
 *
 * @param presentationCtx - `SymPresentation`s by symbol ids
 * @param syms - symbols by ids
 * @returns {Object}
 */
export const createTextToSymMap = (presentationCtx, syms) =>
  Object.fromEntries(
    Object
      .entries(presentationCtx)
      .map(([id, { ascii: { text } }]) => [text, syms[id]])
  )

/**
 * Find highest symbol id
 *
 * @param textToSymMap - symbols by their ASCII text presentations
 * @returns {number} - highest symbol id or 0 of there's no symbols
 */
export const getMaxSymId = textToSymMap => {
  const syms = Object.values(textToSymMap)
  return syms.length === 0 ? 0 : Math.max(...syms.map(({ id }) => id))
}
