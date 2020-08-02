import { lookAt } from './Camera.js'

let down = (e) => {
    if (e.keyCode == 38 && !behaviourHormiga.keys[e.keyCode]) {
        behaviourHormiga.modifier(behaviourHormiga.stop, behaviourHormiga.walk)
    }
    behaviourHormiga.keys[e.keyCode] = true
}
let up = (e) => {
    if (e.keyCode == 38 && behaviourHormiga.keys[e.keyCode]) {
        behaviourHormiga.modifier(behaviourHormiga.walk, behaviourHormiga.stop)
    }
    behaviourHormiga.keys[e.keyCode] = false
}


class BehaviourHormiga {
    constructor() {
        this.keys = {}
        this.callback = () => {
            if (this.keys[39]) {
                this.mesh.rotation.y -= 3 * Math.PI / 180;
            }
            if (this.keys[37]) {
                this.mesh.rotation.y += 3 * Math.PI / 180;
            }
            if (this.keys[38]) {
                this.ahead()
            }
            if (this.keys[40]) {
                this.back()
            }
        }
        this.speed = 2
    }
    setMesh(mesh) {
        this.mesh = mesh
        document.addEventListener('keydown', down)
        document.addEventListener('keyup', up)
    }
    ahead() {
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
        lookAt(this.mesh.position);
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

const behaviourHormiga = new BehaviourHormiga()
export default behaviourHormiga