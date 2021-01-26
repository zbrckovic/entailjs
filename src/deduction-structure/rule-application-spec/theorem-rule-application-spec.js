import stampit from '@stamp/it'
import { Rule } from '../rule'

// Contains all information necessary to apply the theorem rule against a deduction.
// TODO: needs more work when theorem handling is developed
export const TheoremRuleApplicationSpec = stampit({
  name: 'TheoremRuleApplicationSpec',
  init ({
    // Identifier of the theorem in a project.
    theoremId,
    theorem
  }) {
    this.rule = Rule.Theorem
    this.theoremId = theoremId
    this.theorem = theorem
  }
})
