console.log('Hello, World!');

// knightMoves([0,0],[1,2]) == [[0,0],[1,2]]
// knightMoves([0,0],[3,3]) == [[0,0],[1,2],[3,3]]
// knightMoves([3,3],[0,0]) == [[3,3],[1,2],[0,0]]

const isLegit = (position) => {
  const board = [0, 1, 2, 3, 4, 5, 6, 7];
  return board.indexOf(position[0]) > -1 && board.indexOf(position[1] > -1);
};

const move = (current, moves) => [current[0] + moves[0], current[1] + moves[1]];

const possibleMoves = (current) => {
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

  return table.filter((possibility) => isLegit(move(current, possibility))).map((possibility) => move(current, possibility));
};

const moveNear = (current, target) => {
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
  // e.g. current = [0,0], target = [7,7] => distance = [7,7]
  const distance = [target[0] - current[0], target[1] - current[1]];
  // and base on that possible moves will be [2,1] and [1,2]
};

const knightMoves = (start, end) => {
  if (!isLegit(start) || !isLegit(end)) {
    return 'Invalid move';
  }
};
