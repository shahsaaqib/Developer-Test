"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var XLSX = require('xlsx');

var authors = XLSX.readFile('./data/authors.xlsx');
var books = XLSX.readFile('./data/books.xlsx');
var magzines = XLSX.readFile('./data/magzines.xlsx'); // Display authors:

if (process.argv[2] === '-authors') {
  var workSheet = authors.Sheets[authors.SheetNames[0]];
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

  console.table(s1);
} // Display books:
else if (process.argv[2] === '-books') {
    var _workSheet = books.Sheets[books.SheetNames[0]];

    var _data = XLSX.utils.sheet_to_json(_workSheet);

    var _s = [];

    var _loop2 = function _loop2(_i) {
      var keys = Object.keys(_data[_i]).join('').split(';');
      keys.pop();
      var values = Object.values(_data[_i]).join('').split(';');
      values.pop();
      var result = Object.assign.apply({}, keys.map(function (v, i) {
        return _defineProperty({}, v, values[i]);
      }));

      _s.push(result);
    };

    for (var _i = 0; _i < _data.length; _i++) {
      _loop2(_i);
    }

    console.table(_s);
  } // Display magzines:
  else if (process.argv[2] === '-magzines') {
      var _workSheet2 = magzines.Sheets[magzines.SheetNames[0]];

      var _data2 = XLSX.utils.sheet_to_json(_workSheet2);

      var _s2 = [];

      var _loop3 = function _loop3(_i2) {
        var keys = Object.keys(_data2[_i2]).join('').split(';');
        var values = Object.values(_data2[_i2]).join('').split(';');
        var result = Object.assign.apply({}, keys.map(function (v, i) {
          return _defineProperty({}, v, values[i]);
        }));

        _s2.push(result);
      };

      for (var _i2 = 0; _i2 < _data2.length; _i2++) {
        _loop3(_i2);
      }

      console.table(_s2);
    } else {
      var info = [{
        command: 'node display.js -authors',
        display: 'authors'
      }, {
        command: 'node display.js -magzines',
        display: 'magzines'
      }, {
        command: 'node display.js -books',
        display: 'books'
      }];
      console.table(info);
    }