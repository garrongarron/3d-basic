import camera from './Camera.js'
let click = (scene) =>{
    window.addEventListener('click', e => raycast(e));
    let raycaster = new THREE.Raycaster()
    function raycast(e, touch = false) {
        var mouse = {};
        if (touch) {
            mouse.x = 2 * (e.changedTouches[0].clientX / window.innerWidth) - 1;
            mouse.y = 1 - 2 * (e.changedTouches[0].clientY / window.innerHeight);
        } else {
            mouse.x = 2 * (e.clientX / window.innerWidth) - 1;
            mouse.y = 1 - 2 * (e.clientY / window.innerHeight);
        }
        // update the picking ray with the camera and mouse position
        raycaster.setFromCamera(mouse, camera);

        // calculate objects intersecting the picking ray
        var intersects = raycaster.intersectObjects(scene.children, true);
        console.log('ook', intersects);
    }
}


export default click