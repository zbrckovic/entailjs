import { List } from 'immutable'
import { Category, order } from './category'

test('order()', () => {
  const initial = List.of(Category.TF, Category.TT, Category.FF, Category.FT)
  const sorted = initial.sort(order)
  const expected = List.of(Category.FF, Category.FT, Category.TT, Category.TF)
  expect(sorted.equals(expected)).toBe(true)
})
