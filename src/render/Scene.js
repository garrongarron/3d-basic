
import cube2 from './Cube2.js'
import cube1 from './Cube1.js'
import floor from './Floor.js'
import hormigaSetUp from './Hormiga.js'
import hormigaSetUp2 from './Hormiga2.js'
import { light1, light2 } from './Lights.js'
import db from './Database.js'


//SCENE
const scene = new THREE.Scene();
// scene.add(cube1);
// scene.add(cube2);
scene.add(floor);
scene.add(light1);
scene.add(light2);
hormigaSetUp(scene)


let others = {}

setInterval(() => {
    let users = db.getItem('users') || {}
    Object.keys(users).filter(user => user != location.search).map(id => {
        if(typeof others[id] === 'undefined'){
            hormigaSetUp2(scene, id)
            console.log('there is other '+ id);
            others[id] = id
        }
        
    })
}, 1000);

export default scene