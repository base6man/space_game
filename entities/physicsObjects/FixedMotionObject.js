class FixedMotionObject extends PhysicsObject{
    /**
     * @brief an object with fixed motion, determined by a function when it is initialized
     * @param {*} motion the function to determine the objects motion. The first argument for the function should always be time, followed by any others
     * @param {*} args an array of any necessary arguments for the function, always passed in after time
     */
    constructor(motion, startPos, args, hasCollider = true){
        super();

        this.positionAtTime = motion;
        this.args = args;

        currentScene.imageObjects[1].push(this);
        
        this.hasCollider = hasCollider;
        if(this.hasCollider){
            this.radius = 100;
            this.collider = new CircleCollider(this, this.radius);        
            
            this.animator = new Animator(new Vector(this.radius + 5, this.radius + 5));
            this.animator.addImage(drawCircle(this.radius), new Vector(0, 0))
        }

        this.startPos = startPos;

        this.startTime = time.runtime;
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
        return this.positionAtTime(this.runtime, ...this.args)
    }

    get velocity(){
        let deltaTime = 0.01;
        let futurePosition = this.positionAtTime(this.runtime + deltaTime, ...this.args);

        return futurePosition.subtract(this.position).divide(deltaTime);
    }

    set position(_position){
        // do nothing!
    }

    set velocity(_velocity){
        // do nothing!
    }

    update(){
        // Do nothing?
    }

    updateImage(){
        if(!this.hasCollider) return;
        
        this.animator.updateImage(this.position);
    }

    onBounce(other){
        // Do nothing!
    }

    static circularMotion(time, startingAngle, speed, radius){
        let angle = startingAngle + speed*time;
        return this.startPos.add(Vector.fromPseudovector(radius, angle));
    }

    static linearMotion(time, velocity){
        return this.startPos.add(velocity.multiply(time));
    }

    static noMotion(time, position){
        return position;
    }
}