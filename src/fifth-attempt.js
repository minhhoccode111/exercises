console.log('Hello, World!');

//
const possibleMoves = [
  [2, 1],
  [1, 2],
  [-2, 1],
  [2, -1],
  [-1, 2],
  [1, -2],
  [-1, -2],
  [-2, -1],
];

const isLegit = (position) => {
  const inBoard = [0, 1, 2, 3, 4, 5, 6, 7];
  return inBoard.indexOf(position) > -1;
};

const knightMoves = (start, end) => {
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
      if (isLegit(possibleMovesRow) && isLegit(possibleMovesCol)) {
        const possiblePosition = [possibleMovesRow, possibleMovesCol];
        if (visited.indexOf(possiblePosition.toString()) > -1) continue; // if visited then ignore
        const node = { position: possiblePosition, path: [...path, possiblePosition] };
        queue.push(node);
      }
    }
  }

  return null;
};

knightMoves([0, 0], [7, 7]);
// knightMoves([0, 0], [1, 1]);
