class SpaceScene extends Scene{
    constructor(){
        super();

        this.animationObjects = []
        this.physicsObjects = []
        this.gravityObjects = []
        this.inputObjects = []
        this.colliders = []
        this.imageObjects = [
            [], // Planets
            [] // Orbiters
        ]
        this.isOver = false;

        this.debugCounter;
    }

    setup(){
        super.setup();

        let centralPlanet = new Planet(120, new FixedMotionObject(FixedMotionObject.linearMotion, new Vector(0, 0), [new Vector(0, -30)], false))
        centralPlanet.radius = 0
        for(let i = -1; i < 3; i++){
            let firstPlanet = new Planet(50, new FixedMotionObject(FixedMotionObject.circularMotion, new Vector(0, -700*i), [0, 0.5, 300]))
            //let walker = new Walker(firstPlanet.physicsObject, 0, Walker.fixedMotion, [200], 50)
        }
        //let firstPlanet = new Planet(150, new FixedMotionObject(FixedMotionObject.noMotion, [new Vector(-200, 0)]))
        
        let myPlanet = new Orbiter(80, new Vector(0, -200), new Vector(100, 0))

        let player = new Player(30, myPlanet, 0);
        
        this.camera.setTarget(player)
    }

    update(){
        super.update();

        this.debugCounter = 0;
        
        //for(let i of this.animationObjects) i.update();
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

        //console.log(this.debugCounter);
    }
}