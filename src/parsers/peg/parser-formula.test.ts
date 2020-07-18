import { Placement } from 'presentation/sym-presentation/placement'
import { parseFormula } from '.'
import { AstFormula } from './ast-formula'

test.each<[string, AstFormula]>([
    [
        'E[x] F(x) -> G(x)',
        {
            sym: '->',
            symPlacement: Placement.Infix,
            children: [
                {
                    sym: 'E',
                    boundSym: 'x',
                    symPlacement: Placement.Prefix,
                    children: [
                        {
                            sym: 'F',
                            symPlacement: Placement.Prefix,
                            children: [
                                {
                                    sym: 'x',
                                    symPlacement: Placement.Prefix,
                                    children: []
                                }
                            ]
                        }
                    ]
                },
                {
                    sym: 'G',
                    symPlacement: Placement.Prefix,
                    children: [
                        {
                            sym: 'x',
                            symPlacement: Placement.Prefix,
                            children: []
                        }
                    ]
                }
            ]
        }
    ],
    [
        'F(f(x, y))',
        {
            sym: 'F',
            symPlacement: Placement.Prefix,
            children: [
                {
                    sym: 'f',
                    symPlacement: Placement.Prefix,
                    children: [
                        {
                            sym: 'x',
                            symPlacement: Placement.Prefix,
                            children: []
                        },
                        {
                            sym: 'y',
                            symPlacement: Placement.Prefix,
                            children: []
                        }
                    ]
                }
            ]
        }
    ],
    [
        'A[x] E[y] (F(x, y) -> ~G(y, x))',
        {
            sym: 'A',
            boundSym: 'x',
            symPlacement: Placement.Prefix,
            children: [
                {
                    sym: 'E',
                    boundSym: 'y',
                    symPlacement: Placement.Prefix,
                    children: [
                        {
                            sym: '->',
                            symPlacement: Placement.Infix,
                            children: [
                                {
                                    sym: 'F',
                                    symPlacement: Placement.Prefix,
                                    children: [
                                        {
                                            sym: 'x',
                                            symPlacement: Placement.Prefix,
                                            children: []
                                        },
                                        {
                                            sym: 'y',
                                            symPlacement: Placement.Prefix,
                                            children: []
                                        }
                                    ]
                                },
                                {
                                    sym: '~',
                                    symPlacement: Placement.Prefix,
                                    children: [
                                        {
                                            sym: 'G',
                                            symPlacement: Placement.Prefix,
                                            children: [
                                                {
                                                    sym: 'y',
                                                    symPlacement: Placement.Prefix,
                                                    children: []
                                                },
                                                {
                                                    sym: 'x',
                                                    symPlacement: Placement.Prefix,
                                                    children: []
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
])("parse('%s') is '%j'", (text: string, expected: AstFormula) => {
    const actual = parseFormula(text)
    expect(actual).toEqual(expected)
})
