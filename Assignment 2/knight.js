const prompt = require('prompt-sync')();

const n = 8;
const m = 8;

// To calculate possible moves
function findPossibleMoves(mat, p, q) {
  // All possible moves of a knight
  const X = [2, 1, -1, -2, -2, -1, 1, 2];
  const Y = [1, 2, 2, 1, -1, -2, -2, -1];

  let count = 0;
  const res = [];
  // Check if each possible move is valid or not
  for (let i = 0; i < 8; i++) {
    // Position of knight after move
    const x = p + X[i];
    const y = q + Y[i];

    // count and display valid moves
    if (
      x >= 0 &&
      y >= 0 &&
      x < n &&
      y < m &&
      p >= 0 &&
      q >= 0 &&
      p < n &&
      q < m &&
      mat[x][y] === 0
    ) {
      const temp = {};
      count++;
      temp.moves = `${x},${y}`;
      temp.count = count;
      res.push(temp);
    }
  }

  // Display moves and count
  console.table(res);
}

const mat = Array(m)
  .fill()
  .map(() => Array(n).fill(0));

console.log('Enter cordinates from 0-7');
const p = Number(prompt('Enter X-coordinate of knight: '));
const q = Number(prompt('Enter y-coordinate of knight: '));

findPossibleMoves(mat, p, q);
