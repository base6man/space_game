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
}