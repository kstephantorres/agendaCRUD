export const validarCantidadCaracteres = (texto, min , max)=>{
    return texto.length >= min && texto.length <= max ? true : false
}