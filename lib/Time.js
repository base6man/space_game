class Time{

    constructor(){
        this.parent = parent;

        this.runtime = 0;
        this.frameCount = 0;
        this.deltaTime;

        this.trueDeltaTime;
        this.trueRuntime = 0;

        this.waitFunc = [];

        this.MAX_TIME_STEP = 0.25;

        this.hitStopMultiplier = 1;

        this.previousFrameSongRuntime = 0;
    }

    update(){
        // Counts with the song if a currentScene is not active

        this.deltaTime = this.getDeltaTime();

        this.trueDeltaTime = deltaTime / 1000;
        this.trueRuntime += this.trueDeltaTime;
        
        this.runtime += this.deltaTime;
        this.frameCount += 1 / STEPS;
        
        this.isLooping = true;
        for(let i = this.waitFunc.length - 1; i >= 0; i--){
            this.loopIndex = i;

            if(this.waitFunc[i] && this.waitFunc[i].startTime < this.runtime){

                let tempFunc = this.waitFunc[i];
                this.waitFunc.splice(i, 1);

                try{
                    tempFunc.parent[tempFunc.funcName](...tempFunc.args);
                }
                catch(e){
                    console.log(tempFunc.funcName, tempFunc, e);
                    throw(e);
                }
            }
        }
        this.isLooping = false;

        /*
        if(currentSong)
            this.previousFrameSongRuntime = currentSong.currentTime();
        else{ this.previousFrameSongRuntime = 0; }
        */
    }

    getDeltaTime(){

        let inCutscene = 1;
        if(currentScene && currentScene.isInCutscene) inCutscene = cutsceneMult;

        return Math.min(deltaTime / 1000, this.MAX_TIME_STEP) * GLOBAL_TIMESCALE * this.hitStopMultiplier / STEPS / inCutscene;
    }

    get totalDeltaTime(){
        return this.deltaTime * STEPS;
    }

    get frameRate(){
        return 1 / (this.deltaTime * STEPS / GLOBAL_TIMESCALE / this.hitStopMultiplier);
    }

    get songTime(){
        if(!this.startSongTime) return null;
        return this.runtime - this.startSongTime;
    }

    delayedFunction(parent, funcName, waitTime, args = [], outsideOfScene = false){
        if(funcName == "endCutscene") console.log(parent, funcName, waitTime)
        console.assert(isNumber(waitTime), parent, funcName, waitTime);
        const newElement = {
            parent, funcName, args, outsideOfScene,
            startTime: waitTime + this.runtime
        }
        return this.waitFunc.push(newElement);
    }

    isWaiting(parent, funcName){
        return this.waitingFunctions(parent, funcName).length > 0;
    }

    stop(waitfuncObj) {
        return this.waitFunc.splice(this.waitFunc.indexOf(waitfuncObj), 1);
    }

    waitingFunctions(parent, funcName){
        let newWaitFunc = [];
        for(let i in this.waitFunc){
            if((this.waitFunc[i].funcName == funcName || !funcName) && (this.waitFunc[i].parent == parent || !parent)){
                newWaitFunc.push(this.waitFunc[i]);
            }
        }
        return newWaitFunc;
    }

    stopFunctions(parent, funcName){
        let removedList = this.waitFunc.filter(item => (funcName == item.funcName || !funcName) && (item.parent == parent || !parent));
        this.waitFunc = this.waitFunc.filter(item => !((funcName == item.funcName || !funcName) && (item.parent == parent || !parent)));
        return removedList;
    }

    stopFunctionsWithKeyword(parent, keyword){

        let removedList = this.waitFunc.filter(item => keyword.test(item.funcName) && (item.parent == parent || parent));
        this.waitFunc = this.waitFunc.filter(item => !(keyword.test(item.funcName) && (item.parent == parent || parent)));
        return removedList;
    }

    stopAllFunctions(){
        let removedList = [...this.waitFunc];
        this.waitFunc = [];
        return removedList;
    }

    stopFunctionsWithinScene(){
        let removedList = this.waitFunc.filter(item => !item.outsideOfScene);
        this.waitFunc = this.waitFunc.filter(item => item.outsideOfScene);
        return removedList;
    }
    
    hitStop(time, speed = 0.01, freezeCamera = true){
        this.hitStopMultiplier = speed;
        if(freezeCamera) currentScene.mainCamera.freeze();
        
        this.stopFunctions(this, 'stopHitStop');
        this.delayedFunction(this, 'stopHitStop', time*speed);
    }

    stopHitStop(){
        this.stopFunctions(this, 'stopHitStop');
        this.hitStopMultiplier = 1;
        currentScene.mainCamera.unfreeze();
    }

    setSpeed(speed){
        this.hitStopMultiplier = speed;
    }
}