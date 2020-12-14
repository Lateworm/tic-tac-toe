import board from '@/scripts/board.ts'

let ai = 'o';
let human = 'x';

const minimax = (state: any, depth: Number, isMaximizing: Boolean) => {
  // TODO: `any` typing needs upgrayedd
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
      if (state[n] === null) {
        const nBoard = Object.assign({}, state)
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
      if (state[n] === null) {
        const nBoard = Object.assign({}, state)
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
  getMove: (board: any) => {
    // TODO: type this properly
    let bestScore = -Infinity;
    let move;

    for (const n in board) {
      if (board[n] === null) {
        const nBoard = Object.assign({}, board)
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