class PhysicsObject{
    constructor(position = null){
        this.position = position;
        this.collider;

        currentScene.physicsObjects.push(this);
    }

    update(){
        // Nothing here now
    }

    get MASS(){
        return 99999;
    }

    delete(){
        let myIndex = currentScene.physicsObjects.findIndex((x) => x === this);
        currentScene.physicsObjects.pop(myIndex);

        if(this.collider) this.collider.delete();
    }
}

class KinematicObject extends PhysicsObject{
    constructor(position = new Vector(0, 0), velocity = new Vector(0, 0)){
        super(position);
        this.velocity = velocity;
    }

    update(){
        this.position.x += this.velocity.x * time.deltaTime;
        this.position.y += this.velocity.y * time.deltaTime;
    }

    get MASS(){
        return 1;
    }
}