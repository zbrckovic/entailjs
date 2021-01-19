import { isDeepEqual } from './utils'

expect.extend({
  toDeepEqual (received, other) {
    const pass = isDeepEqual(received, other)

    return {
      message: () => `expected ${received} to be equal to ${other}`,
      pass
    }
  }
})
