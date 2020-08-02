import scene from './Scene.js'
import camera from './Camera.js'
import machine from './Machine.js'

//RENDERER
const render = new THREE.WebGLRenderer({ canvas: document.getElementById('c'), antialias: true });
render.setClearColor(0xaaaaff);
render.setPixelRatio(window.devicePixelRatio);
render.setSize(window.innerWidth, window.innerHeight);


machine.addCallback(() => {
    render.render(scene, camera);
})
machine.run()

export default render