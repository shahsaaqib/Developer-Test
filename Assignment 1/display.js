const XLSX = require('xlsx');

const authors = XLSX.readFile('./data/authors.xlsx');
const books = XLSX.readFile('./data/books.xlsx');
const magzines = XLSX.readFile('./data/magzines.xlsx');

// Display authors:
if (process.argv[2] === '-authors') {
  const workSheet = authors.Sheets[authors.SheetNames[0]];

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
  console.table(s1);
}

// Display books:
else if (process.argv[2] === '-books') {
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

  console.table(s1);
}

// Display magzines:
else if (process.argv[2] === '-magzines') {
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
  console.table(s1);
} else {
  const info = [
    { command: 'node display.js -authors', display: 'authors' },
    { command: 'node display.js -magzines', display: 'magzines' },
    { command: 'node display.js -books', display: 'books' },
  ];
  console.table(info);
}
