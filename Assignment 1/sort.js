const XLSX = require('xlsx');

const books = XLSX.readFile('./data/books.xlsx');
const magzines = XLSX.readFile('./data/magzines.xlsx');

let workSheet = books.Sheets[books.SheetNames[0]];

let data = XLSX.utils.sheet_to_json(workSheet);

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

workSheet = magzines.Sheets[magzines.SheetNames[0]];

data = XLSX.utils.sheet_to_json(workSheet);

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
console.log('Before sort:');
console.table(s1);

s1.sort((a, b) => a.title.localeCompare(b.title));

console.log('After sort:');
console.table(s1);
