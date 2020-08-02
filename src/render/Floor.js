//OBJECT 2
const geometry2 = new THREE.BoxGeometry(10000, 1, 10000, 20, 20);;
// const material2 = new THREE.MeshLambertMaterial({color: 0xF3FFE2});
const texture = new THREE.TextureLoader().load('./img.png');
texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set(10, 10);
const material2 = new THREE.MeshBasicMaterial({ map: texture });
// const material2 = new THREE.MeshBasicMaterial( {color: 0x00ff00} );

const mesh = new THREE.Mesh(geometry2, material2);
mesh.position.set(0, 0, -1000);
export default mesh