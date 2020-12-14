const assert = require('assert')
import bot from '@/scripts/bot.ts'

describe('bot.ts', () => {
  describe('getMove', () => {
    it ('returns the best move', () => {
      assert.equal(bot.getMove({
        a1: null, b1: null, c1: null,
        a2: null, b2: null, c2: null,
        a3: 'x', b3: null, c3: null,
      }), 'b2')

      assert.equal(bot.getMove({
        a1: null, b1: null, c1: 'x',
        a2: null, b2: 'o',  c2: null,
        a3: 'x',  b3: null, c3: null,
      }), 'b1')
    })
  })
})
