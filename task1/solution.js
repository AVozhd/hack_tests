const fs = require("fs");
const path = require("path");

process.stdin.resume();
process.stdin.setEncoding("utf-8");

let inputString = "";
let currentLine = 0;

process.stdin.on("data", inputStdin => {
  inputString += inputStdin;
});

process.stdin.on("end", _ => {
  inputString = inputString
    .replace(/\s*$/, "")
    .split("\n")
    .map(str => str.replace(/\s*$/, ""));

  main();
});

let readLine = () => inputString[currentLine++];

const MAX_NUMBER = 10000;

const isEven = n => n % 2 === 0;

const isPrime = num => {
  if (num === 2) return true;
  if (num > 2 && isEven(num)) return false;
  if (num < 2 && num > MAX_NUMBER) return false;
  for (let i = 3; i < num; i++) {
    if (num % i === 0) return false;
  }
  return true;
};

// Complete the getPrimes function below.
function* getPrimes(n) {
  for (let i = 2; i <= n; i++) {
    if (isPrime(i)) yield i;
  }
}

let main = () => {
  const ws = fs.createWriteStream(
    process.env.OUTPUT_PATH || path.resolve(__dirname, "output.txt")
  );

  const n = parseInt(readLine(), 10);

  let res = [];
  let gen = getPrimes(n);

  console.time();
  for (let i = 0; i < n; i++) {
    let val = gen.next().value;
    if (val == undefined) break;
    res.push(val);
  }
  console.timeEnd();

  console.log(res);

  ws.write(res.join("\n") + "\n");

  ws.end();
};
