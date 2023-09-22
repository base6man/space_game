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

        let centralPlanet = new Planet(60)
        let firstPlanet = new Planet(45, new FixedMotionObject(FixedMotionObject.circularMotion, [0, 0.5, 300]))
        
        let me = new Orbiter(10, new Vector(0, -200), new Vector(100, 0))
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