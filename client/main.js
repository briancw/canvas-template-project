import './styles/index.less'

const canvas = document.getElementById('mainCanvas')
const ctx = canvas.getContext('2d')
let windowWidth = window.innerWidth
let windowHeight = window.innerHeight
canvas.width = windowWidth
canvas.height = windowHeight

// You might want to disable this behavior denpending on your approach to rendering
window.addEventListener('resize', () => {
    windowWidth = window.innerWidth
    windowHeight = window.innerHeight
    canvas.width = windowWidth
    canvas.height = windowHeight
})

window.requestAnimationFrame(mainLoop)
/**
 * @function mainLoop
 */
function mainLoop() {
    ctx.clearRect(0, 0, windowWidth, windowHeight)

    // Your render code here

    window.requestAnimationFrame(mainLoop)
}
