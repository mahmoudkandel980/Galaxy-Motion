const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight
const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}

let colors = ['#273D40', '#567073', '#8AA3A6', '#AABFBF', '#C7D9D7', '#A8B0BF', '#4E74A6', '#024959', '#0396A6', '#03A6A6']

addEventListener('resize', () => {
  canvas.width = innerWidth
  canvas.height = innerHeight

  init()
})

let mouseDown = false
addEventListener('mousedown', () => {
  var context = new AudioContext();
  mouseDown = true
})
addEventListener('mouseup', () => {
  mouseDown = false
})

function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

class Paricles {
  constructor(x, y, radius, color) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
  }

  draw() {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.shadowColor = this.color
    c.shadowBlur = 8
    c.fillStyle = this.color
    c.fill()
    c.closePath()
  }

  update() {
    this.draw()
  }
}

let particles
function init() {
  particles = []

  for (let i = 0; i < canvas.height * 1.5; i++) {
    const x = randomIntFromRange(-(Math.sqrt(Math.pow(canvas.width, 2) + Math.pow(canvas.width, 2))) / 2,
      (Math.sqrt(Math.pow(canvas.width, 2) + Math.pow(canvas.width, 2))) / 2)
    const y = randomIntFromRange(-(Math.sqrt(Math.pow(canvas.width, 2) + Math.pow(canvas.width, 2))) / 2,
      (Math.sqrt(Math.pow(canvas.width, 2) + Math.pow(canvas.width, 2))) / 2)
    const radius = Math.random() * 2

    particles.push(new Paricles(x, y, radius,
      colors[Math.floor(Math.random() * colors.length)]))
  }
}

let alpha = 1;
let radians = 0
function animate() {
  requestAnimationFrame(animate)
  c.fillStyle = `rgba(0,0,0,${alpha})`
  c.fillRect(0, 0, canvas.width, canvas.height)

  c.save()
  c.translate(canvas.width / 2, canvas.height / 2)
  c.rotate(radians)
  particles.forEach(particle => {
    particle.update()
  })
  c.restore()

  if (mouseDown && alpha >= 0.05) {
    alpha -= 0.01
  } else if (!mouseDown && alpha < 1) {
    alpha += 0.0008
  }
  if (mouseDown) {
    radians += 0.0025
  } else if (!mouseDown) {
    radians += 0.001

  }
}

init()
animate()