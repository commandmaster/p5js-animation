
let assaultRifleSpriteSheet; // Declare the sprite sheet variable
let assaultRifleAnimator; // Declare the animator variable

function preload(){
  // Preload the sprite sheet image
  assaultRifleSpriteSheet = loadImage("assaultShot.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight); // Create the canvas with the window's width and height

  debugAnimations(true); // Enable the debug mode so we can see the animator's hitbox and origin/pivot point

  assaultRifleAnimator = createAnimator({x: width/2, y: height/2}, 10, {x: -10, y: 0}); // Create the animator object at the middle of the screen with a rotation of 10 degrees and an origin offset of -10 on the x axis
  assaultRifleAnimator.createAnimation("idle", assaultRifleSpriteSheet, 1, 16, 32, 1); // Create an animation called "idle" with the sprite sheet, 1 row, 16 columns, 32 fps, and a scale of 1
  assaultRifleAnimator.playAnimation("idle"); // Play the "idle" animation
}

function draw() {
  background(200); // Set the background color to light gray
  assaultRifleAnimator.rotation++; // Increase the rotation of the animator by 1 degree per frame
}

function mousePressed(){
  assaultRifleAnimator.toggleFlip(); // Flip the animator horizontally when the mouse is pressed
}
