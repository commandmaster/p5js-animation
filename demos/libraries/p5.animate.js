p5.prototype.animate = {};

p5.prototype.animate.Animation = class {
    #frameIndex = 0;
    #lastFrameUpdate = 0;
    #frameWidth;
    #frameHeight;
    #scale = 1;
    constructor(spriteSheetPath, rows, colums, frameRate=10, scale=1){
        this.rows = rows;
        this.colums = colums;
        this.frameRate = frameRate;
        this.#scale = scale;

        if (typeof spriteSheetPath === "string"){
            this.spriteSheetPath = spriteSheetPath;

            loadImage(this.spriteSheetPath, (image) => {
                this.spriteSheetImage = image;
                
                this.#frameWidth = this.spriteSheetImage.width / this.colums;
                this.#frameHeight = this.spriteSheetImage.height / this.rows;
            });
        }

        else if (spriteSheetPath instanceof p5.Image){
            this.spriteSheetImage = spriteSheetPath;
            this.#frameWidth = this.spriteSheetImage.width / this.colums;
            this.#frameHeight = this.spriteSheetImage.height / this.rows;
        }

        this.#lastFrameUpdate = millis(); 
    }

    draw(){
        if (!this.spriteSheetImage) return;

        let currentTime = millis();
        if (currentTime - this.#lastFrameUpdate > 1000 / this.frameRate){
            this.#frameIndex = (this.#frameIndex + 1) % (this.rows * this.colums);
            this.#lastFrameUpdate = currentTime;
        }

        let row = Math.floor(this.#frameIndex / this.colums);
        let col = this.#frameIndex % this.colums;

        push();

        scale(this.#scale);
        const ctx = drawingContext;
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";


        image(this.spriteSheetImage, 0, 0, this.#frameWidth, this.#frameHeight, col * this.#frameWidth, row * this.#frameHeight, this.#frameWidth, this.#frameHeight);

        pop();
    } 

    get frameWidth(){
        return this.#frameWidth;
    }

    get frameHeight(){
        return this.#frameHeight;
    }
}

p5.prototype.animate.Animator = class {
    #currentAnimation = null;
    #animations = {};
    #hidden = false;
    #flipped = false;
    constructor(position, rotation=0, originOffset={x:0, y:0}){
        this.position = position;
        this.rotation = rotation;
        this.originOffset = originOffset;
    }

    hide(){
        this.#hidden = true;
    }

    show(){
        this.#hidden = false;     
    }

    toggleFlip(){
        this.#flipped = !this.#flipped;
    }

    createAnimation(name, spriteSheetImage, rows, colums, frameRate=10, scale=1){
        let animation = new p5.prototype.animate.Animation(spriteSheetImage, rows, colums, frameRate, scale);
        this.#animations[name] = animation;
    }

    addAnimation(name, animation){
        this.#animations[name] = animation;
    }

    playAnimation(name){
        this.#currentAnimation = this.#animations[name];
    }

    draw(){
        if (this.#hidden) return;
        push();
        angleMode(DEGREES);
        imageMode(CENTER);

        translate(this.position.x, this.position.y);
        translate(this.originOffset.x, this.originOffset.y);

        

        rotate(this.rotation + (this.#flipped ? 0 : -180));

        if (this.#flipped){
            scale(-1, 1);
        }

        translate(-this.originOffset.x, -this.originOffset.y);

        // Draw the current animation
        if (this.#currentAnimation){
            this.#currentAnimation.draw();
        }

        translate(this.originOffset.x, this.originOffset.y);
        if (p5.prototype.animate.debugMode){
            noStroke();
            fill(255, 0, 0);
            ellipse(0, 0, 4, 4);
        }
        translate(-this.originOffset.x, -this.originOffset.y);
        pop();
    }

    set isFlipped(value){
        this.#flipped = value;
    }

    get isFlipped(){
        return this.#flipped;
    }
}



p5.prototype.animate.animators = [];
p5.prototype.animate.debugMode = false;

p5.prototype.animate.updateAnimators = function(){
    for (let animator of p5.prototype.animate.animators){
        animator.draw();
    }
}

p5.prototype.registerMethod('post', p5.prototype.animate.updateAnimators);

p5.prototype.createAnimator = function(position, rotation=0, originOffset={x:0, y:0}){
    const newAnimator = new p5.prototype.animate.Animator(position, rotation, originOffset);
    p5.prototype.animate.animators.push(newAnimator);
    return newAnimator;
}

p5.prototype.debugAnimations = function(enable=true){
    p5.prototype.animate.debugMode = enable;
}

p5.prototype.deleteAnimator = function(animator){   
    let index = p5.prototype.animate.animators.indexOf(animator);
    if (index > -1){
        p5.prototype.animate.animators.splice(index, 1);
    }
}