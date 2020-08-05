
import cube2 from './Cube2.js'
import cube1 from './Cube1.js'
import floor from './Floor.js'
import hormigaSetUp from './Hormiga.js'
import hormigaSetUp2 from './Hormiga2.js'
import { light1, light2, light3 } from './Lights.js'
import db from './Database.js'
import click from './Click.js'
import machine from './Machine.js'



//SCENE
const scene = new THREE.Scene();
// scene.add(cube1);
// scene.add(cube2);
// scene.add(floor);
scene.add(light1);
scene.add(light2);
scene.add(light3);
hormigaSetUp(scene)


const loader2 = new THREE.GLTFLoader();
let gettRandom = (radio) =>{
    return Math.floor(Math.random()*radio)-radio/2
}


const doncella = new THREE.GLTFLoader();
doncella.load('woman3.gltf', function (gltf) {
    scene.add(gltf.scene);
        gltf.scene.position.set(-824, 425, -2580)
        gltf.scene.scale.set(20,20,20)
})
const arbol = new THREE.GLTFLoader();
arbol.load('arbol-viento.glb', function (gltf) {
    scene.add(gltf.scene);
        gltf.scene.position.set(-4243, 620, -4610)
        gltf.scene.scale.set(10,10,10)
})


for (let i = 0; i < 1; i++) {
    loader2.load('suelo2.0.glb', function (gltf) {
        scene.add(gltf.scene);
        gltf.scene.position.set(200, 5, 200)
        gltf.scene.scale.set(10,10,10)
        // let mixer = new THREE.AnimationMixer(gltf.scene)
        // console.log(mixer);
        // console.log();
        
        // let clip = gltf.animations.find((clip) => clip.name === "movimiento")
        // let clip = gltf.animations.find((clip) => clip.name === "Armature.003|giro|giro")
        // let clip = gltf.animations[1]
        // console.log('*************************', gltf.animations);
        // let action = mixer.clipAction(clip);
        // console.log('*************************', action);
        // action.play();
        // let clock = new THREE.Clock()
        // machine.addCallback(() => {
        //     mixer.update(clock.getDelta());
        // })
        
    }, undefined, function (error) {
        console.log(error);
    });
}

let bombas = []
for (let i = 0; i < 50; i++) {
    loader2.load('nave3.glb', function (gltf) {
        scene.add(gltf.scene);
        bombas.push(gltf.scene)
        gltf.scene.position.set(gettRandom(1000), 1000+gettRandom(1000), gettRandom(1000))
        gltf.scene.scale.set(10,10,10)
    }, undefined, function (error) {
        console.log(error);
    });
}
machine.addCallback(()=>{
    bombas.forEach(bomba=>{
        bomba.position.y -=3
        if(bomba.position.y <-100 )bomba.position.y =1000
    })
})



// const avionLoader = new THREE.GLTFLoader();
// avionLoader.load('patataVoladora.gltf', function (gltf) {
//     scene.add(gltf.scene);
//         gltf.scene.position.set(10, 50, 200)
//         gltf.scene.scale.set(10,10,10)
// }, undefined, function (error) {
//     console.log(error);
// });






let others = {}

setInterval(() => {
    let users = db.getItem('users') || {}
    Object.keys(users).filter(user => user != location.search).map(id => {
        if (typeof others[id] === 'undefined') {
            hormigaSetUp2(scene, id)
            console.log('there is other ' + id);
            others[id] = id
        }

    })
}, 1000);

export default scene




