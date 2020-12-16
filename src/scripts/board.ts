// import u from '@/scripts/utils.ts'

interface Board {
  a1: string | null, b1: string | null, c1: string | null,
  a2: string | null, b2: string | null, c2: string | null,
  a3: string | null, b3: string | null, c3: string | null,
}
interface Move {
  marker: string, position: string
}

// TODO: define type `marker` as single-character string | null,
// Update Board and Move to user markers

const board = {
  getEmptyStateString: () => {
    return '---------'
  },

  getEmptyStateArray: () => {
    return [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ]
  },

  getEmptyStateObject: () => {
    return {
      a1: null, b1: null, c1: null,
      a2: null, b2: null, c2: null,
      a3: null, b3: null, c3: null,
    }
  },

  analyzeStateObject: (state: String) => {
    if (state.length !== 9) {
      return `Invalid state: expected 9 characters, got ${state.length}`
    }

    let countX = 0
    let countO = 0
    let countEmpty = 0

    for (const i in state) {
      if ( !['_', 'x', 'o'].includes(state[i]) ) {
        return `Invalid state: found unexpected character ${state[i]}`
      }

      if (state[i] === 'x') {countX++}
      if (state[i] === 'o') {countO++}
      if (state[i] === '_') {countEmpty++}
    }

    // Based on the assumption that x plays first
    if (countEmpty === 0) {
      return 'Unplayable state: the board is full already!'
    }
    if (countX !== countO && countX !== countO + 1) {
      return 'Invalid state: invalid distribution of marks on the board'
    }

    // TODO: check to make sure no finished lines exist on the board
    // depend on a detectWin function

    // TODO: return nicer error strings, such as:
    // state_too_short
    // state_too_long
    // state_anomalous
    // game_over

    return null
  },

  detectGameEnd: (s: Board) => {
    // if a win is found, return the marker that forms the win
    if (s.a1 && s.a1 === s.b1 && s.a1 === s.c1) { return s.a1 } // row1  
    if (s.a2 && s.a2 === s.b2 && s.a2 === s.c2) { return s.a2 } // row2    
    if (s.a3 && s.a3 === s.b3 && s.a3 === s.c3) { return s.a3 } // row3
    if (s.a1 && s.a1 === s.a2 && s.a1 === s.a3) { return s.a1 } // columnA 
    if (s.b1 && s.b1 === s.b2 && s.b1 === s.b3) { return s.b1 } // columnB 
    if (s.c1 && s.c1 === s.c2 && s.c1 === s.c3) { return s.c1 } // columnC   
    if (s.a3 && s.a3 === s.b2 && s.a3 === s.c1) { return s.a3 } // diagUp  
    if (s.a1 && s.a1 === s.b2 && s.a1 === s.c3) { return s.a1 } // diagDown
    
    let stateArray = [s.a1, s.b1, s.c1, s.a2, s.b2, s.c2, s.a3, s.b3, s.c3]
    let emptySpaces = stateArray.some(x => x === null)
    if (!emptySpaces) {
      return 'tie'
    }

    return null;
  },

  hydrate: (moves: Move[]) => {
    let state = {
      a1: null, b1: null, c1: null,
      a2: null, b2: null, c2: null,
      a3: null, b3: null, c3: null,
    };

    moves.forEach((m: Move) => {
      // @ts-ignore
      state[m.position] = m.marker
    });

    return state;
  }
}

export default board
