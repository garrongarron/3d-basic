class Monitor {
    constructor() {
        this.monitor = document.createElement('div')
        document.body.appendChild(this.monitor)
        this.monitor.classList.add('monitor')
    }
    addPoint(div){
        this.monitor.appendChild(div)        
    }
}
const monitor = new Monitor()
export default monitor