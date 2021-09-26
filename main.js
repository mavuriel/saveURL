import './style.css'
import { supabase } from './supabase'

const inNombre = document.querySelector('#nombreinput')
const inURL = document.querySelector('#urlinput')
const tReg = document.querySelector('#registros')
const btnEnviar = document.querySelector('#guardar')

const date = Date.now()
console.log(Date.parse(date))

const allData = async () => {
  const { data: urlData, error } = await supabase
    .from('urlData')
    .select('*')
  clearIn()
  urlData.forEach(e => {
    tReg.insertAdjacentHTML('beforeend',
    `<tr>
      <td>${e.name_url}</td>
      <td><a href="${e.url_link}">ir a ${e.name_url}</a></td>
      <td><button value='${e.id}' class='eliminar'>Eliminar</button></td>
    </tr>`
    )
  })
}

allData()

btnEnviar.addEventListener('click', () => {
  const nombreV = inNombre.value
  const urlV = inURL.value

  insertURL(nombreV, urlV)
  allData()
})

tReg.addEventListener('click', (e) => {
  if (e.target && e.target.tagName === 'BUTTON') {
    if (e.target.classList[0] === 'eliminar') {
      const id = parseInt(e.target.value)
      deleteURl(id)
      allData()
    }
  }
})

const insertURL = async (nombre, url) => {
  const { data, error } = await supabase
    .from('urlData')
    .insert([
      {
        name_url: nombre,
        url_link: url
      }
    ])
  console.log({ data, error })

  clearIn()
}

const deleteURl = async (id) => {
  const { data, error } = await supabase
    .from('urlData')
    .delete()
    .eq('id', id)

  console.log({ data, error })
}

const clearIn = () => {
  inNombre.value = ''
  inURL.value = ''
  tReg.innerHTML = ''
}
/*
  TODO: modificar columnas
*/
