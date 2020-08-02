import machine from './Machine.js'
import { lookAt } from './Camera.js'
import db from './Database.js'
import behaviourCamera from './BehaviourCamera.js'
import monitor from './Monitor.js'

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
                console.log('derecha');
                this.mesh.rotation.y -= 3 * Math.PI / 180;
            }
            if (this.keys[37]) {
                console.log('izq');
                this.mesh.rotation.y += 3 * Math.PI / 180;
            }
            if (this.keys[38]) {
                this.ahead()
            }
            if (this.keys[40]) {
                this.back()
            }
            behaviourCamera.setHormiga(this.mesh)
            this.monitor.style.left = (-this.mesh.position.x/100)+50+'%'
            this.monitor.style.top = (-this.mesh.position.z/100)+50+'%'
        }
        this.speed = .5
    }
    setMesh(gltf) {
        this.monitor = document.createElement('div')
        this.monitor.classList.add('userPoint','yellow')
        monitor.addPoint(this.monitor)
        this.mesh = gltf.scene
        document.addEventListener('keydown', down)
        document.addEventListener('keyup', up)
        this.modify(gltf)
        
    }
    modify(gltf){
        gltf.scene.position.set(0, 1, 0)
        gltf.scene.scale.set(20, 20, 20)
        setInterval(() => {
            db.setItem(location.search, {
                pos:gltf.scene.position,
                rot:gltf.scene.rotation,
                keys:this.keys
            })
            let users = db.getItem('users') || {}
            users[location.search]=location.search
            db.setItem('users',users)

        }, 200);
        let mixer = new THREE.AnimationMixer(gltf.scene)
        this.setModifier(gltf, mixer)
        let clock = new THREE.Clock()
        machine.addCallback(() => {
            mixer.update(clock.getDelta());
            if (typeof behaviourHormiga.callback === 'function') {
                behaviourHormiga.callback()
            }
        })
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
        // lookAt(this.mesh.position);
        this.mesh.position.y -= gap
    }
    setModifier(gltf, mixer) {
        this.walk = mixer.clipAction(gltf.animations[1]);
        this.stop = mixer.clipAction(gltf.animations[0]);
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