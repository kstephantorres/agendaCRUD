import Contacto from "./classContacto.js";
import { validarCantidadCaracteres } from "./validaciones.js";

// const contactoNuevo = new Contacto(1,'nombre','apellido','mail',12345678)

//V A R I A B L E S   G L O B A L E S 

// localStorage.getItem('agendaKey')  => lo trae en formato JSON
const agenda= JSON.parse(localStorage.getItem('agendaKey')) || []
const formNuevoContacto = document.querySelector('form')
const tablaContacto = document.getElementById('tablaContacto')

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
    // const tablaContacto = document.getElementById('tablaContacto')
    tablaContacto.innerHTML += `
        <tr>
            <th scope="row">${fila}</th>
            <td>${contacto.nombre}</td>
            <td>${contacto.apellido}</td>
            <td>${contacto.email}</td>
            <td>${contacto.telefono}</td>
            <td>
            <button class="btn btn-primary" onclick="detalleContacto('${contacto.id}')">Ver mas</button>
            <button class="btn btn-warning" onclick="editarContacto('${contacto.id}')">Editar</button>
            <button class="btn btn-danger" onclick="borrarContacto('${contacto.id}')">Borrar</button>
            </td>
        </tr>
    `
}

window.borrarContacto=(idContacto)=>{  
    // Animacion para confirmar o aprobar la elimiacion de un contacto
    
    Swal.fire({
        title: "¿Estas seguro?",
        text: "No podras recuperar los datos borrados.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, borralo!",
        cancelButtonText: "Cancelar"
      }).then((result) => {
        if (result.isConfirmed) {
            // aqui ponemos logica para borrar 
            const posicionContato = agenda.findIndex((contacto)=>contacto.id === idContacto)   
            agenda.splice(posicionContato,1)
            guardarLocalStorage()
            borrarFila(posicionContato)
            // 
          Swal.fire({
            title: "Borrado!",
            text: "El contacto fue borrardo.",
            icon: "success"
          });
        }
      });
}

const borrarFila=(posicionContato)=>{
    tablaContacto.removeChild(tablaContacto.children[posicionContato])
    actualizarNumero(posicionContato)
}

const actualizarNumero=(posicionContato)=>{
    const cantidad = tablaContacto.children.length
    for(let i = posicionContato; i < cantidad;i++){
        tablaContacto.children[i].children[0].innerText = i+1
    }
}

window.detalleContacto=(idContacto)=>{
    
    console.log("🚀 ~ file: app.js:89 ~ window.location:", window.location)
    window.location.href = window.location.origin+'/pages/detalleContacto.html'
}
//L O G I C A 
cargaInicial()

formNuevoContacto.addEventListener('submit',(event)=>{
    event.preventDefault()
    
    const inputs = document.querySelectorAll('input')
    if(validarCantidadCaracteres(inputs[0].value, 4, 40)
       && validarCantidadCaracteres(inputs[1].value,4,40) 
    ){

    }
   

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