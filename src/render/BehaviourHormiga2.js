import machine from './Machine.js'
import { lookAt } from './Camera.js'
import db from './Database.js'
import monitor from './Monitor.js'
import click from './Click.js'


// let down = (e) => {
//     if (e.keyCode == 38 && !behaviourHormiga.keys[e.keyCode]) {
//         behaviourHormiga.modifier(behaviourHormiga.stop, behaviourHormiga.walk)
//     }
//     behaviourHormiga.keys[e.keyCode] = true
// }
// let up = (e) => {
//     if (e.keyCode == 38 && behaviourHormiga.keys[e.keyCode]) {
//         behaviourHormiga.modifier(behaviourHormiga.walk, behaviourHormiga.stop)
//     }
//     behaviourHormiga.keys[e.keyCode] = false
// }


class BehaviourHormiga {
    constructor() {
        this.keys = {}
        this.keysBack = {}
        this.callback = () => {
            if (this.keys[39]) {
                this.mesh.rotation.y -= 3 * Math.PI / 180;
            }
            if (this.keys[37]) {
                this.mesh.rotation.y += 3 * Math.PI / 180;
            }
            if (this.keys[38]) {
                if(this.keysBack[38] !== this.keys[38] && this.keys[38]){
                    this.modifier(this.stop, this.walk)
                }
                
                this.keysBack[38] = this.keys[38]
                this.ahead()
            } else {
                if(this.keysBack[38] !== this.keys[38] && !this.keys[38]){
                    this.modifier(this.walk, this.stop)
                }
                this.keysBack[38] = this.keys[38]
            }
            if (this.keys[40]) {
                this.back()
            }
            this.monitor.style.left = (-this.mesh.position.x/100)+50+'%'
            this.monitor.style.top = (-this.mesh.position.z/100)+50+'%'
            
            
        }
        this.speed = .5
        
    }
    setMesh(gltf, id) {
        this.monitor = document.createElement('div')
        this.monitor.classList.add('userPoint')
        monitor.addPoint(this.monitor)
        this.mesh = gltf.scene
        this.modify(gltf)
        setInterval(() => {
            let user = db.getItem(id)
            let pos = user.pos
            let rot = user.rot
            gltf.scene.position.x = pos.x
            gltf.scene.position.y = pos.y
            gltf.scene.position.z = pos.z
            gltf.scene.rotation.y = rot._y
        }, 200);
        setInterval(() => {
            let user = db.getItem(id)
            this.keys = user.keys
        }, 200);
    }
    modify(gltf){
        gltf.scene.position.set(0, 10, 0)
        gltf.scene.scale.set(20, 20, 20)
        let mixer = new THREE.AnimationMixer(gltf.scene)
        this.setModifier(gltf, mixer)
        let clock = new THREE.Clock()
        machine.addCallback(() => {
            mixer.update(clock.getDelta());
            if (typeof this.callback === 'function') {
                this.callback()
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


export default BehaviourHormiga