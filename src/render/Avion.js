const loader = new THREE.GLTFLoader();

let run = (scene) =>{
    let promise = new Promise((resolve, reject)=>{
        loader.load('nave4.glb', function (gltf) {
            scene.add(gltf.scene);
            gltf.scene.position.set(10, 5, 200)
            gltf.scene.scale.set(10,10,10)
            resolve(gltf)
        }, undefined, function (error) {
            reject(error);
        });
    })
    return promise
}

export default run

    
