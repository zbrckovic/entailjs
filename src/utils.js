// Finds duplicates in `items` by using *same-value-zero* equality comparison.
import _ from 'lodash'

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

// Check whether `received` deep equals `other` using the following custom rules:
// - methods are ignored except the on named `constructor`
// - if object has an `equals` property it will be used for comparison.
// When `isDeepEqual` is used in `equals` method implementation infinite recursion will happen.
// This can be avoided by passing the `equals` method reference as `equalsMethod` parameter.
export const isDeepEqual = (received, other, equalsMethod) =>
  _.isEqualWith(received, other, (first, second, key) => {
    if (key === 'constructor') return undefined
    if (_.isFunction(first)) return true
    if (_.isFunction(first?.equals) && first.equals !== equalsMethod) return first.equals(second)
    return undefined
  })

export const withConstructor = constructor => spec => ({
  __proto__: { constructor },
  ...spec
})
