import machine from './Machine.js'
import behaviourCamera from './BehaviourCamera.js'

//CAMERA
// const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 3000);
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, .1, 3000);
// var camera = new THREE.OrthographicCamera(window.innerWidth / -2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / -2, 0.1, 3000);
camera.position.set(0, 30, 0)

// let x = 1;
// machine.addCallback(() => {
//     camera.position.z -= 1 * x;
// })

behaviourCamera.setMesh(camera)
export const lookAt = (mesh) => {
    camera.lookAt(mesh)
}
export default camera