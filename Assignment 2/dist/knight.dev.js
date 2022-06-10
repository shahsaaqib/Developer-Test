"use strict";

var prompt = require('prompt-sync')();

var n = 8;
var m = 8; // To calculate possible moves

function findPossibleMoves(mat, p, q) {
  // All possible moves of a knight
  var X = [2, 1, -1, -2, -2, -1, 1, 2];
  var Y = [1, 2, 2, 1, -1, -2, -2, -1];
  var count = 0;
  var res = []; // Check if each possible move is valid or not

  for (var i = 0; i < 8; i++) {
    // Position of knight after move
    var x = p + X[i];
    var y = q + Y[i]; // count and display valid moves

    if (x >= 0 && y >= 0 && x < n && y < m && p >= 0 && q >= 0 && p < n && q < m && mat[x][y] === 0) {
      var temp = {};
      count++;
      temp.moves = "".concat(x, ",").concat(y);
      temp.count = count;
      res.push(temp);
    }
  } // Display moves and count


  console.table(res);
}

var mat = Array(m).fill().map(function () {
  return Array(n).fill(0);
});
console.log('Enter cordinates from 0-7');
var p = Number(prompt('Enter X-coordinate of knight: '));
var q = Number(prompt('Enter y-coordinate of knight: '));
findPossibleMoves(mat, p, q);