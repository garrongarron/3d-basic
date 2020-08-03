import camera from './Camera.js'
import machine from './Machine.js'

//RENDERER
const render = new THREE.WebGLRenderer({ canvas: document.getElementById('c'), antialias: true });
render.setClearColor(0x29487d);
render.setPixelRatio(window.devicePixelRatio);
render.setSize(window.innerWidth, window.innerHeight);

const scene = new THREE.Scene();


let material = new THREE.MeshLambertMaterial({
    color:0xcccc00,
    map: new THREE.TextureLoader().load('pasto.jpg')
})

let geometry = new THREE.PlaneGeometry(1000, 1000, 100, 100)
let mesh = new THREE.Mesh(geometry, material)
mesh.position.set(0, 0, -50)
scene.add(mesh);




machine.addCallback(() => {
    render.render(scene, camera);
})
machine.run()

export default render