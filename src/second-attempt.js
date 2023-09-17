console.log('Hello, World!');

//

// knightMoves([0,0],[1,2]) == [[0,0],[1,2]]
// knightMoves([0,0],[3,3]) == [[0,0],[1,2],[3,3]]
// knightMoves([3,3],[0,0]) == [[3,3],[1,2],[0,0]]

class Node {
  constructor() {}
}

class BuildTree {
  constructor(start, end, board) {}
}

class Board {
  constructor() {
    this.board = [];
    for (let i = 0; i < 8; i++) {
      this.board.push([]);
      for (let j = 0; j < 8; j++) {
        this.board[i].push(0);
      }
    }
  }
  isFull() {
    return this.board.every((row) => row.every((col) => col !== 0));
  }

  set(row, col, val) {
    this.board[row][col] = val;
  }

  isInside(row, col) {
    return row > -1 && col > -1 && row < 8 && col < 8;
  }
}

const knightMoves = (start, end) => {};
