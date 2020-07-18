import { Deduction } from 'deduction-structure'
import { Rule } from 'deduction-structure/rule'
import { RegularRuleApplicationSummary } from 'deduction-structure/rule-application-summary'
import { Step } from 'deduction-structure/step'
import { TermDependencyGraph } from 'deduction-structure/term-dependency-graph'
import { TermDependencies } from 'deduction-structure/term-dependency-graph/term-dependencies'
import { is, List, Map, OrderedSet, Set } from 'immutable'
import { DeductionParser } from 'parsers/deduction-parser/deduction-parser'
import { FormulaParser } from 'parsers/formula-parser'
import { primitivePresentationCtx } from 'presentation/sym-presentation/primitive-presentation-ctx'

let parser: DeductionParser
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
                [formulaParser.getSym('a')!, Set()],
                [formulaParser.getSym('b')!, Set()]
            ])
        })
    })

    expect(is(actual, expected)).toBe(true)
})
