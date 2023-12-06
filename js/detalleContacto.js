
// window.location.serch === ?id=e4d0d163-995a-4387-a278-f5f87257a02b

const parametroURL = new URLSearchParams(window.location.search)

const idContacto = parametroURL.get('id')

const agenda = JSON.parse(localStorage.getItem('agendaKey'))|| []

const posicionContacto = agenda.findIndex((contacto)=>contacto.id === idContacto) 

const inputs = document.querySelectorAll('input')

inputs[0].value= agenda[posicionContacto].nombre
inputs[1].value= agenda[posicionContacto].apellido
inputs[2].value= agenda[posicionContacto].email
inputs[3].value= agenda[posicionContacto].telefono
