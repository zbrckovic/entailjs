import { Category, order } from './category'

test('order()', () => {
  const sorted = [Category.TF, Category.TT, Category.FF, Category.FT]
  sorted.sort(order)
  const expected = [Category.FF, Category.FT, Category.TT, Category.TF]

  expect(expected).toEqual(sorted)
})
