"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var XLSX = require('xlsx');

var inquirer = require('inquirer');

var books = XLSX.readFile('./data/books.xlsx');
var magzines = XLSX.readFile('./data/magzines.xlsx'); // Add book to existing data:

if (process.argv[2] === '-b') {
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

  var questions = [{
    type: 'input',
    name: 'title',
    message: 'Enter book title:'
  }, {
    type: 'input',
    name: 'isbn',
    message: 'Enter ISBN:'
  }, {
    type: 'input',
    name: 'authors',
    message: 'Enter Author email:'
  }];
  inquirer.prompt(questions).then(function (answers) {
    var temp = {};
    temp['title'] = answers.title;
    temp['isbn'] = answers.isbn;
    temp['authors'] = answers.authors;
    s1.push(temp); // Generate new file:

    var newWorkBook = XLSX.utils.book_new();
    var newWorkSheet = XLSX.utils.json_to_sheet(s1);
    XLSX.utils.book_append_sheet(newWorkBook, newWorkSheet, 'Sheet1');
    XLSX.writeFile(newWorkBook, 'newBooks.xlsx');
  });
} // Display magzines:
else if (process.argv[2] === '-m') {
    var _workSheet = magzines.Sheets[magzines.SheetNames[0]];

    var _data = XLSX.utils.sheet_to_json(_workSheet);

    var _s = [];

    var _loop2 = function _loop2(_i) {
      var keys = Object.keys(_data[_i]).join('').split(';');
      var values = Object.values(_data[_i]).join('').split(';');
      var result = Object.assign.apply({}, keys.map(function (v, i) {
        return _defineProperty({}, v, values[i]);
      }));

      _s.push(result);
    };

    for (var _i = 0; _i < _data.length; _i++) {
      _loop2(_i);
    }

    var _questions = [{
      type: 'input',
      name: 'title',
      message: 'Enter magzine title:'
    }, {
      type: 'input',
      name: 'isbn',
      message: 'Enter ISBN:'
    }, {
      type: 'input',
      name: 'authors',
      message: 'Enter Author email:'
    }, {
      type: 'input',
      name: 'publishedAt',
      message: 'Publish date:'
    }];
    inquirer.prompt(_questions).then(function (answers) {
      var temp = {};
      temp['title'] = answers.title;
      temp['isbn'] = answers.isbn;
      temp['authors'] = answers.authors;
      temp['publishedAt'] = answers.publishedAt;

      _s.push(temp); // Generate new file:


      var newWorkBook = XLSX.utils.book_new();
      var newWorkSheet = XLSX.utils.json_to_sheet(_s);
      XLSX.utils.book_append_sheet(newWorkBook, newWorkSheet, 'Sheet1');
      XLSX.writeFile(newWorkBook, 'newMagzine.xlsx');
    });
  } else {
    var info = [{
      command: 'node display.js -m',
      display: 'Add new magzine'
    }, {
      command: 'node display.js -b',
      display: 'Add new book'
    }];
    console.table(info);
  }