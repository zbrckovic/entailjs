// Finds duplicates in `items` by using *same-value-zero* equality comparison.
export const findDuplicates = items => {
  let traversed = new Set()
  let duplicates = new Set()

  for (const item of items) {
    if (traversed.has(item)) {
      duplicates = duplicates.add(item)
    } else {
      traversed = traversed.add(item)
    }
  }

  return duplicates
}
