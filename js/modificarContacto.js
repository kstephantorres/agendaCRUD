import { validarCantidadCaracteres, validarEmail } from "./validaciones.js"

const parametroURL = new URLSearchParams(window.location.search)

const idContacto = parametroURL.get('id')

const agenda = JSON.parse(localStorage.getItem('agendaKey'))|| []

const posicionContacto = agenda.findIndex((contacto)=>contacto.id === idContacto) 

const inputs = document.querySelectorAll('input')


const guardarLocalStorage =()=>{
    // 'agendaKey' es el nombre que va a tener nuesto objeto JSON en el local storage     
    localStorage.setItem('agendaKey', JSON.stringify(agenda))
    
}

// muestro los datos del contacto en los inputs 
inputs[0].value= agenda[posicionContacto].nombre
inputs[1].value= agenda[posicionContacto].apellido
inputs[2].value= agenda[posicionContacto].email
inputs[3].value= agenda[posicionContacto].telefono


const formulario = document.querySelector('form')

formulario.addEventListener('submit',(event)=>{
    event.preventDefault()  
    if(validarCantidadCaracteres(inputs[0].value, 4, 40)
       && validarCantidadCaracteres(inputs[1].value,4,40) 
       && validarEmail(inputs[2].value)
    ){       
        agenda[posicionContacto].nombre = inputs[0].value
        agenda[posicionContacto].apellido = inputs[1].value
        agenda[posicionContacto].email = inputs[2].value
        agenda[posicionContacto].telefono = inputs[3].value
        guardarLocalStorage()
    }

})