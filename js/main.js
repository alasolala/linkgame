const canvas  = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

import Director from "./game/director.js"

new Director(canvas,ctx)


