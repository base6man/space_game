class Planet{
    /**
     * @brief A body of gravitational influence. Not a physics object.
     * @param {*} MASS the planet's gravitational force 
     * @param {*} physicsObject use this if you want the planet to move
     */
    constructor(MASS = 1, physicsObject = new PhysicsObject(new Vector(0, 0))){
        this.physicsObject = physicsObject;
        this.physicsObject.planet = this;

        this.MASS = MASS;

        let maxCanvasSize = Animator.calculateGravityFieldSize(this.MASS);
        this.animator = new Animator(new Vector(maxCanvasSize, maxCanvasSize));
        this.animator.drawGravityField(this.MASS)

        currentScene.imageObjects[0].push(this);
        currentScene.gravityObjects.push(this);
    }

    get position(){
        return this.physicsObject.position;
    }

    get velocity(){
        return this.physicsObject.velocity;
    }

    update(){
        this.physicsObject.update();
    }

    updateImage(){
        this.animator.updateImage(this.position);
        //currentScene.drawCircle(this.MASS, this.position);
    }
}

