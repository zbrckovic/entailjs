import { Rule } from '../rule'

// Contains all information necessary to apply the theorem rule against a deduction.
export const TheoremRuleApplicationSpec = ({
  // Identifier of the theorem in a project.
  theoremId,
  theorem
}) => ({ rule: Rule.Theorem, theoremId, theorem })
