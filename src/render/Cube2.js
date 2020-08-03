import machine from './Machine.js'

//OBJECT
const geometry3 = new THREE.CubeGeometry(10, 10, 10);
const material3 = new THREE.MeshLambertMaterial({ color: 0xF3FFE2 });
const mesh = new THREE.Mesh(geometry3, material3);
mesh.position.set(0, 30, 100);
mesh.castShadow = true;

machine.addCallback(() => {
    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.01;
})



export default mesh