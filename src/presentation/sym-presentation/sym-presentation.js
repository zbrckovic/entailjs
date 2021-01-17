import _ from 'lodash'

// ASCII and unicode presentation of a symbol. ASCII presentation is intended to be used in plain
// text environments, while unicode is primarily intended for GUI and generated documents.
export const SymPresentation = ({ ascii, unicode }) => ({
  constructor: SymPresentation,

  ascii,
  unicode,

  get defaultSyntacticInfo() {
    return this.unicode ?? this.ascii
  },

  ...SymPresentation.methods
})
SymPresentation.methods = {
  createDescription(arity = 1) {
    return this.ascii.createDescription(arity)
  }
}

export const SyntacticInfo = ({ text, placement = Placement.Prefix }) => ({
  text,
  placement,
  ...SyntacticInfo.methods
})

SyntacticInfo.prefix = text => SyntacticInfo({ text, placement: Placement.Prefix })
SyntacticInfo.infix = text => SyntacticInfo({ text, placement: Placement.Infix })

SyntacticInfo.methods = {
  createDescription(arity = 1) {
    switch (this.placement) {
      case Placement.Prefix:
        return `${this.text}${_.repeat(' _', arity).join('')}`
      case Placement.Infix:
        return `_ ${this.text} _`
    }
  }
}

// Represents two different positions a symbol can occupy relative to another syntactic entity.
export const Placement = {
  Prefix: 'Prefix',
  Infix: 'Infix'
}
