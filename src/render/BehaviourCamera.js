import machine from "./Machine.js";

let down = (e) => {
    behaviourCamera.keys[e.keyCode] = true   
}
let up = (e) => {
    behaviourCamera.keys[e.keyCode] = false
}


class BehaviourCamera {
    constructor() {
        this.keys = {}
        this.callback = () => {
            // if (this.keys[68]) {
            //     this.mesh.rotation.y -= 1 * Math.PI / 180;
            // }
            // if (this.keys[65]) {
            //     this.mesh.rotation.y += 1 * Math.PI / 180;
            // }
            // if (this.keys[83]) {
            //     this.ahead()
            // }
            // if (this.keys[87]) {
            //     this.back()
            // }
            if(this.hormiga){
                // this.mesh.position.x = this.hormiga.position.x
                // this.mesh.position.z = this.hormiga.position.z

                // this.mesh.rotation.y = this.hormiga.rotation._y - Math.PI;

                this.mesh.position.x = this.hormiga.position.x - Math.sin(this.hormiga.rotation.y)*150
                this.mesh.position.y = this.hormiga.position.y + 30
                this.mesh.position.z = this.hormiga.position.z - Math.cos(this.hormiga.rotation.y)*150 
                
            }
            
        }
        this.speed = .5
    }
    setHormiga(hormiga){
        this.hormiga = hormiga
    }
    setMesh(mesh) {
        this.mesh = mesh
        document.addEventListener('keydown', down)
        document.addEventListener('keyup', up)
        machine.addCallback(() => {
            if (typeof behaviourCamera.callback === 'function') {
                behaviourCamera.callback()
            }
        })
    }
    ahead() {
        console.log('ahead');
        
        this.mesh.position.x += Math.sin(this.mesh.rotation.y) * this.speed
        this.mesh.position.z += Math.cos(this.mesh.rotation.y) * this.speed
        this.look()
    }
    back() {
        this.mesh.position.x -= Math.sin(this.mesh.rotation.y) * this.speed
        this.mesh.position.z -= Math.cos(this.mesh.rotation.y) * this.speed
        this.look()
    }
    look() {
        let gap = 30
        this.mesh.position.y += gap
        // lookAt(this.mesh.position);
        this.mesh.position.y -= gap
    }
    setModifier(walk, stop) {
        this.walk = walk
        this.stop = stop
    }
    modifier(animation1,/*fSpeed, */ animation2 /*,tSpeed*/) {
        let time = 0.2
        // animation2.setLoop(THREE.LoopOnce);
        animation2.reset();
        animation2.play();
        animation1.crossFadeTo(animation2, time /*fSpeed*/, true);
    }

}

const behaviourCamera = new BehaviourCamera()
export default behaviourCamera