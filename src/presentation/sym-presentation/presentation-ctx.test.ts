import { is, Map, OrderedMap } from 'immutable'
import { Sym } from '../../abstract-structures/sym'
import { Category } from '../../abstract-structures/sym/category'
import { Entries } from '../../utils'
import { groupByCategory, PresentationCtx } from './presentation-ctx'
import { SymPresentation } from './sym-presentation'
import { SyntacticInfo } from './syntactic-info'

test('groupByCategory', () => {
    const ffSym1 = Sym.ff({ id: 7 })
    const ffSym2 = Sym.ff({ id: 6 })
    const ftSym1 = Sym.ft({ id: 3 })
    const ftSym2 = Sym.ft({ id: 0 })
    const ttSym1 = Sym.tt({ id: 8 })
    const ttSym2 = Sym.tt({ id: 1 })
    const tfSym1 = Sym.tf({ id: 4 })
    const tfSym2 = Sym.tf({ id: 5 })

    const ffSym1Presentation = new SymPresentation({ ascii: SyntacticInfo.prefix('ffSym1') })
    const ffSym2Presentation = new SymPresentation({ ascii: SyntacticInfo.prefix('ffSym2') })
    const ftSym1Presentation = new SymPresentation({ ascii: SyntacticInfo.prefix('ftSym1') })
    const ftSym2Presentation = new SymPresentation({ ascii: SyntacticInfo.prefix('ftSym2') })
    const ttSym1Presentation = new SymPresentation({ ascii: SyntacticInfo.prefix('ttSym1') })
    const ttSym2Presentation = new SymPresentation({ ascii: SyntacticInfo.prefix('ttSym2') })
    const tfSym1Presentation = new SymPresentation({ ascii: SyntacticInfo.prefix('tfSym1') })
    const tfSym2Presentation = new SymPresentation({ ascii: SyntacticInfo.prefix('tfSym2') })

    const presentationCtx: PresentationCtx = Map([
        [ttSym1, ttSym1Presentation],
        [ffSym2, ffSym2Presentation],
        [tfSym1, tfSym1Presentation],
        [ttSym2, ttSym2Presentation],
        [ffSym1, ffSym1Presentation],
        [ftSym1, ftSym1Presentation],
        [tfSym2, tfSym2Presentation],
        [ftSym2, ftSym2Presentation]
    ] as Entries<Sym, SymPresentation>)

    const expected = OrderedMap<Category, PresentationCtx>([
        [
            Category.FF,
            OrderedMap<Sym, SymPresentation>([
                [ffSym2, ffSym2Presentation],
                [ffSym1, ffSym1Presentation]
            ] as Entries<Sym, SymPresentation>)
        ],
        [
            Category.FT,
            OrderedMap<Sym, SymPresentation>([
                [ftSym2, ftSym2Presentation],
                [ftSym1, ftSym1Presentation]
            ] as Entries<Sym, SymPresentation>)
        ],
        [
            Category.TT,
            OrderedMap<Sym, SymPresentation>([
                [ttSym2, ttSym2Presentation],
                [ttSym1, ttSym1Presentation]
            ] as Entries<Sym, SymPresentation>)
        ],
        [
            Category.TF,
            OrderedMap<Sym, SymPresentation>([
                [tfSym1, tfSym1Presentation],
                [tfSym2, tfSym2Presentation]
            ] as Entries<Sym, SymPresentation>)
        ]
    ] as Entries<Category, PresentationCtx>)

    const actual = groupByCategory(presentationCtx)

    expect(is(expected, actual)).toBe(true)
})
