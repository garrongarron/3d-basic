import scene from './Scene.js'
import camera from './Camera.js'
import machine from './Machine.js'
import { misiones } from './BehaviourHormiga.js'

//RENDERER
const render = new THREE.WebGLRenderer({ canvas: document.getElementById('c'), antialias: true });
render.setClearColor(0x29487d);
render.setPixelRatio(window.devicePixelRatio);
render.setSize(window.innerWidth, window.innerHeight);
render.shadowMap.enabled = true;
// render.shadowMap.type = THREE.PCFSoftShadowMap;

machine.addCallback(() => {
    render.render(scene, camera);

})
document.querySelector('.monitor').style.display = 'none'
let time = 100
let timer = null
document.querySelector('button').addEventListener('click', () => {
    machine.run()
    document.querySelector('.monitor').style.display = 'block'
    document.querySelector('button').style.display = 'none'
    document.querySelector('table').style.display = 'block'
    timer = setInterval(() => {
        console.log(misiones);
        
        time--
        if(misiones.filter(mision => !mision).length === 0){
            clearInterval(timer)
            document.querySelector('.detalles').innerText = 'Has ganado la partida'
        }
        if(time<0){
            alert('Los alienigenas han capturado tu nave, y a la princesa.')
            alert('Por si no lo sabias, ella esta escondida esperando por ti para ser rescatada.')
            alert('Tambien debes encontrar el árbol para que la princesa coma de sus frutos.')
            let answer = confirm('Has perdido. Jajaja. Quieres voler a empezar?')
            if(answer){
                location.reload();
            } else {
                alert('Reiniciaremos el juego de todos modos! jajaja')
                location.reload();
            }
            clearInterval(timer)
        }
        document.querySelector('.bar').style.width = time+'%'
    }, 500);
})



export default render