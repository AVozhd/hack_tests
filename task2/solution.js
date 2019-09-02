"use strict";

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
    .trim()
    .split("\n")
    .map(str => str.trim());

  main();
});

let readLine = () => inputString[currentLine++];

const AVAILABLE_SHAPES = ["square", "rectangle", "circle", "triangle"];
const PI = 3.14;

const checkShape = shape => AVAILABLE_SHAPES.includes(shape);

const validateShapes = shapes => {
  if (Array.isArray(shapes) && shapes.length > 0) {
    for (let shape of shapes) {
      if (!checkShape(shape)) return false;
    }
    return true;
  } else {
    return false;
  }
};

const checkArraysEqualLength = (firstArray, secondArray) =>
  Array.isArray(firstArray) &&
  Array.isArray(secondArray) &&
  firstArray.length === secondArray.length;

const toFixed = value => value.toFixed(2);
const getDoubled = value => value * value;
const normalize = value => parseFloat(value);

const getSquareArea = side => normalize(toFixed(getDoubled(side)));
const getRectangleArea = (width, length) => normalize(toFixed(width * length));
const getCircleArea = radius => normalize(toFixed(PI * getDoubled(radius)));
const getTriangleArea = (base, height) =>
  normalize(toFixed(0.5 * base * height));

// Complete the calculateArea function below.
// It returns a Promise which on success, returns area of the shape, and on failure returns [-1].
let calculateArea = (shape, values) =>
  new Promise((resolve, reject) => {
    switch (shape) {
      case "square":
        return resolve(getSquareArea(...values));
      case "rectangle":
        return resolve(getRectangleArea(...values));
      case "circle":
        return resolve(getCircleArea(...values));
      case "triangle":
        return resolve(getTriangleArea(...values));
      default:
        return reject([-1]);
    }
  });

const calcAreas = (shapes, values_arr) => {
  const results = [];
  for (let index in shapes) {
    results.push(calculateArea(shapes[index], values_arr[index]));
  }
  return Promise.all(results);
};

// Complete the generateArea function below.
// It returns a Promise which on success, returns an array of areas of all the shapes and on failure, returns [-1].
let getAreas = (shapes, values_arr) =>
  new Promise((resolve, reject) => {
    if (!validateShapes(shapes)) reject([-1]);
    if (!checkArraysEqualLength(shapes, values_arr)) reject([-1]);
    resolve(calcAreas(shapes, values_arr));
  });

let callCalculateArea = async (shapes, values) =>
  (await calculateArea(shapes[0], values[0]).catch(error => error)) instanceof
  Promise;

let callGetAreas = (shapes, values) =>
  getAreas(shapes, values).catch(error => error);

function main() {
  const ws = fs.createWriteStream(
    process.env.OUTPUT_PATH || path.resolve(__dirname, "output.txt")
  );

  const n = parseInt(readLine(), 10);

  let shapes = [];

  for (let shapesItr = 0; shapesItr < n; shapesItr++) {
    const shapesItem = readLine();
    shapes.push(shapesItem);
  }

  let values = [];

  for (let valuesItr = 0; valuesItr < n; valuesItr++) {
    const valuesItem = readLine();
    values.push(JSON.parse("[" + valuesItem + "]"));
  }

  if (callCalculateArea(shapes, values)) {
    callGetAreas(shapes, values).then(res => {
      ws.write(res.join("\n") + "\n");
      ws.end();
    });
  } else {
    console.error("calculateArea does not return a Promise.");
  }
}
