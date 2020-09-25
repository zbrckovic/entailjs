import { startDeduction } from '../deduction-interface'

// TODO: needs more work when theorem handling is developed
export const TheoremRuleInterface = deduction => ({ apply: () => startDeduction(deduction) })
