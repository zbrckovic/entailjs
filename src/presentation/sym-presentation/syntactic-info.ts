import { Record, Repeat } from 'immutable'
import { Placement } from './placement'

export class SyntacticInfo extends Record<{
    text: string
    placement: Placement
}>({
    text: '',
    placement: Placement.Prefix
}, 'SyntacticInfo') {
    static prefix(text: string) { return new SyntacticInfo({ text }) }

    static infix(text: string) { return new SyntacticInfo({ text, placement: Placement.Infix }) }

    createDescription(arity = 1) {
        switch (this.placement) {
            case Placement.Prefix:
                return `${this.text}${Repeat(' _', arity).join('')}`
            case Placement.Infix:
                return `_ ${this.text} _`
        }
    }
}
