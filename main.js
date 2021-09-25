import './style.css'

const inNombre = document.querySelector('#nombreinput')
const inURL = document.querySelector('#urlinput')
const tReg = document.querySelector('#registros')
const btnEnviar = document.querySelector('#guardar')

const paginas = []

btnEnviar.addEventListener('click', () => {
  const nombre = inNombre.value
  const url = inURL.value
  paginas.push({ nombre, url })
  tReg.innerHTML = ''
  agregar()
})

const agregar = () => {
  paginas.forEach((e) => {
    tReg.insertAdjacentHTML('beforeend',
      '<tr>' +
      '<td>' + e.nombre + '</td>' +
      '<td><a href="' + e.url + '">' + e.nombre + '</a></td>' +
      '<td>eliminar</td>' +
      '</tr>')
  })
}
