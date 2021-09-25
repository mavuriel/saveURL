import './style.css'
import { supabase } from './supabase'

// const inNombre = document.querySelector('#nombreinput')
// const inURL = document.querySelector('#urlinput')
const tReg = document.querySelector('#registros')
// const btnEnviar = document.querySelector('#guardar')

// const paginas = []

const allData = async () => {
  const { data: urlData, error } = await supabase
    .from('urlData')
    .select('*')

  tReg.innerHTML = ''
  urlData.forEach(e => {
    tReg.insertAdjacentHTML('beforeend',
    `<tr>
      <td>${e.name_url}</td>
      <td><a href="${e.url_link}">ir a ${e.name_url}</a></td>
      <td>Eliminar</td>
    </tr>`
    )
  })
}

allData()
/* btnEnviar.addEventListener('click', () => {
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
} */
