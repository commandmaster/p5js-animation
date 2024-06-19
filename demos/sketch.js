// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let testImage;
let playerAnimator;

function preload(){
  testImage = loadImage("assaultShot.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  debugAnimations(true);
  playerAnimator = createAnimator({x: 400, y: 400}, 10, {x: -10, y: 0});
  playerAnimator.createAnimation("idle", testImage, 1, 16, 32, 1);
  playerAnimator.playAnimation("idle");
  console.log(playerAnimator);
}

function draw() {
  background(220);
  playerAnimator.rotation++;
}

function mousePressed(){
  playerAnimator.toggleFlip();
}
