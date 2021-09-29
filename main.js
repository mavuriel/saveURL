import './style.css'
import { supabase } from './supabase'

const inId = document.querySelector('#idinput')
const inNombre = document.querySelector('#nombreinput')
const inURL = document.querySelector('#urlinput')
const tReg = document.querySelector('#registros')
const btnGuardar = document.querySelector('#btnguardar')
const timeP = document.querySelector('.time')

const wTime = new Date().getHours()

const textTime = wTime >= 19
  ? 'buenas noches (¯﹃¯)'
  : wTime >= 12 && wTime <= 18
    ? 'buenas tardes ( ͡ᵔ ᴗ ͡ᵔ)'
    : 'buenos dias ᕦ(ò_óˇ)ᕤ'

timeP.insertAdjacentText('afterbegin', textTime)

const allData = async () => {
  const { data: urlData, error } = await supabase
    .from('urlData')
    .select('*')
    .order('id', { ascending: true })
  clearIn()
  urlData.forEach(e => {
    tReg.insertAdjacentHTML('beforeend',
    `<tr>
      <td>${e.name_url}</td>
      <td><a href="${e.url_link}">ir a ${e.name_url}</a></td>
      <td>
        <button value='${e.id}' class='eliminar'>Eliminar</button>
        <button value='${e.id}' class='actualizar'>Actualizar</button>
      </td>
    </tr>`
    )
  })
  console.log({ urlData, error })
}

allData()

btnGuardar.addEventListener('click', () => {
  const idV = inId.value
  const nombreV = inNombre.value
  const urlV = inURL.value
  if (btnGuardar.value === 'insertar') {
    insertURL(nombreV, urlV)
    allData()
  } else if (btnGuardar.value === 'actualizar') {
    updateURL(idV, nombreV, urlV)
    btnGuardar.value = 'insertar'
    allData()
  }
})

tReg.addEventListener('click', (e) => {
  if (e.target && e.target.tagName === 'BUTTON') {
    if (e.target.classList[0] === 'eliminar') {
      const id = parseInt(e.target.value)
      deleteURl(id)
      allData()
    } else if (e.target.classList[0] === 'actualizar') {
      const id = parseInt(e.target.value)
      oneReg(id)
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
}

const deleteURl = async (id) => {
  const { data, error } = await supabase
    .from('urlData')
    .delete()
    .eq('id', id)

  console.log({ data, error })
}

const updateURL = async (id, nombre, url) => {
  const { data, error } = await supabase
    .from('urlData')
    .update({
      name_url: nombre,
      url_link: url
    })
    .eq('id', id)
  console.log({ data, error })
}

const oneReg = async (id) => {
  const { data: urlData, error } = await supabase
    .from('urlData')
    .select('*')
    .eq('id', id)

  urlData.forEach(e => {
    inId.value = e.id
    inNombre.value = e.name_url
    inURL.value = e.url_link
  })
  btnGuardar.value = 'actualizar'
  console.log({ urlData, error })
}

const clearIn = () => {
  inNombre.value = ''
  inURL.value = ''
  tReg.innerHTML = ''
}
