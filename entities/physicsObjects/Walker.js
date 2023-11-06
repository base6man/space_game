class Walker extends PhysicsObject{
    /**
     * @brief An object walking on the surface of another object
     * @param {*} parent the the planet this object walks on
     * @param {*} startingAngle the angle of the object off its parent
     * @param {*} motion a function for the motion of the object
     * @param {*} args the arguments for the function
     * @param {*} radius this object's collider's radius
     */
    constructor(parent, startingAngle, motion, args, radius){
        super();

        this.debugList = currentScene.imageObjects[1];

        this.parent = parent.collider;
        this.motion = motion;
        this.args = args;
        this.radius = radius;

        this.angle = startingAngle;
        
        this.animator = new Animator(new Vector(this.radius + 5, this.radius + 5));
        this.animator.addImage(drawCircle(this.radius), new Vector(0, 0))
        currentScene.imageObjects[1].push(this);

        this.collider = new CircleCollider(this, radius);
        this.collider.doNotCollideWith(this.parent);

        this.isDeleted = false;


        this.debugMe = false;
    }

    debugFunc(){
        console.log(this.debugList, currentScene.imageObjects[1]);
    }

    update(){
        this.angle += this.motion(...this.args) * time.deltaTime;
    }

    updateImage(){
        this.animator.updateImage(this.position);
    }

    get position(){
        return this.parent.position.add(this.positionOffset);
    }

    get velocity(){
        //if(this.motion(...this.args) == 0)
        //    return this.parent.velocity;

        let velocityAngle = this.angle + Math.PI/2

        let velocitySpeed = this.motion(...this.args) * this.distanceToParent;

        let myVelocity = Vector.fromPseudovector(velocitySpeed, velocityAngle);
        return this.parent.velocity.add(myVelocity);
    }

    set position(_position){
        // nothing for now
    }

    get positionOffset(){
        return Vector.fromPseudovector(this.distanceToParent, this.angle);
    }

    get distanceToParent(){
        return (this.parent.radius + this.radius) / 2;
    }

    getPlayerInput(){
        return new Vector(KeyReader.d - KeyReader.a, KeyReader.w - KeyReader.s);
    }

    static playerInputMotion(speed){
        return this.getPlayerInput().x * speed / this.distanceToParent;
    }

    static fixedMotion(speed){
        return speed / this.distanceToParent;
    }

    static noMotion(){
        return 0;
    }

    onBounce(other){
        // do nothing!
    }

    delete(){
        super.delete();
        this.isDeleted = true;
        // currentScene.imageObjects[1].pop(currentScene.imageObjects[1].findIndex((x) => x === this));
        
        for(let i = 0; i < currentScene.imageObjects[1].length; i++){
            if(currentScene.imageObjects[1][i] === this) {
                currentScene.imageObjects[1].pop(i);
                return;
            }
        }
        // throw new Error(e);
    }    
}