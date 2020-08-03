//LIGHTS
const light1 = new THREE.AmbientLight(0xffffff, .5);
light1.position.set(0, 5, 100);
// light1.castShadow = true;


const light2 = new THREE.PointLight(0xffffff, .55);
light2.position.set(50, 150, 100);
// light2.castShadow = true;
// light2.shadowCameraVisible = true;
const light3 = new THREE.PointLight(0xffffff, .5);
light3.position.set(-50, 150, 50);
// light3.castShadow = true;
// light3.shadowCameraVisible = true;

export { light1, light2, light3 }