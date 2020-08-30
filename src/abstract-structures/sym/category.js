/**
 * Represents four possible categories of symbol depending on the kind of expression it forms and
 * the kind of expressions it accepts as arguments.
 */
export const Category = {
  /**
   * Forms `Formula`, accepts `Formula`.
   *
   * Truth-functional connective, propositional variable, propositional constant and quantifier.
   */
  FF: 'FF',
  /**
   * Forms `Formula`, accepts `Term`.
   *
   * Predicate.
   */
  FT: 'FT',
  /**
   * Forms `Term`, accepts `Term`.
   *
   * Individual variable and function variable.
   */
  TT: 'TT',
  /**
   * Forms `Term`, accepts `Formula`.
   *
   * Reserved for definite descriptions.
   */
  TF: 'TF',
}

const precedence = {
  [Category.FF]: 0,
  [Category.FT]: 1,
  [Category.TT]: 2,
  [Category.TF]: 3
}

export const order = (c1, c2) => precedence[c1] - precedence[c2]
