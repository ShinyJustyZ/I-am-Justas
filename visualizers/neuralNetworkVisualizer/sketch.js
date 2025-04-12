let canvasSizeX = 600;
let canvasSizeY = 400;

let hiddenNodes = 7;
let inputNodes = 5;
let outputNodes = 5;

let offsetBetweenInputs, offsetBetweenHiddens, offsetBetweenOutputs;
let inputStartY, hiddenStartY, outputStartY;
let inputX, hiddenX, outputX;

function recalculateOffsets() {
  offsetBetweenInputs = inputNodes > 1 ? canvasSizeY / (inputNodes - 1) : canvasSizeY;
  offsetBetweenHiddens = hiddenNodes > 1 ? canvasSizeY / (hiddenNodes - 1) : canvasSizeY;
  offsetBetweenOutputs = outputNodes > 1 ? canvasSizeY / (outputNodes - 1) : canvasSizeY;

  inputStartY = inputNodes > 1 ? 0 : canvasSizeY / 2;
  hiddenStartY = hiddenNodes > 1 ? 0 : canvasSizeY / 2;
  outputStartY = outputNodes > 1 ? 0 : canvasSizeY / 2;

  inputX = canvasSizeX / 8; // Closer to the left edge
  hiddenX = canvasSizeX / 2;
  outputX = (canvasSizeX * 7) / 8; // Closer to the right edge
}

function setup() {
  const canvas = createCanvas(canvasSizeX, canvasSizeY);
  canvas.parent('canvas-container');

  const inputField = document.getElementById("input-nodes");
  const hiddenField = document.getElementById("hidden-nodes");
  const outputField = document.getElementById("output-nodes");
  

  // Listen for changes and update variables
  inputField.addEventListener("input", () => {
    inputNodes = parseInt(inputField.value) || 0;
    console.log("Input Nodes:", inputNodes);
  });

  hiddenField.addEventListener("input", () => {
    hiddenNodes = parseInt(hiddenField.value) || 0;
    console.log("Hidden Nodes:", hiddenNodes);
  });

  outputField.addEventListener("input", () => {
    outputNodes = parseInt(outputField.value) || 0;
    console.log("Output Nodes:", outputNodes);
  });
  recalculateOffsets();
}

function draw() {
  background('black'); // black background
  stroke('white');
  // draws the lines between the input and hidden nodes
  for (let i = 0; i < inputNodes; i++) {
    for (let j = 0; j < hiddenNodes; j++) {
      line(inputX, inputStartY + offsetBetweenInputs * i, hiddenX, hiddenStartY + offsetBetweenHiddens * j);
    }
  }
  // draws the lines between the hidden and output nodes
  for (let i = 0; i < hiddenNodes; i++) {
    for (let j = 0; j < outputNodes; j++) {
      line(hiddenX, hiddenStartY + offsetBetweenHiddens * i, outputX, outputStartY + offsetBetweenOutputs * j);
    }
  }
  fill('red');
  for (let i = 0; i < inputNodes; i++) {
    circle(inputX, inputStartY + offsetBetweenInputs * i, 20);
  }

  fill('blue');
  for (let i = 0; i < hiddenNodes; i++) {
    circle(hiddenX, hiddenStartY + offsetBetweenHiddens * i, 20);
  }

  fill('green');
  for (let i = 0; i < outputNodes; i++) {
    circle(outputX, outputStartY + offsetBetweenOutputs * i, 20);
  }

  // displays the x and y position of the mouse on the canvas
  fill(255); // white text
  text(`mouseX: ${mouseX}, mouseY: ${mouseY}`, 20, 20);
}