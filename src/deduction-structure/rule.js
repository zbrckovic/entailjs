// Fixed set of rule names/identifiers available in deduction.
export const Rule = {
  Premise: 'Premise',
  Theorem: 'Theorem',

  TautologicalImplication: 'TautologicalImplication',

  NegationIntroduction: 'NegationIntroduction',
  DoubleNegationElimination: 'DoubleNegationElimination',

  WeakNegationElimination: 'WeakNegationElimination',

  Deduction: 'Deduction',
  ConditionalElimination: 'ConditionalElimination',

  ConjunctionIntroduction: 'ConjunctionIntroduction',
  ConjunctionElimination: 'ConjunctionElimination',

  DisjunctionIntroduction: 'DisjunctionIntroduction',
  DisjunctionElimination: 'DisjunctionElimination',

  BiconditionalIntroduction: 'BiconditionalIntroduction',
  BiconditionalElimination: 'BiconditionalElimination',

  UniversalGeneralization: 'UniversalGeneralization',
  UniversalInstantiation: 'UniversalInstantiation',
  ExistentialGeneralization: 'ExistentialGeneralization',
  ExistentialInstantiation: 'ExistentialInstantiation'
}

export const getAbbreviation = rule => ruleToAbbreviation[rule]
export const getRule = abbreviation => abbreviationToRule[abbreviation]

const ruleToAbbreviation = {
  [Rule.Premise]: 'P',
  [Rule.Theorem]: 'T',

  [Rule.TautologicalImplication]: 'TI',

  [Rule.NegationIntroduction]: 'NOT+',
  [Rule.DoubleNegationElimination]: 'NOT-',

  [Rule.Deduction]: 'IF+',
  [Rule.ConditionalElimination]: 'IF-',

  [Rule.ConjunctionIntroduction]: 'AND+',
  [Rule.DisjunctionElimination]: 'AND-',

  [Rule.DisjunctionIntroduction]: 'OR+',
  [Rule.DisjunctionElimination]: 'OR-',

  [Rule.BiconditionalIntroduction]: 'IFF+',
  [Rule.BiconditionalElimination]: 'IFF-',

  [Rule.WeakNegationElimination]: 'X',

  [Rule.UniversalInstantiation]: 'A-',
  [Rule.UniversalGeneralization]: 'A+',

  [Rule.ExistentialInstantiation]: 'E-',
  [Rule.ExistentialGeneralization]: 'E+'
}

const abbreviationToRule = {
  P: Rule.Premise,
  T: Rule.Theorem,

  TI: Rule.TautologicalImplication,

  'IF+': Rule.Deduction,
  'IF-': Rule.ConditionalElimination,

  'NOT+': Rule.NegationIntroduction,
  'NOT-': Rule.DoubleNegationElimination,

  'AND+': Rule.ConjunctionIntroduction,
  'AND-': Rule.ConditionalElimination,

  'OR+': Rule.DisjunctionIntroduction,
  'OR-': Rule.DisjunctionElimination,

  'IFF+': Rule.BiconditionalIntroduction,
  'IFF-': Rule.BiconditionalElimination,

  X: Rule.WeakNegationElimination,

  'A-': Rule.UniversalInstantiation,
  'A+': Rule.UniversalGeneralization,
  'E-': Rule.ExistentialInstantiation,
  'E+': Rule.ExistentialGeneralization
}
