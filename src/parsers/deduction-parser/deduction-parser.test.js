import { Deduction, Rule } from '../../deduction-structure'
import { RegularRuleApplicationSummary, Step } from '../../deduction-structure/step'
import { TermDependencyGraph } from '../../deduction-structure/term-dependency-graph'
import { primitivePresentations } from '../../presentation/sym-presentation'
import { primitiveSyms } from '../../primitive-syms'
import { FormulaParser } from '../formula-parser'
import { DeductionParser } from './deduction-parser'

let parser
beforeEach(() => {
  parser = DeductionParser({
    syms: primitiveSyms,
    presentations: primitivePresentations
  })
})

test('parse()', () => {
  const text = `
        (1) Ey Ax Fxy              / P;
    1   (2) Ax Fxa                 / EI 1;
    1   (3) Fba                    / UI 2;
    1   (4) Ey Fby                 / EG 3;
    1   (5) Ax Ey Fxy              / UG 4;
        (6) Ey Ax Fxy -> Ax Ey Fxy / D 1, 5;
    `

  const actual = parser.parse(text)

  const formulaParser = FormulaParser({
    syms: parser.getSyms(),
    presentations: parser.getPresentations()
  })

  const expected = Deduction({
    steps: [
      Step({
        formula: formulaParser.parse('Ey Ax Fxy'),
        ruleApplicationSummary: RegularRuleApplicationSummary({ rule: Rule.Premise })
      }),
      Step({
        assumptions: new Set([0]),
        formula: formulaParser.parse('Ax Fxa'),
        ruleApplicationSummary: RegularRuleApplicationSummary({
          rule: Rule.ExistentialInstantiation,
          premises: [0],
          addedTermDependencies: {
            dependent: formulaParser.getSym('a').id,
            dependencies: new Set()
          }
        })
      }),
      Step({
        assumptions: new Set([0]),
        formula: formulaParser.parse('Fba'),
        ruleApplicationSummary: RegularRuleApplicationSummary({
          rule: Rule.UniversalInstantiation,
          premises: [1]
        })
      }),
      Step({
        assumptions: new Set([0]),
        formula: formulaParser.parse('Ey Fby '),
        ruleApplicationSummary: RegularRuleApplicationSummary({
          rule: Rule.ExistentialGeneralization,
          premises: [2]
        })
      }),
      Step({
        assumptions: new Set([0]),
        formula: formulaParser.parse('Ax Ey Fxy '),
        ruleApplicationSummary: RegularRuleApplicationSummary({
          rule: Rule.UniversalGeneralization,
          premises: [3],
          addedTermDependencies: {
            dependent: formulaParser.getSym('b').id,
            dependencies: new Set()
          }
        })
      }),
      Step({
        assumptions: new Set(),
        formula: formulaParser.parse('Ey Ax Fxy -> Ax Ey Fxy'),
        ruleApplicationSummary: RegularRuleApplicationSummary({
          rule: Rule.Deduction,
          premises: [0, 4]
        })
      })
    ],
    termDependencyGraph: TermDependencyGraph({
      [formulaParser.getSym('a').id]: new Set(),
      [formulaParser.getSym('b').id]: new Set()
    })
  })

  expect(actual).toEqual(expected)
})

test('parse()', () => {
  const text = `
          (1)  Ax (Fx -> Gx)                                        / P;
          (2)  Ax (Gx -> Hx)                                        / P;
          (3)  Ex F(x)                                              / P;
        3 (4)  Fa                                                   / EI 3;
        1 (5)  Fa -> Ga                                             / UI 1;
        2 (6)  Ga -> Ha                                             / UI 2;
    1,2,3 (7)  Ha                                                     / TI 4,5,6;
    1,2,3 (8)  Ex Hx                                                / EG 7;
      1,2 (9)  Ex Fx -> Ex Hx                                       / D 3, 8;
        1 (10) Ax (Gx -> Hx) -> (Ex Fx -> Ex Hx)                    / D 2, 9;
          (11) Ax (Fx -> Gx) -> (Ax (Gx -> Hx) -> (Ex Fx -> Ex Hx)) / D 1, 10; 
    `

  const actual = parser.parse(text)

  const formulaParser = FormulaParser({
    syms: parser.getSyms(),
    presentations: parser.getPresentations()
  })

  const expected = Deduction({
    steps: [
      Step({
        formula: formulaParser.parse('Ax (Fx -> Gx)'),
        ruleApplicationSummary: RegularRuleApplicationSummary({ rule: Rule.Premise })
      }),
      Step({
        formula: formulaParser.parse('Ax (Gx -> Hx)'),
        ruleApplicationSummary: RegularRuleApplicationSummary({ rule: Rule.Premise })
      }),
      Step({
        formula: formulaParser.parse('Ex Fx'),
        ruleApplicationSummary: new RegularRuleApplicationSummary({ rule: Rule.Premise })
      }),
      Step({
        formula: formulaParser.parse('Fa'),
        ruleApplicationSummary: RegularRuleApplicationSummary({
          rule: Rule.ExistentialInstantiation,
          premises: [2],
          addedTermDependencies: {
            dependent: formulaParser.getSym('a').id,
            dependencies: new Set()
          }
        }),
        assumptions: new Set([2])
      }),
      Step({
        formula: formulaParser.parse('Fa -> Ga'),
        ruleApplicationSummary: RegularRuleApplicationSummary({
          rule: Rule.UniversalInstantiation,
          premises: [0]
        }),
        assumptions: new Set([0])
      }),
      Step({
        formula: formulaParser.parse('Ga -> Ha'),
        ruleApplicationSummary: RegularRuleApplicationSummary({
          rule: Rule.UniversalInstantiation,
          premises: [1]
        }),
        assumptions: new Set([1])
      }),
      Step({
        formula: formulaParser.parse('Ha'),
        ruleApplicationSummary: RegularRuleApplicationSummary({
          rule: Rule.TautologicalImplication,
          premises: [3, 4, 5]
        }),
        assumptions: new Set([0, 1, 2])
      }),
      Step({
        formula: formulaParser.parse('Ex Hx'),
        ruleApplicationSummary: RegularRuleApplicationSummary({
          rule: Rule.ExistentialGeneralization,
          premises: [6]
        }),
        assumptions: new Set([0, 1, 2])
      }),
      Step({
        formula: formulaParser.parse('Ex Fx -> Ex Hx'),
        ruleApplicationSummary: RegularRuleApplicationSummary({
          rule: Rule.Deduction,
          premises: [2, 7]
        }),
        assumptions: new Set([0, 1])
      }),
      Step({
        formula: formulaParser.parse('Ax (Gx -> Hx) -> (Ex Fx -> Ex Hx)'),
        ruleApplicationSummary: RegularRuleApplicationSummary({
          rule: Rule.Deduction,
          premises: [1, 8]
        }),
        assumptions: new Set([0])
      }),
      Step({
        formula: formulaParser.parse(
          'Ax (Fx -> Gx) -> (Ax (Gx -> Hx) -> (Ex Fx -> Ex Hx))'
        ),
        ruleApplicationSummary: RegularRuleApplicationSummary({
          rule: Rule.Deduction,
          premises: [0, 9]
        })
      })
    ],
    termDependencyGraph: TermDependencyGraph({
      [formulaParser.getSym('a').id]: new Set()
    })
  })

  expect(actual).toEqual(expected)
})
