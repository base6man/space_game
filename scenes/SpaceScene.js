class SpaceScene extends Scene{
    constructor(){
        super();

        this.physicsObjects = []
        this.gravityObjects = []
        this.inputObjects = []
        this.colliders = []
        this.imageObjects = [
            [], // Planets
            [] // Orbiters
        ]
        this.isOver = false;
    }

    setup(){
        super.setup();

        let centralPlanet = new Planet(100, new PhysicsObject(new Vector(0, 0)))
        let firstPlanet = new Planet(80, new FixedMotionObject(FixedMotionObject.circularMotion, [0, 0.5, 300]))
        //let firstPlanet = new Planet(150, new FixedMotionObject(FixedMotionObject.noMotion, [new Vector(-200, 0)]))
        
        let me = new Orbiter(80, new Vector(0, -200), new Vector(100, 0))
        let walker = new Walker(firstPlanet.physicsObject, 0, Walker.fixedMotion, [200], 50)

        let player = new Player(30, me, 0);
        
        this.camera.setTarget(centralPlanet)
    }

    update(){
        super.update();
        
        for(let i of this.inputObjects) i.update();
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