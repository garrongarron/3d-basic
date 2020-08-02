//OBJECT
var geometry = new THREE.CubeGeometry(10, 10, 10);
var material = new THREE.MeshLambertMaterial({ color: 0x006600});
var mesh = new THREE.Mesh(geometry, material);
mesh.position.set(0, 10, -1000);


export default mesh