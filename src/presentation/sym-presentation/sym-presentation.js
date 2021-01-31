import stampit from '@stamp/it'
import _ from 'lodash'
import { Base } from '../../utils'

// ASCII and unicode presentation of a symbol. ASCII presentation is intended to be used in plain
// text environments, while unicode is primarily intended for GUI and generated documents.
export const SymPresentation = stampit({
  name: 'SymPresentation',
  init ({ ascii, unicode }) {
    this.ascii = ascii
    this.unicode = unicode
  },
  methods: {
    getDefaultSyntacticInfo () {
      return this.unicode ?? this.ascii
    },
    createDescription (arity = 1) {
      return this.ascii.createDescription(arity)
    }
  }
}).compose(Base)

export const SyntacticInfo = stampit({
  name: 'SyntacticInfo',
  statics: {
    prefix (text) { return SyntacticInfo({ text, placement: Placement.Prefix }) },
    infix (text) { return SyntacticInfo({ text, placement: Placement.Infix }) }
  },
  init ({ text, placement = Placement.Prefix }) {
    this.text = text
    this.placement = placement
  },
  methods: {
    createDescription (arity = 1) {
      switch (this.placement) {
        case Placement.Prefix:
          return `${this.text}${_.repeat(' _', arity).join('')}`
        case Placement.Infix:
          return `_ ${this.text} _`
      }
    }
  }
}).compose(Base)

// Represents two different positions a symbol can occupy relative to another syntactic entity.
export const Placement = {
  Prefix: 'Prefix',
  Infix: 'Infix'
}
