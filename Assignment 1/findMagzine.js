const XLSX = require('xlsx');

const magzines = XLSX.readFile('./data/magzines.xlsx');
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

if (!process.argv[2] || !process.argv[3]) {
  const info = [
    {
      command: "node findMagzine.js -i 'isbn'",
      Result: 'Find magzine by isbn',
    },
    {
      command: 'node findMagzine.js -e authors-email',
      Result: 'Find magzine by email',
    },
  ];
  console.table(info);
} else if (process.argv[2] === '-i') {
  const res = [];
  for (let i = 0; i < s1.length; i++) {
    if (s1[i].isbn === process.argv[3]) {
      console.table(s1[i]);
      break;
    } else if (i === s1.length - 1) {
      console.log('No result found');
    }
  }
} else if (process.argv[2] === '-e') {
  const res = [];
  for (let i = 0; i < s1.length; i++) {
    if (s1[i].authors === process.argv[3]) {
      console.table(s1[i]);
      break;
    } else if (i === s1.length - 1) {
      console.log('No result found');
    }
  }
} else {
  const info = [
    {
      command: "node findMagzine.js -i 'isbn'",
      Result: 'Find magzine by isbn',
    },
    {
      command: 'node findMagzine.js -e authors-email',
      Result: 'Find magzine by email',
    },
  ];
  console.table(info);
}
