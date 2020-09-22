import { startDeduction } from '../deduction-interface'

export const TheoremRuleInterface = deduction => ({ apply: () => startDeduction(deduction) })
