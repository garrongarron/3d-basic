import machine from './Machine.js'

var loader = new THREE.FontLoader();

let nameSetUp = (scene, id, behaviourHormiga) => {
  let name = new Promise((resolve, reject) => {
    loader.load('https://cdn.rawgit.com/mrdoob/three.js/master/examples/fonts/helvetiker_regular.typeface.json',
      function (font) {

        var geometry = new THREE.TextGeometry(id, {
          font: font,
          size: 80,
          height: 5,
          curveSegments: 12,
          bevelEnabled: true,
          bevelThickness: 10,
          bevelSize: 8,
          bevelSegments: 5
        });
        geometry.center();
        var material = new THREE.MeshLambertMaterial({
          color: 0xcccccc
        });
        let mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(0, 40, 0);
        mesh.scale.multiplyScalar(0.05)
        resolve(mesh)
      });
  })
  //////////////////////////////
  name.then(mesh => {
    scene.add(mesh);
    machine.addCallback(() => {
      if (behaviourHormiga.mesh) {
        mesh.position.x = behaviourHormiga.mesh.position.x
        mesh.position.z = behaviourHormiga.mesh.position.z
        mesh.rotation.y = behaviourHormiga.mesh.rotation.y
      }
    })
  }).catch(e => console.error(e))
}
export default nameSetUp