console.log('Hello, World!');

const isLegit = (position) => {
  const inBoard = [0, 1, 2, 3, 4, 5, 6, 7];
  return inBoard.indexOf(position[0]) > -1 && inBoard.indexOf(position[1]) > -1;
};

const table = {
  knight: [
    [2, 1],
    [1, 2],
    [-2, 1],
    [2, -1],
    [-1, 2],
    [1, -2],
    [-1, -2],
    [-2, -1],
  ],
  king: [
    [1, 1],
    [-1, -1],
    [1, 0],
    [-1, 0],
    [-1, 1],
    [0, 1],
    [0, -1],
    [1, -1],
  ],
  queen: [
    // cross
    [1, 1],
    [2, 2],
    [3, 3],
    [4, 4],
    [5, 5],
    [6, 6],
    [7, 7],
    [1, -1],
    [2, -2],
    [3, -3],
    [4, -4],
    [5, -5],
    [6, -6],
    [7, -7],
    [-1, 1],
    [-2, 2],
    [-3, 3],
    [-4, 4],
    [-5, 5],
    [-6, 6],
    [-7, 7],
    [-1, -1],
    [-2, -2],
    [-3, -3],
    [-4, -4],
    [-5, -5],
    [-6, -6],
    [-7, -7],
    // straight
    [1, 0],
    [2, 0],
    [3, 0],
    [4, 0],
    [5, 0],
    [6, 0],
    [7, 0],
    [-1, 0],
    [-2, 0],
    [-3, 0],
    [-4, 0],
    [-5, 0],
    [-6, 0],
    [-7, 0],
    [0, 1],
    [0, 2],
    [0, 3],
    [0, 4],
    [0, 5],
    [0, 6],
    [0, 7],
    [0, -1],
    [0, -2],
    [0, -3],
    [0, -4],
    [0, -5],
    [0, -6],
    [0, -7],
  ],
  rook: [
    [1, 0],
    [2, 0],
    [3, 0],
    [4, 0],
    [5, 0],
    [6, 0],
    [7, 0],
    [-1, 0],
    [-2, 0],
    [-3, 0],
    [-4, 0],
    [-5, 0],
    [-6, 0],
    [-7, 0],
    [0, 1],
    [0, 2],
    [0, 3],
    [0, 4],
    [0, 5],
    [0, 6],
    [0, 7],
    [0, -1],
    [0, -2],
    [0, -3],
    [0, -4],
    [0, -5],
    [0, -6],
    [0, -7],
  ],
  bishop: [
    [1, 1],
    [2, 2],
    [3, 3],
    [4, 4],
    [5, 5],
    [6, 6],
    [7, 7],
    [1, -1],
    [2, -2],
    [3, -3],
    [4, -4],
    [5, -5],
    [6, -6],
    [7, -7],
    [-1, 1],
    [-2, 2],
    [-3, 3],
    [-4, 4],
    [-5, 5],
    [-6, 6],
    [-7, 7],
    [-1, -1],
    [-2, -2],
    [-3, -3],
    [-4, -4],
    [-5, -5],
    [-6, -6],
    [-7, -7],
  ],
};

// KNIGHTS TRAVAILS
const moves = (start, end, type) => {
  const possibleMoves = table[type];
  const [endRow, endCol] = end; // extract
  const visited = []; // store visited
  const queue = [];
  const startNode = { position: start, path: [start] };
  queue.push(startNode);

  let index = 0;
  while (queue[index]) {
    const { position, path } = queue[index];
    const [row, col] = position;
    index++;
    visited.push(position.toString());
    if (row === endRow && col === endCol) return path;
    for (let i = 0; i < possibleMoves.length; i++) {
      const possibleMovesRow = possibleMoves[i][0] + row;
      const possibleMovesCol = possibleMoves[i][1] + col;
      const possiblePosition = [possibleMovesRow, possibleMovesCol];
      // if move is legit and not visited yet
      if (isLegit(possiblePosition) && visited.indexOf(possiblePosition.toString()) < 0) {
        const node = { position: possiblePosition, path: [...path, possiblePosition] };
        queue.push(node);
      }
    }
  }
  return [[`Can't go there`]];
};

// knight travails
const knightMoves = moves([0, 0], [7, 7], 'knight');
console.log(knightMoves);
// [0, 0], [2, 1], [4, 2], [6, 3], [7, 5], [5, 6], [7, 7];

// king travails
const kingMoves = moves([0, 0], [7, 7], 'king');
console.log(kingMoves);
// [0, 0], [1, 1], [2, 2], [3, 3], [4, 4], [5, 5], [6, 6], [7, 7];

// queen travails
const queenMoves = moves([0, 0], [7, 7], 'queen');
console.log(queenMoves);
// [0, 0], [7, 7]

// bishop travails
const bishopMoves = moves([0, 0], [7, 7], 'bishop');
console.log(bishopMoves);
// [0, 0], [7, 7]

// rook travails
const rookMoves = moves([0, 0], [7, 7], 'rook');
console.log(rookMoves);
// [0, 0], [7, 0], [7, 7];
