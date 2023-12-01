import Contacto from "./classContacto.js";

// const contactoNuevo = new Contacto(1,'nombre','apellido','mail',12345678)

//variables globales
const agenda= []

const formNuevoContacto = document.querySelector('form')


// funciones

const guardarLocalStorage = ()=>{
    // 'agendaKey' es el nombre que va a tener nuesto objeto JSON en el local storage     
    localStorage.setItem('agendaKey', JSON.stringify(agenda))
    
}


//logica

formNuevoContacto.addEventListener('submit',(event)=>{
    event.preventDefault()

    const inputs = document.querySelectorAll('input')

    console.log(inputs)

    const contactoNuevo = new Contacto({
        id:1,
        nombre: inputs[0].value,
        apellido: inputs[1].value,
        email: inputs[2].value,
        telefono: Number(inputs[3].value)})
    
    agenda.push(contactoNuevo)
    
    guardarLocalStorage()

})