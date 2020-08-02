import machine from './Machine.js'
import { lookAt } from './Camera.js'
import behaviourHormiga from './BehaviourHormiga.js';

let ActionCaminar = null;
let ActionDetenerse = null;

const loader = new THREE.GLTFLoader();
const promesaHormiga = new Promise((resolve, reject) => {
    loader.load('woman3.gltf', function (gltf) {
        let body = gltf.scene
        body.position.set(0, 1, -1000)
        body.scale.set(20, 20, 20)
        let mixer = new THREE.AnimationMixer(body);

        resolve({ body, 'clock': new THREE.Clock(), mixer })


        let clip = gltf.animations[1]
        ActionCaminar = mixer.clipAction(clip);
        ActionCaminar.play();

        let detenerse = gltf.animations[0]
        ActionDetenerse = mixer.clipAction(detenerse);
        // ActionDetenerse.play();

        let animations = null;
        animations = gltf.animations;
        // function playModifierAnimation(animation1,/*fSpeed, */ animation2 /*,tSpeed*/) {
        //     let time = 0.90
        //     animation2.setLoop(THREE.LoopOnce);
        //     animation2.reset();
        //     animation2.play();
        //     animation1.crossFadeTo(animation2, time /*fSpeed*/, true);
        //     // setTimeout(function () {
        //     //     animation1.enabled = true;
        //     //     animation2.crossFadeTo(animation1,time*2/*tSpeed*/, true);
        //     //     currentlyAnimating = false;
        //     // }, animation2._clip.duration * 1000 - ((time*2/*tSpeed*/ + time /*fSpeed*/) * 1000));
        // }


        // Stop after a second
        // setTimeout(() => {
        //     console.log('detenerse')
        //     // playModifierAnimation(ActionCaminar,ActionDetenerse);
        //     // ActionDetenerse.setLoop(THREE.LoopOnce);
        //     ActionDetenerse.reset();
        //     ActionDetenerse.play();
        //     ActionCaminar.crossFadeTo(ActionDetenerse, 1, true)
        //     // setTimeout(()=>{ActionDetenerse.pause();},gltf.animations[1].duration*1000)
        // }, 1000)

        // // Re start after 2 seconds
        // setTimeout(() => {
        //     console.log('volver a caminActionCaminarr')
        //     // playModifierAnimation(ActionCaminar,ActionDetenerse);
        //     // ActionDetenerse.setLoop(THREE.LoopOnce);
        //     ActionCaminar.reset();
        //     ActionCaminar.play();
        //     ActionDetenerse.crossFadeTo(ActionCaminar, 1, true)
        //     // setTimeout(()=>{ActionDetenerse.pause();},gltf.animations[1].duration*1000)
        // }, 5000)


        // console.log(gltf)
    }, undefined, function (error) {
        reject(error)
    });
})


let modify = (data) => {
    machine.addCallback(() => {
        data.mixer.update(data.clock.getDelta());
        if (typeof behaviourHormiga.callback === 'function') {
            behaviourHormiga.callback()
        }
    })
}

let hormigaSetUp = (scene) => {
    promesaHormiga.then(data => {
        scene.add(data.body);
        modify(data)
        behaviourHormiga.setMesh(data.body)
        let position = data.body.position
        lookAt(position);
        behaviourHormiga.setModifier(ActionCaminar, ActionDetenerse)
    }).catch(e => console.error(e))
}
export default hormigaSetUp