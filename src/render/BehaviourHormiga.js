import machine from './Machine.js'
import camera, { lookAt } from './Camera.js'
import db from './Database.js'
import behaviourCamera from './BehaviourCamera.js'
import monitor from './Monitor.js'
import { light1, light2, light3 } from './Lights.js'
import run from './Avion.js'
import cometa from './Cometa.js'

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

let gap = 1

let place = (target, nave, gap)=>{
    if(nave.x > target.x-gap && nave.x < target.x+gap )
        if(nave.y > target.y-gap && nave.y < target.y+gap )
            if(nave.z > target.z-gap && nave.z < target.z+gap ) return true
    return false
}
let target = {x:-824, y:405, z:-2580}
let arbol = {x:-4243, y:620, z:-4610}
export let misiones = [false, false]
class BehaviourHormiga {
    constructor() {
        this.keys = {}
        this.cometa = null
        this.avion = null
        this.callback = () => {
            if (this.keys[39]) {
                this.mesh.rotation.y -= 3 * Math.PI / 180;
                this.avion.rotation.z = 25 * Math.PI / 180;
            }
            if (this.keys[37]) {
                this.mesh.rotation.y += 3 * Math.PI / 180;
                this.avion.rotation.z = -25 * Math.PI / 180;
            }
            if (!this.keys[39] && !this.keys[37] && this.avion) {
                this.avion.rotation.z = 0 * Math.PI / 180;
            }
            if (this.keys[38]) {
                this.ahead()
            }
            if (this.keys[40]) {
                this.back()
            }

            if (this.cometa !== null) {
                this.cometa.position.x = this.mesh.position.x - Math.sin(this.mesh.rotation.y) * 50
                this.cometa.position.y = this.mesh.position.y + 10
                this.cometa.position.z = this.mesh.position.z - Math.cos(this.mesh.rotation.y) * 50
            }
            if (this.avion !== null) {
                //DELANTE
                // this.avion.position.x = this.mesh.position.x + Math.sin(this.mesh.rotation.y)*200
                // this.avion.position.y = camera.position.y - 30
                // this.avion.position.z = this.mesh.position.z + Math.cos(this.mesh.rotation.y)*200 


                this.avion.position.x = this.mesh.position.x
                this.avion.position.y = this.mesh.position.y
                this.avion.position.z = this.mesh.position.z
                camera.lookAt(this.avion.position.x, this.avion.position.y + 20, this.avion.position.z)





                this.avion.rotation.y = this.mesh.rotation.y






                // console.log(this.avion.position);

            }


            if (this.keys[87]) {
                console.log('87 arriba');
                this.mesh.position.set(this.mesh.position.x, this.mesh.position.y + gap, this.mesh.position.z)
                this.avion.rotation.y = this.mesh.rotation.y
                this.avion.rotation.x = (-95 * Math.PI / 180 * Math.cos(this.mesh.rotation.y)) / 3
            }
            if (this.keys[83]) {
                console.log('83 abajo');
                this.mesh.position.set(this.mesh.position.x, this.mesh.position.y - gap, this.mesh.position.z)
                this.avion.rotation.y = this.mesh.rotation.y
                this.avion.rotation.x = (95 * Math.PI / 180 * Math.cos(this.mesh.rotation.y)) / 3
            }
            if (!this.keys[87] && !this.keys[83] && this.avion) {
                this.avion.rotation.y = this.mesh.rotation.y
                this.avion.rotation.x = 0
            }






            behaviourCamera.setHormiga(this.mesh)
            this.monitor.style.left = (-this.mesh.position.x / 100) + 50 + '%'
            this.monitor.style.top = (-this.mesh.position.z / 100) + 50 + '%'
            light3.position.x = light2.position.x = light1.position.x = this.mesh.position.x
            light3.position.z = light2.position.z = light1.position.z = this.mesh.position.z

            document.querySelector('h1').innerText = `{x:${(Math.floor(this.mesh.position.x))
            },y:${(Math.floor(this.mesh.position.y))
            },z:${(Math.floor(this.mesh.position.z))}}`

            if(!misiones[0] && place(target, this.mesh.position, 10)){
                document.querySelector('.mision').innerText = 'Has encontrado a la princesa!'
                misiones[0] =  true
            }
            if(!misiones[1] && place(arbol, this.mesh.position, 100)){
                document.querySelector('.mision').innerText = 'Has encontrado a el Arbol!'
                misiones[1] =  true
            }
        }
        this.speed = 5
    }
    setMesh(gltf, scene) {
        let promise = run(scene)
        promise.then(n => {
            this.avion = n.scene
            let mixer = new THREE.AnimationMixer(this.avion)
            let clip = n.animations[0]
            let action = mixer.clipAction(clip);
            action.setLoop(THREE.LoopOnce);
            document.addEventListener('keydown',(event)=>{
                console.log(event.keyCode);
                if(event.keyCode == 32){
                    action.reset();
                    action.play();
                }
            })
            let clock = new THREE.Clock()
            machine.addCallback(() => {
                mixer.update(clock.getDelta());
            })
        }).catch(e => console.error(e))






        let bomba = cometa(scene)
        // bomba.then(n=> this.cometa = n.scene).catch(e=>console.error(e))

        this.monitor = document.createElement('div')
        this.monitor.classList.add('userPoint', 'yellow')
        monitor.addPoint(this.monitor)
        this.mesh = gltf.scene
        document.addEventListener('keydown', down)
        document.addEventListener('keyup', up)
        this.modify(gltf)

    }
    modify(gltf) {
        gltf.scene.position.set(0, 1, 0)
        gltf.scene.scale.set(1, 1, 1)
        setInterval(() => {
            db.setItem(location.search, {
                pos: gltf.scene.position,
                rot: gltf.scene.rotation,
                keys: this.keys
            })
            let users = db.getItem('users') || {}
            users[location.search] = location.search
            db.setItem('users', users)

        }, 200);
        let mixer = new THREE.AnimationMixer(gltf.scene)
        console.log(mixer);
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