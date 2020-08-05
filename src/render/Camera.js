import machine from './Machine.js'
import behaviourCamera from './BehaviourCamera.js'

//CAMERA
// const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 3000);
const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, .1, 10000);
// var camera = new THREE.OrthographicCamera(window.innerWidth / -2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / -2, 0.1, 3000);
camera.position.set(0, 50, 0)
// camera.rotation.x = Math.PI /4

let gap = 0.01
document.addEventListener('keydown',(e)=>{
    // if(e.keycode == )
    // if(e.keyCode ==87 ) {
    //     camera.position.set(0, camera.position.y + gap, 0)
    // };
    
    // if(e.keyCode ==83 ) {
    //     camera.position.set(0, camera.position.y - gap, 0)
    // };
    // console.log(e.keyCode);
    
    //izq 65 
    // abajo83 
    // derecha68 
    // arriba87
})
// let x = 1;
// machine.addCallback(() => {
//     camera.position.z -= 1 * x;
// })

behaviourCamera.setMesh(camera)
export const lookAt = (mesh) => {
    camera.lookAt(mesh)
}
export default camera