/**
 * Fixed set of rule names/identifiers available in deduction.
 */
export const Rule = {
  Premise: 'Premise',
  Deduction: 'Deduction',
  TautologicalImplication: 'TautologicalImplication',
  UniversalInstantiation: 'UniversalInstantiation',
  UniversalGeneralization: 'UniversalGeneralization',
  ExistentialInstantiation: 'ExistentialInstantiation',
  ExistentialGeneralization: 'ExistentialGeneralization',
  Theorem: 'Theorem'
}

export const RuleAbbreviation = {
  P: 'P',
  D: 'D',
  TI: 'TI',
  UI: 'UI',
  UG: 'UG',
  EI: 'EI',
  EG: 'EG',
  T: 'T'
}

export const getAbbreviation = rule => ruleToAbbreviation[rule]
export const getRule = abbreviation => abbreviationToRule[abbreviation]

const ruleToAbbreviation = {
  [Rule.Premise]: RuleAbbreviation.P,
  [Rule.Deduction]: RuleAbbreviation.D,
  [Rule.TautologicalImplication]: RuleAbbreviation.TI,
  [Rule.UniversalInstantiation]: RuleAbbreviation.UI,
  [Rule.UniversalGeneralization]: RuleAbbreviation.UG,
  [Rule.ExistentialInstantiation]: RuleAbbreviation.EI,
  [Rule.ExistentialGeneralization]: RuleAbbreviation.EG,
  [Rule.Theorem]: RuleAbbreviation.T
}

const abbreviationToRule = {
  [RuleAbbreviation.P]: Rule.Premise,
  [RuleAbbreviation.D]: Rule.Deduction,
  [RuleAbbreviation.TI]: Rule.TautologicalImplication,
  [RuleAbbreviation.UI]: Rule.UniversalInstantiation,
  [RuleAbbreviation.UG]: Rule.UniversalGeneralization,
  [RuleAbbreviation.EI]: Rule.ExistentialInstantiation,
  [RuleAbbreviation.EG]: Rule.ExistentialGeneralization,
  [RuleAbbreviation.T]: Rule.Theorem
}
