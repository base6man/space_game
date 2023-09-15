class Scene{
    constructor(){

        if(this.constructor === Scene) throw new Error("Scene is an abstract class!");

        this.camera;
        this.isOver = false;
    }

    setup(){
        // Do nothing!
    }

    update(){
        //this.camera.update();
    }

    updateImages(){
        // Do nothing!
    }

    checkForSceneEnd(){
        if(this.isOver) destroyScene();
    }
}