import { parseDeduction } from '.'
import { Placement } from '../../presentation/sym-presentation'
import { Rule, getAbbreviation } from '../../deduction-structure'

test('parse()', () => {
  const text = `
        (1) Ey Ax Fxy              / P;
    1   (2) Ax Fxa                 / E- 1;
    1   (3) Fba                    / A- 2;
    1   (4) Ey Fby                 / E+ 3;
    1   (5) Ax Ey Fxy              / A+ 4;
        (6) Ey Ax Fxy -> Ax Ey Fxy / IF+ 1, 5;
    `

  const expected = {
    steps: [
      {
        assumptions: [],
        formula: {
          sym: 'E',
          symPlacement: Placement.Prefix,
          boundSym: 'y',
          children: [
            {
              sym: 'A',
              symPlacement: Placement.Prefix,
              boundSym: 'x',
              children: [
                {
                  sym: 'F',
                  symPlacement: Placement.Prefix,
                  boundSym: undefined,
                  children: [
                    {
                      sym: 'x',
                      symPlacement: Placement.Prefix,
                      boundSym: undefined,
                      children: []
                    },
                    {
                      sym: 'y',
                      symPlacement: Placement.Prefix,
                      boundSym: undefined,
                      children: []
                    }
                  ]
                }
              ]
            }
          ]
        },
        ordinal: 1,
        ruleApplicationSummary: {
          rule: getAbbreviation(Rule.Premise),
          premises: []
        }
      },
      {
        assumptions: [1],
        formula: {
          sym: 'A',
          symPlacement: Placement.Prefix,
          boundSym: 'x',
          children: [
            {
              sym: 'F',
              symPlacement: Placement.Prefix,
              boundSym: undefined,
              children: [
                {
                  sym: 'x',
                  symPlacement: Placement.Prefix,
                  boundSym: undefined,
                  children: []
                },
                {
                  sym: 'a',
                  symPlacement: Placement.Prefix,
                  boundSym: undefined,
                  children: []
                }
              ]
            }
          ]
        },
        ordinal: 2,
        ruleApplicationSummary: {
          rule: getAbbreviation(Rule.ExistentialInstantiation),
          premises: [1]
        }
      },
      {
        assumptions: [1],
        formula: {
          sym: 'F',
          symPlacement: Placement.Prefix,
          boundSym: undefined,
          children: [
            {
              sym: 'b',
              symPlacement: Placement.Prefix,
              boundSym: undefined,
              children: []
            },
            {
              sym: 'a',
              symPlacement: Placement.Prefix,
              boundSym: undefined,
              children: []
            }
          ]
        },
        ordinal: 3,
        ruleApplicationSummary: {
          rule: getAbbreviation(Rule.UniversalInstantiation),
          premises: [2]
        }
      },
      {
        assumptions: [1],
        formula: {
          sym: 'E',
          symPlacement: Placement.Prefix,
          boundSym: 'y',
          children: [
            {
              sym: 'F',
              symPlacement: Placement.Prefix,
              boundSym: undefined,
              children: [
                {
                  sym: 'b',
                  symPlacement: Placement.Prefix,
                  boundSym: undefined,
                  children: []
                },
                {
                  sym: 'y',
                  symPlacement: Placement.Prefix,
                  boundSym: undefined,
                  children: []
                }
              ]
            }
          ]
        },
        ordinal: 4,
        ruleApplicationSummary: {
          rule: getAbbreviation(Rule.ExistentialGeneralization),
          premises: [3]
        }
      },
      {
        assumptions: [1],
        formula: {
          sym: 'A',
          symPlacement: Placement.Prefix,
          boundSym: 'x',
          children: [
            {
              sym: 'E',
              symPlacement: Placement.Prefix,
              boundSym: 'y',
              children: [
                {
                  sym: 'F',
                  symPlacement: Placement.Prefix,
                  boundSym: undefined,
                  children: [
                    {
                      sym: 'x',
                      symPlacement: Placement.Prefix,
                      boundSym: undefined,
                      children: []
                    },
                    {
                      sym: 'y',
                      symPlacement: Placement.Prefix,
                      boundSym: undefined,
                      children: []
                    }
                  ]
                }
              ]
            }
          ]
        },
        ordinal: 5,
        ruleApplicationSummary: {
          rule: getAbbreviation(Rule.UniversalGeneralization),
          premises: [4]
        }
      },
      {
        assumptions: [],
        formula: {
          sym: '->',
          symPlacement: Placement.Infix,
          boundSym: undefined,
          children: [
            {
              sym: 'E',
              symPlacement: Placement.Prefix,
              boundSym: 'y',
              children: [
                {
                  sym: 'A',
                  symPlacement: Placement.Prefix,
                  boundSym: 'x',
                  children: [
                    {
                      sym: 'F',
                      symPlacement: Placement.Prefix,
                      boundSym: undefined,
                      children: [
                        {
                          sym: 'x',
                          symPlacement: Placement.Prefix,
                          boundSym: undefined,
                          children: []
                        },
                        {
                          sym: 'y',
                          symPlacement: Placement.Prefix,
                          boundSym: undefined,
                          children: []
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              sym: 'A',
              symPlacement: Placement.Prefix,
              boundSym: 'x',
              children: [
                {
                  sym: 'E',
                  symPlacement: Placement.Prefix,
                  boundSym: 'y',
                  children: [
                    {
                      sym: 'F',
                      symPlacement: Placement.Prefix,
                      boundSym: undefined,
                      children: [
                        {
                          sym: 'x',
                          symPlacement: Placement.Prefix,
                          boundSym: undefined,
                          children: []
                        },
                        {
                          sym: 'y',
                          symPlacement: Placement.Prefix,
                          boundSym: undefined,
                          children: []
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
        ordinal: 6,
        ruleApplicationSummary: {
          rule: getAbbreviation(Rule.ConditionalIntroduction),
          premises: [1, 5]
        }
      }
    ]
  }

  const actual = parseDeduction(text)

  expect(actual).toEqual(expected)
})
