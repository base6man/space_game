class SpaceScene extends Scene{
    constructor(){
        super();

        this.physicsObjects = []
        this.planetObjects = []
        this.colliders = []
        this.imageObjects = [
            [], // Planets
            [] // Orbiters
        ]
        this.isOver = false;
    }

    setup(){
        super.setup();

        let centralPlanet = new GravityObject(60)
        let firstPlanet = new GravityObject(15, new FixedMotionObject(FixedMotionObject.stillMotion, [new Vector(100, 0)]))
        
        this.camera.setTarget(centralPlanet)
    }

    update(){
        super.update();
        
        for(let i of this.physicsObjects) i.update();
        for(let i of this.colliders) i.update();
    }

    updateImages(){
        super.updateImages();
        background(255);

        for(let i of this.imageObjects) {
            for(let j of i){
                j.updateImage();
            }
        }
    }
}