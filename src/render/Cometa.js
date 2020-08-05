const loader = new THREE.GLTFLoader();

let run = (scene) =>{
    let promise = new Promise((resolve, reject)=>{
        loader.load('cometa.gltf', function (gltf) {
            scene.add(gltf.scene);
            gltf.scene.position.set(10, 5, 200)
            gltf.scene.scale.set(3,3,3)
            resolve(gltf)
        }, undefined, function (error) {
            reject(error);
        });
    })
    return promise
}

export default run

    