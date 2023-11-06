class Collider{
    constructor(parent){
        this.parent = parent;
        this.isDeleted = false;
        this.doNotCollide = []
        currentScene.colliders.push(this);
    }

    update(){
        console.assert(!this.parent.isDeleted);
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

    doNotCollideWith(newObject){
        this.doNotCollide.push(newObject);
    }

    delete(){
        for(let i = 0; i < currentScene.colliders.length; i++){
            if(currentScene.colliders[i] === this) {
                currentScene.colliders[i].isDeleted = true;
                currentScene.colliders.pop(i);
                break;
            }
        }
        console.assert(this.isDeleted);
    }
}