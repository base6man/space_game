class FixedMotionObject{
    /**
     * @brief an object with fixed motion, determined by a function when it is initialized
     * @param {*} motion the function to determine the objects motion. The first argument for the function should always be time, followed by any others
     * @param {*} args an array of any necessary arguments for the function, always passed in after time
     */
    constructor(motion, args){
        this.motion = motion;
        this.args = args;
        
        currentScene.physicsObjects.push(this);
        currentScene.imageObjects[1].push(this);
        
        this.radius = 100;
        this.collider = new CircleCollider(this, this.radius);        
        
        this.animator = new Animator(new Vector(this.radius + 5, this.radius + 5));
        this.animator.addImage(this.drawImage(), new Vector(0, 0))

        this.startTime = time.runtime;
        
        this.mass = 99999;
    }

    getArgs(time){
        let newArgs = [time];
        for(let i of this.inputArgs){
            newArgs.push(i);
        }
        console.log(newArgs)
        return newArgs;
    }

    get runtime(){
        return time.runtime - this.startTime;
    }

    get position(){
        return this.motion(this.runtime, ...this.args)
        return this[this.motion](this.getArgs(this.runtime));
    }

    get velocity(){
        let deltaTime = 0.01;
        //let futurePosition = this[this.motion](this.getArgs(this.runtime));
        let futurePosition = this.motion(this.runtime + deltaTime, ...this.args);

        return futurePosition.subtract(this.position).divide(deltaTime);
    }

    update(){
        // Do nothing?
    }

    updateImage(){
        this.animator.updateImage(this.position);
    }

    drawImage(){
        let newImage = createGraphics(this.radius + 5, this.radius + 5)
        newImage.fill('white')
        newImage.stroke('black')
        newImage.strokeWeight(5);
        newImage.circle(newImage.width/2, newImage.height/2, this.radius)
        return newImage;
    }

    static circularMotion(time, startingAngle, speed, radius){
        let angle = startingAngle + speed*time;
        return Vector.pseudovectorToVector(radius, angle);
    }

    static stillMotion(time, position){
        return position;
    }
}