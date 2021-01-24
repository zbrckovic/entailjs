import _ from 'lodash'

// ASCII and unicode presentation of a symbol. ASCII presentation is intended to be used in plain
// text environments, while unicode is primarily intended for GUI and generated documents.
export const SymPresentation = ({ ascii, unicode }) => _.create(SymPresentation.prototype, {
  ascii,
  unicode
})

_.assign(SymPresentation.prototype, {
  constructor: SymPresentation,

  get defaultSyntacticInfo () {
    return this.unicode ?? this.ascii
  },

  createDescription (arity = 1) {
    return this.ascii.createDescription(arity)
  }
})

export const SyntacticInfo = ({ text, placement = Placement.Prefix }) =>
  _.create(SyntacticInfo.prototype, { text, placement })

_.assign(SyntacticInfo.prototype, {
  constructor: SyntacticInfo,

  createDescription (arity = 1) {
    switch (this.placement) {
      case Placement.Prefix:
        return `${this.text}${_.repeat(' _', arity).join('')}`
      case Placement.Infix:
        return `_ ${this.text} _`
    }
  }
})

SyntacticInfo.prefix = text => SyntacticInfo({ text, placement: Placement.Prefix })
SyntacticInfo.infix = text => SyntacticInfo({ text, placement: Placement.Infix })

// Represents two different positions a symbol can occupy relative to another syntactic entity.
export const Placement = {
  Prefix: 'Prefix',
  Infix: 'Infix'
}
