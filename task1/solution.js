const fs = require("fs");

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

// Complete the getPrimes function below.
function getPrimes(n) {}

let main = () => {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const n = parseInt(readLine(), 10);

  let res = [];
  let gen = getPrimes(n);

  for (let i = 0; i < n; i++) {
    let val = gen.next().value;
    if (val == undefined) break;
    res.push(val);
  }

  ws.write(res.join("\n") + "\n");

  ws.end();
};
