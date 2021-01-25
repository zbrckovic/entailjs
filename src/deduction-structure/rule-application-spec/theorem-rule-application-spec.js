import _ from 'lodash'
import { Rule } from '../rule'

// Contains all information necessary to apply the theorem rule against a deduction.
// TODO: needs more work when theorem handling is developed
export const TheoremRuleApplicationSpec = ({
  // Identifier of the theorem in a project.
  theoremId,
  theorem
}) => _.create(TheoremRuleApplicationSpec.prototype, { rule: Rule.Theorem, theoremId, theorem })

_.assign(TheoremRuleApplicationSpec.prototype, {
  constructor: TheoremRuleApplicationSpec
})
