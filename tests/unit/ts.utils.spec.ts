const assert = require('assert')
import utils from '@/scripts/utils.ts'

describe('utils.ts', () => {
  describe('equal', () => {
    it('returns true if all elements are equal', () => {
      let result = utils.equal(['x', 'x', 'x'])
      assert.equal(result, true)

      result = utils.equal([1, 1, 1])
      assert.equal(result, true)
    })

    it('returns false if not all elements are equal', () => {
      let result = utils.equal(['x', 'x', 'o'])
      assert.equal(result, false)

      result = utils.equal([1, 1, '1'])
      assert.equal(result, false)
    })
  })
})