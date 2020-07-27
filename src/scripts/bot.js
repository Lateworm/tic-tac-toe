import board from '@/scripts/board.js'

let ai = 'o';
let human = 'x';

const minimax = (state, depth, isMaximizing) => {
  let scores = {
    x: -100,
    o: 100,
    tie: 0
  };

  let result = board.detectGameEnd(state);
  if (result !== null) {
    return scores[result];
  }

  if (isMaximizing) {
    let bestScore = -Infinity

    for (const n in state) {
      if (state[n] === null) {
        const nBoard = Object.assign({}, state)
        nBoard[n] = ai
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
        let score = minimax(nBoard, depth +1, true);
        bestScore = Math.min(score, bestScore);
      }
    }

    return bestScore
  }
}

const bot = {
  getMove: (board) => {
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