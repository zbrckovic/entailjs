export const Category = {
  FF: 'FF',
  FT: 'FT',
  TT: 'TT',
  TF: 'TF'
}

const precedence = {
  [Category.FF]: 0,
  [Category.FT]: 1,
  [Category.TT]: 2,
  [Category.TF]: 3
}

export const order = (category1, category2) => precedence[category1] - precedence[category2]
