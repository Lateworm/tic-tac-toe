const assert = require('assert')
import board from '@/scripts/board.js'

describe('board.js', () => {
  describe('getEmptyStateString', () => {
    it('returns a string', () => {
      const result = board.getEmptyStateString()

      assert.equal(result, '---------')
    })
  })

  describe('getEmptyStateArray', () => {
    it('returns a nested array', () => {
      const result = board.getEmptyStateArray()

      assert.deepStrictEqual(
        result,
        [
          [null, null, null],
          [null, null, null],
          [null, null, null],
        ]
      )

    })
  })

  describe('getEmptyStateObject', () => {
    it('returns an object', () => {
      const result = board.getEmptyStateObject()

      assert.deepStrictEqual(
        result,
        {
          a1: null, b1: null, c1: null,
          a2: null, b2: null, c2: null,
          a3: null, b3: null, c3: null,
        }
      )
    })
  })

  describe('analyzeStateObject', () => {
    it('return an error if state is wrong length', () => {
      let result = board.analyzeStateObject('12345678')
      assert.equal(result, 'Invalid state: expected 9 characters, got 8')

      result = board.analyzeStateObject('1234567890')
      assert.equal(result, 'Invalid state: expected 9 characters, got 10')
    })

    it('returns an error if there are unusable characters', () => {
      let result = board.analyzeStateObject('123456789')
      assert.equal(result, 'Invalid state: found unexpected character 1')

      result = board.analyzeStateObject('xo_foobar')
      assert.equal(result, 'Invalid state: found unexpected character f')
    })

    it('returns an error if the game is already finished', () => {
      let result = board.analyzeStateObject('xoooxxxxo')
      assert.equal(result, 'Unplayable state: the board is full already!')
    })

    it("returns an error if the distribution of marks doesn't make sense", () => {
      let result = board.analyzeStateObject('oxxxoooo_')
      assert.equal(result, 'Invalid state: invalid distribution of marks on the board')
    })

    it('returns null if state is usable', () => {
      let result = board.analyzeStateObject('____x____')
      assert.equal(result, null)
    })

    // TODO: test passing state that contains a winning move
    // expect an error saying that the game has already been won
  })

  describe('detectGameEnd', () => {
    

    it('returns the winning marker if a win is found', () => {
      assert.equal(
        board.detectGameEnd({
          a1: 'q',  b1: 'q',  c1: 'q',
          a2: null, b2: null, c2: null,
          a3: null, b3: null, c3: null,
        }),
        'q'
      )

      assert.equal(
        board.detectGameEnd({
          a1: null, b1: null, c1: null,
          a2: 'w',  b2: 'w',  c2: 'w',
          a3: null, b3: null, c3: null,
        }),
        'w'
      )

      assert.equal(
        board.detectGameEnd({
          a1: null, b1: null, c1: null,
          a2: null, b2: null, c2: null,
          a3: 'e',  b3: 'e',  c3: 'e',
        }),
        'e'
      )

      assert.equal(
        board.detectGameEnd({
          a1: 'a', b1: null,  c1: null,
          a2: 'a', b2: null,  c2: null,
          a3: 'a', b3: null,  c3: null,
        }),
        'a'
      )

      assert.equal(
        board.detectGameEnd({
          a1: null, b1: 's',  c1: null,
          a2: null, b2: 's',  c2: null,
          a3: null, b3: 's',  c3: null,
        }),
        's'
      )

      assert.equal(
        board.detectGameEnd({
          a1: null, b1: null,  c1: 'd',
          a2: null, b2: null,  c2: 'd',
          a3: null, b3: null,  c3: 'd',
        }),
        'd'
      )

      assert.equal(
        board.detectGameEnd({
          a1: 'z',  b1: null, c1: null,
          a2: null, b2: 'z',  c2: null,
          a3: null, b3: null, c3: 'z',
        }),
        'z'
      )

      assert.equal(
        board.detectGameEnd({
          a1: null, b1: null, c1: 'c',
          a2: null, b2: 'c',  c2: null,
          a3: 'c',  b3: null, c3: null,
        }),
        'c'
      )

      assert.equal(
        board.detectGameEnd({
          a1: 'x', b1: 'o', c1: 'x',
          a2: 'x', b2: 'o', c2: 'o',
          a3: 'x', b3: 'x', c3: 'o',
        }),
        'x'
      )
    })
  })

  describe('hydrate', () => {
    it('returns the resulting board state', () => {
      let result = board.hydrate([
        { marker: 'x', position: 'a1'},
        { marker: 'o', position: 'b1'},
      ])

      assert.deepStrictEqual(
        result,
        {
          a1: 'x',  b1: 'o',  c1: null,
          a2: null, b2: null, c2: null,
          a3: null, b3: null, c3: null,
        }
      )
    })
  })
})