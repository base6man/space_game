class Collider{
    constructor(parent){
        this.parent = parent;
        currentScene.colliders.push(this);
    }

    get colliders(){
        return currentScene.colliders;
    }

    get position(){
        return this.parent.position;
    }

    set position(_position){
        this.parent.position = _position;
    }

    get velocity(){
        return this.parent.velocity;
    }

    set velocity(_velocity){
        this.parent.velocity = _velocity;
    }

    get MASS(){
        return this.parent.MASS;
    }
}