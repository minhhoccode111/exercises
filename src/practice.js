console.log('Hello, World!');

// knightMoves([0,0],[1,2]) == [[0,0],[1,2]]
// knightMoves([0,0],[3,3]) == [[0,0],[1,2],[3,3]]
// knightMoves([3,3],[0,0]) == [[3,3],[1,2],[0,0]]

const isLegit = (arr) => {
  const board = [0, 1, 2, 3, 4, 5, 6, 7];
  return arr.every((cell) => board.indexOf(cell) > -1);
};

const knightMoves = (start, end) => {
  if (!isLegit(start) || !isLegit(end)) {
    return 'Invalid move';
  }
};
