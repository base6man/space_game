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

        this.parent = parent.collider;
        this.motion = motion;
        this.args = args;
        this.radius = radius;

        this.angle = startingAngle;
        
        console.log(this.radius);
        
        this.animator = new Animator(new Vector(this.radius + 5, this.radius + 5));
        this.animator.addImage(drawCircle(this.radius), new Vector(0, 0))
        currentScene.imageObjects[1].push(this);

        this.collider = new CircleCollider(this, radius);
        this.collider.doNotCollideWith(this.parent);
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
        if(this.motion(...this.args) == 0)
            return this.parent.velocity;

        let velocityAngle = this.angle + Math.PI/2
        if(this.motion(...this.args) < 0)
            velocityAngle += Math.PI;

        let velocitySpeed = this.motion(...this.args) * 2*Math.PI * this.distanceToParent;

        let myVelocity = Vector.fromPseudovector(velocitySpeed, velocityAngle);
        console.log(this.parent.velocity, myVelocity);
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
        return this.getPlayerInput().x * speed / this.parent.radius;
    }

    static noMotion(){
        return 0;
    }
}