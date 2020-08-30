import { is, List, Map, OrderedSet, Set } from 'immutable'
import { Deduction, Rule } from '../../deduction-structure'
import { RegularRuleApplicationSummary } from '../../deduction-structure/rule-application-summary'
import { Step } from '../../deduction-structure/step'
import { TermDependencyGraph } from '../../deduction-structure/term-dependency-graph'
import { TermDependencies } from '../../deduction-structure/term-dependency-graph/term-dependencies'
import { primitivePresentationCtx } from '../../presentation/sym-presentation'
import { FormulaParser } from '../formula-parser'
import { DeductionParser } from './deduction-parser'

let parser
beforeEach(() => { parser = new DeductionParser(primitivePresentationCtx) })

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

  const formulaParser = new FormulaParser(parser.presentationCtx)

  const expected = new Deduction({
    steps: List.of(
      new Step({
        formula: formulaParser.parse('E[y] A[x] F(x, y)'),
        ruleApplicationSummary: new RegularRuleApplicationSummary({
          rule: Rule.Premise
        })
      }),
      new Step({
        assumptions: Set.of(0),
        formula: formulaParser.parse('A[x] F(x, a)'),
        ruleApplicationSummary: new RegularRuleApplicationSummary({
          rule: Rule.ExistentialInstantiation,
          premises: OrderedSet.of(0),
          termDependencies: new TermDependencies({
            dependent: formulaParser.getSym('a')
          })
        })
      }),
      new Step({
        assumptions: Set.of(0),
        formula: formulaParser.parse('F(b, a)'),
        ruleApplicationSummary: new RegularRuleApplicationSummary({
          rule: Rule.UniversalInstantiation,
          premises: OrderedSet.of(1)
        })
      }),
      new Step({
        assumptions: Set.of(0),
        formula: formulaParser.parse('E[y] F(b, y) '),
        ruleApplicationSummary: new RegularRuleApplicationSummary({
          rule: Rule.ExistentialGeneralization,
          premises: OrderedSet.of(2)
        })
      }),
      new Step({
        assumptions: Set.of(0),
        formula: formulaParser.parse('A[x] E[y] F(x, y) '),
        ruleApplicationSummary: new RegularRuleApplicationSummary({
          rule: Rule.UniversalGeneralization,
          premises: OrderedSet.of(3),
          termDependencies: new TermDependencies({
            dependent: formulaParser.getSym('b')
          })
        })
      }),
      new Step({
        assumptions: Set.of(),
        formula: formulaParser.parse('E[y] A[x] F(x, y) -> A[x] E[y] F(x, y)'),
        ruleApplicationSummary: new RegularRuleApplicationSummary({
          rule: Rule.Deduction,
          premises: OrderedSet.of(0, 4)
        })
      })
    ),
    termDependencyGraph: new TermDependencyGraph({
      dependencies: Map([
        [formulaParser.getSym('a'), Set()],
        [formulaParser.getSym('b'), Set()]
      ])
    })
  })

  expect(is(actual, expected)).toBe(true)
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

  const formulaParser = new FormulaParser(parser.presentationCtx)

  const expected = new Deduction({
    steps: List.of(
      new Step({
        formula: formulaParser.parse('A[x] (F(x) -> G(x))'),
        ruleApplicationSummary: new RegularRuleApplicationSummary({
          rule: Rule.Premise
        })
      }),
      new Step({
        formula: formulaParser.parse('A[x] (G(x) -> H(x))'),
        ruleApplicationSummary: new RegularRuleApplicationSummary({
          rule: Rule.Premise
        })
      }),
      new Step({
        formula: formulaParser.parse('E[x] F(x)'),
        ruleApplicationSummary: new RegularRuleApplicationSummary({
          rule: Rule.Premise
        })
      }),
      new Step({
        formula: formulaParser.parse('F(a)'),
        ruleApplicationSummary: new RegularRuleApplicationSummary({
          rule: Rule.ExistentialInstantiation,
          premises: OrderedSet.of(2),
          termDependencies: new TermDependencies({
            dependent: formulaParser.getSym('a')
          })
        }),
        assumptions: Set.of(2)
      }),
      new Step({
        formula: formulaParser.parse('F(a) -> G(a)'),
        ruleApplicationSummary: new RegularRuleApplicationSummary({
          rule: Rule.UniversalInstantiation,
          premises: OrderedSet.of(0)
        }),
        assumptions: Set.of(0)
      }),
      new Step({
        formula: formulaParser.parse('G(a) -> H(a)'),
        ruleApplicationSummary: new RegularRuleApplicationSummary({
          rule: Rule.UniversalInstantiation,
          premises: OrderedSet.of(1)
        }),
        assumptions: Set.of(1)
      }),
      new Step({
        formula: formulaParser.parse('H(a)'),
        ruleApplicationSummary: new RegularRuleApplicationSummary({
          rule: Rule.TautologicalImplication,
          premises: OrderedSet.of(3, 4, 5)
        }),
        assumptions: Set.of(0, 1, 2)
      }),
      new Step({
        formula: formulaParser.parse('E[x] H(x)'),
        ruleApplicationSummary: new RegularRuleApplicationSummary({
          rule: Rule.ExistentialGeneralization,
          premises: OrderedSet.of(6)
        }),
        assumptions: Set.of(0, 1, 2)
      }),
      new Step({
        formula: formulaParser.parse('E[x] F(x) -> E[x] H(x)'),
        ruleApplicationSummary: new RegularRuleApplicationSummary({
          rule: Rule.Deduction,
          premises: OrderedSet.of(2, 7)
        }),
        assumptions: Set.of(0, 1)
      }),
      new Step({
        formula: formulaParser.parse('A[x] (G(x) -> H(x)) -> (E[x] F(x) -> E[x] H(x))'),
        ruleApplicationSummary: new RegularRuleApplicationSummary({
          rule: Rule.Deduction,
          premises: OrderedSet.of(1, 8)
        }),
        assumptions: Set.of(0)
      }),
      new Step({
        formula: formulaParser.parse(
          'A[x] (F(x) -> G(x)) -> (A[x] (G(x) -> H(x)) -> (E[x] F(x) -> E[x] H(x)))'
        ),
        ruleApplicationSummary: new RegularRuleApplicationSummary({
          rule: Rule.Deduction,
          premises: OrderedSet.of(0, 9)
        })
      })
    ),
    termDependencyGraph: new TermDependencyGraph({
      dependencies: Map([
        [formulaParser.getSym('a'), Set()]
      ])
    })
  })

  expect(is(actual, expected)).toBe(true)
})
