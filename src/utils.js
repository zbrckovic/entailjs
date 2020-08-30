import { Set } from 'immutable'

export const findDuplicates = items => {
  let traversed = Set()
  let duplicates = Set()

  for (const item of items) {
    if (traversed.has(item)) {
      duplicates = duplicates.add(item)
    } else {
      traversed = traversed.add(item)
    }
  }

  return duplicates
}
