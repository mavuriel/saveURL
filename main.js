import './style.css'

const inNombre = document.querySelector('#nombreinput')
const inURL = document.querySelector('#urlinput')
// const tReg = document.querySelector('#registros')

const btnEnviar = document.querySelector('#guardar')

// eslint-disable-next-line prefer-const
let paginas = []

btnEnviar.addEventListener('click', () => {
  const nombre = inNombre.value
  const url = inURL.value
  // const btnEliminar = "<input id='eliminar' type='button' value=" + nombre + '>'
  console.log('hola')
  paginas.push({ nombre, url })
  console.log(paginas.length)
})

console.log(paginas.length)
// paginas.forEach(e => console.log(e.nombre))
