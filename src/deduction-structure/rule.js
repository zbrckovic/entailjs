// Fixed set of rule names/identifiers available in deduction.
export const Rule = {
  // BASE RULES:
  Premise: 'Premise',
  Deduction: 'Deduction', // also ConditionalIntroduction
  TautologicalImplication: 'TautologicalImplication',
  UniversalInstantiation: 'UniversalInstantiation',
  UniversalGeneralization: 'UniversalGeneralization',
  ExistentialInstantiation: 'ExistentialInstantiation',
  ExistentialGeneralization: 'ExistentialGeneralization',
  Theorem: 'Theorem',

  // ADDITIONAL RULES FOR PROPOSITIONAL LOGIC
  // Rules of negation:
  NegationIntroduction: 'NegationIntroduction',
  DoubleNegationElimination: 'DoubleNegationElimination',
  WeakNegationElimination: 'WeakNegationElimination',

  // Rules of conditional:
  ConditionalElimination: 'ConditionalElimination',

  // Rules of conjunction:
  ConjunctionIntroduction: 'ConjunctionIntroduction',
  ConjunctionElimination: 'ConjunctionElimination',

  // Rules of disjunction:
  DisjunctionIntroduction: 'DisjunctionIntroduction',
  DisjunctionElimination: 'DisjunctionElimination',

  // Rules of biconditional:
  BiconditionalIntroduction: 'BiconditionalIntroduction',
  BiconditionalElimination: 'BiconditionalElimination'
}

export const getAbbreviation = rule => ruleToAbbreviation[rule]
export const getRule = abbreviation => abbreviationToRule[abbreviation]

const ruleToAbbreviation = {
  // Base rules:
  [Rule.Premise]: 'P',
  [Rule.Deduction]: 'D',
  [Rule.TautologicalImplication]: 'TI',
  [Rule.UniversalInstantiation]: 'UI',
  [Rule.UniversalGeneralization]: 'UG',
  [Rule.ExistentialInstantiation]: 'EI',
  [Rule.ExistentialGeneralization]: 'EG',
  [Rule.Theorem]: 'T',

  // Rules of negation:
  [Rule.NegationIntroduction]: 'NEG+',
  [Rule.WeakNegationElimination]: 'NEG-',
  [Rule.DoubleNegationElimination]: 'NEG--',

  // Rules of conditional:
  [Rule.ConditionalElimination]: 'IF-',

  // Rules of conjunction:
  [Rule.ConjunctionIntroduction]: 'AND+',
  [Rule.DisjunctionElimination]: 'AND-',

  // Rules of disjunction:
  [Rule.DisjunctionIntroduction]: 'OR+',
  [Rule.DisjunctionElimination]: 'OR-',

  // Rules of biconditional:
  [Rule.BiconditionalIntroduction]: 'IFF+',
  [Rule.BiconditionalElimination]: 'IFF-'
}

const abbreviationToRule = {
  P: Rule.Premise,
  D: Rule.Deduction,
  TI: Rule.TautologicalImplication,
  UI: Rule.UniversalInstantiation,
  UG: Rule.UniversalGeneralization,
  EI: Rule.ExistentialInstantiation,
  EG: Rule.ExistentialGeneralization,
  T: Rule.Theorem,
  'IF-': Rule.ConditionalElimination,
  'NEG+': Rule.NegationIntroduction,
  'NEG-': Rule.WeakNegationElimination,
  'NEG--': Rule.DoubleNegationElimination,
  'AND+': Rule.ConjunctionIntroduction,
  'AND-': Rule.ConditionalElimination,
  'OR+': Rule.DisjunctionIntroduction,
  'OR-': Rule.DisjunctionElimination,
  'IFF+': Rule.BiconditionalIntroduction,
  'IFF-': Rule.BiconditionalElimination
}
