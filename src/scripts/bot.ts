import board from '@/scripts/board.ts'

type Marker = 'x' | 'o' | null;
type Board = {
  a1: Marker, b1: Marker, c1: Marker,
  a2: Marker, b2: Marker, c2: Marker,
  a3: Marker, b3: Marker, c3: Marker,
};
// TODO: Marker and Board is defined in multiple places
// Can we extract types to a shared file to enforce consistency?

let ai = 'o';
let human = 'x';

const minimax = (state: Board, depth: Number, isMaximizing: Boolean): number => {
  let scores: {[key: string]: number} = {
    x: -100,
    o: 100,
    tie: 0
  };

  let result = board.detectGameEnd(state);
  if (result !== null) {
    return scores[result];
  }

  if (isMaximizing) {
    let bestScore = -Infinity;

    for (const n in state) {
      // @ts-ignore
      if (state[n] === null) {
        const nBoard = Object.assign({}, state);
        // @ts-ignore
        nBoard[n] = ai;
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
    let bestScore = -Infinity;
    let move;

    for (const n in board) {
      // @ts-ignore
      if (board[n] === null) {
        const nBoard = Object.assign({}, board)
        // @ts-ignore
        nBoard[n] = ai;
        let score = minimax(nBoard, 0, false);
        if (score > bestScore) {
          bestScore = score;
          move = n;
        }
      }
    }
    
    return move;
  }
}

export default bot;
