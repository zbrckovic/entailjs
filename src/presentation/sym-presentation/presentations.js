import _ from 'lodash'

// **Presentation context** or is a mapping between symbol ids and their presentations.

// Organizes symbols by their ASCII text presentations. It's assumed that each presentation in
// `presentations` will have a unique ASCII text. `syms` is a mapping between ids and symbols and
// it should contain all symbols whose ids appear in `presentations`. The result is useful to the
// parser which needs a quick access to the symbol represented by some text it encountered.
export const createTextToSymMap = (presentations, syms) =>
  _.fromPairs(
    Object
      .entries(presentations)
      .map(([id, { ascii: { text } }]) => [text, syms[id]])
  )

// Find the highest symbol id in `textToSymMap`. If `textToSymMap` is empty return 0.
export const getMaxSymId = textToSymMap => {
  const syms = Object.values(textToSymMap)
  return syms.length === 0 ? 0 : Math.max(...syms.map(({ id }) => id))
}
