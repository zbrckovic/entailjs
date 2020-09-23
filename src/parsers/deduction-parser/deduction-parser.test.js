import { Deduction, Rule } from '../../deduction-structure'
import { RegularRuleApplicationSummary } from '../../deduction-structure/rule-application-summary'
import { Step } from '../../deduction-structure/step'
import { TermDependencyGraph } from '../../deduction-structure/term-dependency-graph'
import { primitivePresentationCtx } from '../../presentation/sym-presentation'
import { primitiveSyms } from '../../primitive-syms'
import { FormulaParser } from '../formula-parser'
import { DeductionParser } from './deduction-parser'

let parser
beforeEach(() => {
  parser = DeductionParser({
    syms: primitiveSyms, presentationCtx: primitivePresentationCtx
  })
})

test('parse()', () => {
  const text = `
        (1) E[y] A[x] F(x, y)                           / P;
    1   (2) A[x] F(x, a)                                / EI 1;
    1   (3) F(b, a)                                     / UI 2;
    1   (4) E[y] F(b, y)                                / EG 3;
    1   (5) A[x] E[y] F(x, y)                           / UG 4;
        (6) E[y] A[x] F(x, y) -> A[x] E[y] F(x, y)      / D 1, 5;
    `

  const actual = parser.parse(text)

  const formulaParser = FormulaParser({
    syms: parser.syms,
    presentationCtx: parser.presentationCtx
  })

  const expected = Deduction({
    steps: [
      Step({
        formula: formulaParser.parse('E[y] A[x] F(x, y)'),
        ruleApplicationSummary: RegularRuleApplicationSummary({ rule: Rule.Premise })
      }),
      Step({
        assumptions: new Set([0]),
        formula: formulaParser.parse('A[x] F(x, a)'),
        ruleApplicationSummary: RegularRuleApplicationSummary({
          rule: Rule.ExistentialInstantiation,
          premises: [0],
          termDependencies: {
            dependent: formulaParser.getSym('a').id
          }
        })
      }),
      Step({
        assumptions: new Set([0]),
        formula: formulaParser.parse('F(b, a)'),
        ruleApplicationSummary: RegularRuleApplicationSummary({
          rule: Rule.UniversalInstantiation,
          premises: [1]
        })
      }),
      Step({
        assumptions: new Set([0]),
        formula: formulaParser.parse('E[y] F(b, y) '),
        ruleApplicationSummary: RegularRuleApplicationSummary({
          rule: Rule.ExistentialGeneralization,
          premises: [2]
        })
      }),
      Step({
        assumptions: new Set([0]),
        formula: formulaParser.parse('A[x] E[y] F(x, y) '),
        ruleApplicationSummary: RegularRuleApplicationSummary({
          rule: Rule.UniversalGeneralization,
          premises: [3],
          termDependencies: { dependent: formulaParser.getSym('b').id }
        })
      }),
      Step({
        assumptions: new Set(),
        formula: formulaParser.parse('E[y] A[x] F(x, y) -> A[x] E[y] F(x, y)'),
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
          (1)  A[x] (F(x) -> G(x))                                                      / P;
          (2)  A[x] (G(x) -> H(x))                                                      / P;
          (3)  E[x] F(x)                                                                / P;
        3 (4)  F(a)                                                                     / EI 3;
        1 (5)  F(a) -> G(a)                                                             / UI 1;
        2 (6)  G(a) -> H(a)                                                             / UI 2;
    1,2,3 (7)  H(a)                                                                     / TI 4,5,6;
    1,2,3 (8)  E[x] H(x)                                                                / EG 7;
      1,2 (9)  E[x] F(x) -> E[x] H(x)                                                   / D 3, 8;
        1 (10) A[x] (G(x) -> H(x)) -> (E[x] F(x) -> E[x] H(x))                          / D 2, 9;
          (11) A[x] (F(x) -> G(x)) -> (A[x] (G(x) -> H(x)) -> (E[x] F(x) -> E[x] H(x))) / D 1, 10; 
    `

  const actual = parser.parse(text)

  const formulaParser = FormulaParser({
    syms: parser.syms,
    presentationCtx: parser.presentationCtx
  })

  const expected = Deduction({
    steps: [
      Step({
        formula: formulaParser.parse('A[x] (F(x) -> G(x))'),
        ruleApplicationSummary: RegularRuleApplicationSummary({ rule: Rule.Premise })
      }),
      Step({
        formula: formulaParser.parse('A[x] (G(x) -> H(x))'),
        ruleApplicationSummary: RegularRuleApplicationSummary({ rule: Rule.Premise })
      }),
      Step({
        formula: formulaParser.parse('E[x] F(x)'),
        ruleApplicationSummary: new RegularRuleApplicationSummary({ rule: Rule.Premise })
      }),
      Step({
        formula: formulaParser.parse('F(a)'),
        ruleApplicationSummary: RegularRuleApplicationSummary({
          rule: Rule.ExistentialInstantiation,
          premises: [2],
          termDependencies: { dependent: formulaParser.getSym('a').id }
        }),
        assumptions: new Set([2])
      }),
      Step({
        formula: formulaParser.parse('F(a) -> G(a)'),
        ruleApplicationSummary: RegularRuleApplicationSummary({
          rule: Rule.UniversalInstantiation,
          premises: [0]
        }),
        assumptions: new Set([0])
      }),
      Step({
        formula: formulaParser.parse('G(a) -> H(a)'),
        ruleApplicationSummary: RegularRuleApplicationSummary({
          rule: Rule.UniversalInstantiation,
          premises: [1]
        }),
        assumptions: new Set([1])
      }),
      Step({
        formula: formulaParser.parse('H(a)'),
        ruleApplicationSummary: RegularRuleApplicationSummary({
          rule: Rule.TautologicalImplication,
          premises: [3, 4, 5]
        }),
        assumptions: new Set([0, 1, 2])
      }),
      Step({
        formula: formulaParser.parse('E[x] H(x)'),
        ruleApplicationSummary: RegularRuleApplicationSummary({
          rule: Rule.ExistentialGeneralization,
          premises: [6]
        }),
        assumptions: new Set([0, 1, 2])
      }),
      Step({
        formula: formulaParser.parse('E[x] F(x) -> E[x] H(x)'),
        ruleApplicationSummary: RegularRuleApplicationSummary({
          rule: Rule.Deduction,
          premises: [2, 7]
        }),
        assumptions: new Set([0, 1])
      }),
      Step({
        formula: formulaParser.parse('A[x] (G(x) -> H(x)) -> (E[x] F(x) -> E[x] H(x))'),
        ruleApplicationSummary: RegularRuleApplicationSummary({
          rule: Rule.Deduction,
          premises: [1, 8]
        }),
        assumptions: new Set([0])
      }),
      Step({
        formula: formulaParser.parse(
          'A[x] (F(x) -> G(x)) -> (A[x] (G(x) -> H(x)) -> (E[x] F(x) -> E[x] H(x)))'
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
