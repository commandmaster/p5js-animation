
let assaultRifleSpriteSheet;
let assaultRifleAnimator;

function preload(){
  assaultRifleSpriteSheet = loadImage("assaultShot.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  debugAnimations(true);
  assaultRifleAnimator = createAnimator({x: 400, y: 400}, 10, {x: -10, y: 0});
  assaultRifleAnimator.createAnimation("idle", assaultRifleSpriteSheet, 1, 16, 32, 1);
  assaultRifleAnimator.playAnimation("idle");
  console.log(assaultRifleAnimator);
}

function draw() {
  background(220);
  assaultRifleAnimator.rotation++;
}

function mousePressed(){
  assaultRifleAnimator.toggleFlip();
}
