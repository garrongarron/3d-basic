
import cube2 from './Cube2.js'
import cube1 from './Cube1.js'
import floor from './Floor.js'
import hormigaSetUp from './Hormiga.js'
import { light1, light2 } from './Lights.js'


//SCENE
const scene = new THREE.Scene();
scene.add(cube1);
scene.add(cube2);
scene.add(floor);
scene.add(light1);
scene.add(light2);
hormigaSetUp(scene)

export default scene