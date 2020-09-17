export const createTextToSymMap = (presentationCtx, syms) =>
  Object.fromEntries(
    Object
      .entries(presentationCtx)
      .map(([id, { ascii: { text } }]) => [text, syms[id]])
  )

export const getMaxSymId = textToSymMap => {
  const syms = Object.values(textToSymMap)
  return syms.length === 0 ? 0 : Math.max(...syms.map(({ id }) => id))
}
