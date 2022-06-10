"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var XLSX = require('xlsx');

var books = XLSX.readFile('./data/books.xlsx');
var magzines = XLSX.readFile('./data/magzines.xlsx');
var workSheet = books.Sheets[books.SheetNames[0]];
var data = XLSX.utils.sheet_to_json(workSheet);
var s1 = [];

var _loop = function _loop(i) {
  var keys = Object.keys(data[i]).join('').split(';');
  keys.pop();
  var values = Object.values(data[i]).join('').split(';');
  values.pop();
  var result = Object.assign.apply({}, keys.map(function (v, i) {
    return _defineProperty({}, v, values[i]);
  }));
  s1.push(result);
};

for (var i = 0; i < data.length; i++) {
  _loop(i);
}

workSheet = magzines.Sheets[magzines.SheetNames[0]];
data = XLSX.utils.sheet_to_json(workSheet);

var _loop2 = function _loop2(_i) {
  var keys = Object.keys(data[_i]).join('').split(';');
  keys.pop();
  var values = Object.values(data[_i]).join('').split(';');
  values.pop();
  var result = Object.assign.apply({}, keys.map(function (v, i) {
    return _defineProperty({}, v, values[i]);
  }));
  s1.push(result);
};

for (var _i = 0; _i < data.length; _i++) {
  _loop2(_i);
}

console.log('Before sort:');
console.table(s1);
s1.sort(function (a, b) {
  return a.title.localeCompare(b.title);
});
console.log('After sort:');
console.table(s1);