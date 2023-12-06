import Contacto from "./classContacto.js"

const parametroURL = new URLSearchParams(window.location.search)

const idContacto = parametroURL.get('id')

const agenda = JSON.parse(localStorage.getItem('agendaKey'))|| []

const posicionContacto = agenda.findIndex((contacto)=>contacto.id === idContacto) 

const inputs = document.querySelectorAll('input')


// muestro los datos del contacto en los inputs 
inputs[0].value= agenda[posicionContacto].nombre
inputs[1].value= agenda[posicionContacto].apellido
inputs[2].value= agenda[posicionContacto].email
inputs[3].value= agenda[posicionContacto].telefono


const formulario = document.querySelector('form')

formulario.addEventListener('submit',()=>{
    if(validarCantidadCaracteres(inputs[0].value, 4, 40)
       && validarCantidadCaracteres(inputs[1].value,4,40) 
    ){
        const contactoModificado = new Contacto({
            id:idContacto,
            nombre: inputs[0].value,
            apellido: inputs[1].value,
            email: inputs[2].value,
            telefono: Number(inputs[3].value)})
        
        agenda.agenda[posicionContacto] = contactoModificado
        
        guardarLocalStorage()
        limpiarFormulario()
    }
})