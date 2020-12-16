import board from '@/scripts/board.ts'

interface Board {
  a1: string | null, b1: string | null, c1: string | null,
  a2: string | null, b2: string | null, c2: string | null,
  a3: string | null, b3: string | null, c3: string | null,
}
// TODO: Board is defined in more than one file
// Can we extract interfaces to a shared file to enforce consistency?


let ai = 'o';
let human = 'x';

const minimax = (state: Board, depth: Number, isMaximizing: Boolean) => {
  let scores = {
    x: -100,
    o: 100,
    tie: 0
  };

  let result = board.detectGameEnd(state);
  if (result !== null) {
    // @ts-ignore
    return scores[result];
  }

  if (isMaximizing) {
    let bestScore = -Infinity

    for (const n in state) {
      // @ts-ignore
      if (state[n] === null) {
        const nBoard = Object.assign({}, state)
        // @ts-ignore
        nBoard[n] = ai
        // @ts-ignore
        let score = minimax(nBoard, depth +1, false);
        bestScore = Math.max(score, bestScore);
      }
    }

    return bestScore;
  } else {
    let bestScore = Infinity;

    for (const n in state) {
      // @ts-ignore
      if (state[n] === null) {
        const nBoard = Object.assign({}, state)
        // @ts-ignore
        nBoard[n] = human
        // @ts-ignore
        let score = minimax(nBoard, depth +1, true);
        bestScore = Math.min(score, bestScore);
      }
    }

    return bestScore
  }
}

const bot = {
  getMove: (board: Board) => {
    // TODO: type this properly
    let bestScore = -Infinity;
    let move;

    for (const n in board) {
      // @ts-ignore
      if (board[n] === null) {
        const nBoard = Object.assign({}, board)
        // @ts-ignore
        nBoard[n] = ai
        let score = minimax(nBoard, 0, false);
        if (score > bestScore) {
          bestScore = score;
          move = n
        }
      }
    }
    
    return move;
  }
}

export default bot
