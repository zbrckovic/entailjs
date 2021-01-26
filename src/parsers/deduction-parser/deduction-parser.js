import stampit from '@stamp/it'
import { Base } from '../../utils'
import { parseDeduction } from '../peg'
import { AstProcessor } from './ast-processor'

export const DeductionParser = stampit({
  name: 'DeductionParser',
  init ({ syms, presentations }) {
    this.astProcessor = AstProcessor({ syms, presentations })
  },
  methods: {
    parse (text) {
      const ast = parseDeduction(text)
      return this.astProcessor.process(ast)
    },
    getSym (text) { return this.astProcessor.getSym(text) },
    getSyms () { return this.astProcessor.getSyms() },
    getPresentations () { return this.astProcessor.getPresentations() },
    getTextToSymMap () { return this.astProcessor.getTextToSymMap() },
    getMaxSymId () { return this.astProcessor.getMaxSymId() }
  }
}).compose(Base)
