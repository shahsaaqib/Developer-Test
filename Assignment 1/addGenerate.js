const XLSX = require('xlsx');
const inquirer = require('inquirer');

const books = XLSX.readFile('./data/books.xlsx');
const magzines = XLSX.readFile('./data/magzines.xlsx');

// Add book to existing data:
if (process.argv[2] === '-b') {
  const workSheet = books.Sheets[books.SheetNames[0]];

  const data = XLSX.utils.sheet_to_json(workSheet);

  const s1 = [];

  for (let i = 0; i < data.length; i++) {
    const keys = Object.keys(data[i]).join('').split(';');
    keys.pop();
    const values = Object.values(data[i]).join('').split(';');
    values.pop();
    const result = Object.assign.apply(
      {},
      keys.map((v, i) => ({ [v]: values[i] }))
    );
    s1.push(result);
  }

  const questions = [
    {
      type: 'input',
      name: 'title',
      message: 'Enter book title:',
    },
    {
      type: 'input',
      name: 'isbn',
      message: 'Enter ISBN:',
    },
    {
      type: 'input',
      name: 'authors',
      message: 'Enter Author email:',
    },
  ];

  inquirer.prompt(questions).then((answers) => {
    const temp = {};
    temp['title'] = answers.title;
    temp['isbn'] = answers.isbn;
    temp['authors'] = answers.authors;
    s1.push(temp);

    // Generate new file:
    const newWorkBook = XLSX.utils.book_new();
    const newWorkSheet = XLSX.utils.json_to_sheet(s1);
    XLSX.utils.book_append_sheet(newWorkBook, newWorkSheet, 'Sheet1');
    XLSX.writeFile(newWorkBook, 'newBooks.xlsx');
  });
}

// Display magzines:
else if (process.argv[2] === '-m') {
  const workSheet = magzines.Sheets[magzines.SheetNames[0]];

  const data = XLSX.utils.sheet_to_json(workSheet);

  const s1 = [];

  for (let i = 0; i < data.length; i++) {
    const keys = Object.keys(data[i]).join('').split(';');
    const values = Object.values(data[i]).join('').split(';');
    const result = Object.assign.apply(
      {},
      keys.map((v, i) => ({ [v]: values[i] }))
    );
    s1.push(result);
  }

  const questions = [
    {
      type: 'input',
      name: 'title',
      message: 'Enter magzine title:',
    },
    {
      type: 'input',
      name: 'isbn',
      message: 'Enter ISBN:',
    },
    {
      type: 'input',
      name: 'authors',
      message: 'Enter Author email:',
    },
    {
      type: 'input',
      name: 'publishedAt',
      message: 'Publish date:',
    },
  ];

  inquirer.prompt(questions).then((answers) => {
    const temp = {};
    temp['title'] = answers.title;
    temp['isbn'] = answers.isbn;
    temp['authors'] = answers.authors;
    temp['publishedAt'] = answers.publishedAt;
    s1.push(temp);

    // Generate new file:
    const newWorkBook = XLSX.utils.book_new();
    const newWorkSheet = XLSX.utils.json_to_sheet(s1);
    XLSX.utils.book_append_sheet(newWorkBook, newWorkSheet, 'Sheet1');
    XLSX.writeFile(newWorkBook, 'newMagzine.xlsx');
  });
} else {
  const info = [
    { command: 'node display.js -m', display: 'Add new magzine' },
    { command: 'node display.js -b', display: 'Add new book' },
  ];
  console.table(info);
}
