import { parseFormula } from '.'
import { Placement } from '../../presentation/sym-presentation'

test.each([
  [
    'Ex Fx -> Gx',
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
    'Ax Ey (Fxy -> ~Gyx)',
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
])('parse(\'%s\') is \'%j\'', (text, expected) => {
  const actual = parseFormula(text)
  expect(actual).toEqual(expected)
})

test.each([
  [
    'Ex F(x) -> G(x)',
    'Ex Fx -> Gx'
  ],
  [
    'Ax Ey (F(x, y) -> ~G(y, x))',
    'Ax Ey (Fxy -> ~Gyx)'
  ]
])('\'%s\' is the same as \'%s\'', (text1, text2) => {
  const formula1 = parseFormula(text1)
  const formula2 = parseFormula(text2)
  expect(formula1).toEqual(formula2)
})
