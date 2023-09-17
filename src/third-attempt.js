console.log('Hello, World!');

//

class Node {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.around = [];
  }
}

class Board {
  constructor() {
    this.board = [];
    // 2 nested loops to create 2-D array represented board
    for (let i = 0; i < 8; i++) {
      this.board.push([]);
      for (let j = 0; j < 8; j++) {
        this.board[i].push(new Node(i, j));
      }
    }

    // 2 nested loops to loop through each cell on board and set that node's around neighbors
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        this.aroundNodes(i, j);
      }
    }
  }

  aroundNodes(i, j) {
    const currentNode = this.board[i][j];
    const board = [0, 1, 2, 3, 4, 5, 6, 7];
    const table = [
      [2, 1],
      [2, -1],
      [1, 2],
      [1, -2],
      [-1, 2],
      [-1, -2],
      [-2, 1],
      [-2, -1],
    ];
    const arrOfNeighbors = table.filter((move) => board.indexOf(move[0] + i) > -1 && board.indexOf(move[1] + j) > -1).map((legal) => [legal[0] + i, legal[1] + j]);
    for (const neighbor of arrOfNeighbors) {
      const [row, col] = neighbor;
      const neighborNode = this.board[row][col];
      currentNode.around.push(neighborNode);
    }
  }
}

// start = [0,0], end = [7,7]
const knightMoves = (start, end) => {
  const board = new Board();
  //
};
