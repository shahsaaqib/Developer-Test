"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var XLSX = require('xlsx');

var books = XLSX.readFile('./data/books.xlsx');
var workSheet = books.Sheets[books.SheetNames[0]];
var data = XLSX.utils.sheet_to_json(workSheet);
var s1 = [];

var _loop = function _loop(i) {
  var keys = Object.keys(data[i]).join('').split(';');
  var values = Object.values(data[i]).join('').split(';');
  var result = Object.assign.apply({}, keys.map(function (v, i) {
    return _defineProperty({}, v, values[i]);
  }));
  s1.push(result);
};

for (var i = 0; i < data.length; i++) {
  _loop(i);
}

if (!process.argv[2] || !process.argv[3]) {
  var info = [{
    command: "node findBook.js -i 'isbn'",
    Result: 'Find book by isbn'
  }, {
    command: 'node findBook.js -e authors-email',
    Result: 'Find book by email'
  }];
  console.table(info);
} else if (process.argv[2] === '-i') {
  var res = [];

  for (var _i = 0; _i < s1.length; _i++) {
    if (s1[_i].isbn === process.argv[3]) {
      console.log(s1[_i]);
      break;
    } else if (_i === s1.length - 1) {
      console.log('No result found');
    }
  }
} else if (process.argv[2] === '-e') {
  var _res = [];

  for (var _i2 = 0; _i2 < s1.length; _i2++) {
    if (s1[_i2].authors === process.argv[3]) {
      console.log(s1[_i2]);
      break;
    } else if (_i2 === s1.length - 1) {
      console.log('No result found');
    }
  }
} else {
  var _info = [{
    command: "node findBook.js -i 'isbn'",
    Result: 'Find book by isbn'
  }, {
    command: 'node findBook.js -e authors-email',
    Result: 'Find book by email'
  }];
  console.table(_info);
}