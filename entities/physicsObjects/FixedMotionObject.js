class FixedMotionObject{
    /**
     * @brief an object with fixed motion, determined by a function when it is initialized
     * @param {*} motion the function to determine the objects motion. The first argument for the function should always be time, followed by any others
     * @param {*} args an array of any necessary arguments for the function, always passed in after time
     */
    constructor(motion, args){
        this.motion = motion;
        this.args = args;

        this.position = this.motion(0, this.args);
        this.velocity = this.motion(1, this.args).subtract(this.motion(0, this.args));

        this.startTime = time.runtime;
        
        currentScene.physicsObjects.push(this);
    }

    get runtime(){
        return time.runtime - this.startTime;
    }

    update(){
        this.position = this.motion(this.runtime, this.args);
        this.velocity = this.motion(this.runtime + 1, this.args).subtract(this.motion(this.runtime, this.args));

        console.log(this.position);
    }

    static circularMotion(time, startingAngle, speed, radius){
        let angle = startingAngle + speed*time;
        return Vector.pseudovectorToVector(radius, angle);
    }

    static stillMotion(time, position){
        return position;
    }
}