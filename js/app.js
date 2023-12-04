import Contacto from "./classContacto.js";

// const contactoNuevo = new Contacto(1,'nombre','apellido','mail',12345678)

//V A R I A B L E S   G L O B A L E S 

// localStorage.getItem('agendaKey')  => lo trae en formato JSON
const agenda= JSON.parse(localStorage.getItem('agendaKey')) || []
const formNuevoContacto = document.querySelector('form')

// F U N C I O N E S 

const guardarLocalStorage =()=>{
    // 'agendaKey' es el nombre que va a tener nuesto objeto JSON en el local storage     
    localStorage.setItem('agendaKey', JSON.stringify(agenda))
    
}
const limpiarFormulario =()=>{
    formNuevoContacto.reset()
}
const cargaInicial = ()=>{
    if(agenda.length > 0)
    {
        agenda.forEach((contacto,position) => {
            crearFila(contacto,++position)
        });
    }
}

const crearFila=(contacto, fila)=>{
    const tablaContacto = document.getElementById('tablaContacto')
    tablaContacto.innerHTML += `
        <tr>
            <th scope="row">${fila}</th>
            <td>${contacto.nombre}</td>
            <td>${contacto.apellido}</td>
            <td>${contacto.email}</td>
            <td>${contacto.telefono}</td>
            <td>
            <a class="btn btn-primary" href="./pages/detalleContacto.html">Ver mas</a>
            <button class="btn btn-warning">Editar</button>
            <button class="btn btn-danger" onclick="borrarContacto('${contacto.id}')">Borrar</button>
            </td>
        </tr>
    `
}

window.borrarContacto=(idContacto)=>{  
    const posicionContato =agenda.findIndex((contacto)=>{contacto.id === idContacto})
    agenda.splice(posicionContato,1)
    guardarLocalStorage()
    
    console.log("🚀 ~ file: app.js:50 ~ borrarContacto ~ 'hola':", 'hola')

}
//L O G I C A 
cargaInicial()

formNuevoContacto.addEventListener('submit',(event)=>{
    event.preventDefault()

    const inputs = document.querySelectorAll('input')

    const contactoNuevo = new Contacto({
        id:crypto.randomUUID(),
        nombre: inputs[0].value,
        apellido: inputs[1].value,
        email: inputs[2].value,
        telefono: Number(inputs[3].value)})
    
    agenda.push(contactoNuevo)
    
    guardarLocalStorage()
    limpiarFormulario()
    crearFila(contactoNuevo,agenda.length)
})