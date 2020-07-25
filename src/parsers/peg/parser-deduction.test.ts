import { parseDeduction } from '.'
import { RuleAbbreviation } from '../../deduction-structure/rule'
import { Placement } from '../../presentation/sym-presentation/placement'
import { AstDeduction } from './ast-deduction'

test('parse()', () => {
    const text = `
        (1) E[y] A[x] F(x, y)                           / P;
    1   (2) A[x] F(x, a)                                / EI 1;
    1   (3) F(b, a)                                     / UI 2;
    1   (4) E[y] F(b, y)                                / EG 3;
    1   (5) A[x] E[y] F(x, y)                           / UG 4;
        (6) E[y] A[x] F(x, y) -> A[x] E[y] F(x, y)      / D 1, 5;
    `

    const expected: AstDeduction = {
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
                    rule: RuleAbbreviation.P,
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
                    rule: RuleAbbreviation.EI,
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
                    rule: RuleAbbreviation.UI,
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
                    rule: RuleAbbreviation.EG,
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
                    rule: RuleAbbreviation.UG,
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
                    rule: RuleAbbreviation.D,
                    premises: [1, 5]
                }
            }
        ]
    }

    const actual = parseDeduction(text)

    expect(actual).toEqual(expected)
})
