window.onload = function(params) {

    /*
     *
     * SET UP THE WORLD
     * 
     */
  
  
  
    //set up the ratio
    var gWidth = window.innerWidth;
    var gHeight = window.innerHeight;
    var ratio = gWidth / gHeight;
    var borders = [40, 24] //indicate where the ball needs to move in mirror position
  
  
    var light = new THREE.AmbientLight(0xffffff, 0.5);
    var light1 = new THREE.PointLight(0xffffff, 0.5);
    light1.position.set(0, 5, 0);
    light1.castShadow = true;
  
    //  set the renderer 
    var renderer = new THREE.WebGLRenderer();
    var camera = new THREE.PerspectiveCamera();
    camera.position.set(10, 10, 10);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    //properties for casting shadow
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  
    renderer.setSize(gWidth, gHeight);
    document.body.appendChild(renderer.domElement);
  
    var scene = new THREE.Scene();
    scene.add(light);
    scene.add(light1);
  










    // const geometry2 = new THREE.BoxGeometry(10000, 1, 10000, 20, 20);;
    // // const material2 = new THREE.MeshLambertMaterial({color: 0xF3FFE2});
    // const texture = new THREE.TextureLoader().load('./pasto1.jpg');
    // texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    // texture.repeat.set(200, 200);
    // const material2 = new THREE.MeshBasicMaterial({ map: texture });
    // // const material2 = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
    
    // const mesh = new THREE.Mesh(geometry2, material2);
    // mesh.position.set(0, 0, 0);
    // mesh.receiveShadow = true;





    var ground = new THREE.Mesh(new THREE.BoxGeometry(10, 0.5, 10), new THREE.MeshLambertMaterial())
    ground.receiveShadow = true;
    scene.add(ground)
    var geometry;
  
  
    var loader = new THREE.FontLoader();
    var mesh;
  
    requestAnimationFrame(render);
  
    function render() {
      if (mesh) {
        // mesh.rotation.y += 0.01;
        // mesh.rotation.z += 0.007;
      }
      renderer.render(scene, camera);
      requestAnimationFrame(render);
    }
  
    loader.load('https://cdn.rawgit.com/mrdoob/three.js/master/examples/fonts/helvetiker_regular.typeface.json', function(font) {
  
      var geometry = new THREE.TextGeometry('Hello three.js!', {
        font: font,
        size: 80,
        height: 5,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 10,
        bevelSize: 8,
        bevelSegments: 5
      });
  
      var material = new THREE.MeshLambertMaterial({
        color: 0xF3FFE2
      });
      mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(0, 2, 0);
      mesh.scale.multiplyScalar(0.01)
      mesh.castShadow = true;
      scene.add(mesh);
  

    });
  
  
  
  }