import behaviourHormiga from './BehaviourHormiga.js';

const loader = new THREE.GLTFLoader();
const promesaHormiga = new Promise((resolve, reject) => {
    loader.load('woman3.gltf', function (gltf) {
        resolve(gltf)
    }, undefined, function (error) {
        reject(error)
    });
})

let hormigaSetUp = (scene) => {
    promesaHormiga.then(gltf => {
        scene.add(gltf.scene);
        behaviourHormiga.setMesh(gltf)
    }).catch(e => console.error(e))
}
export default hormigaSetUp
//how to make position https://www.youtube.com/watch?v=6Km2COZGYA0
//donde tener mas modelos https://www.deviantart.com/ssingh511/art/Thanos-AIW-FF-742052283