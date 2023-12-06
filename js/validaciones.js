export const validarCantidadCaracteres = (texto, min , max)=>{
    return texto.length >= min && texto.length <= max ? true : false
}

export const validarEmail = (texto) =>{
    const patron = /^([a-zA-Z0-9._-]+)@([a-zA-Z0-9.-]+)\.([a-zA-Z]{2,5})$/
    return patron.test(texto)
}