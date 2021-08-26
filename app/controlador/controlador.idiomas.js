// Importar los modulos necesarios
const modeloIdiomas = require('../modelo/modelo.idiomas');

// Definir los modulos
let registrarIdiomas = async(idUsuario, infoIdioma) =>{
    try{
        let idiomas = await modeloIdiomas.registrarIdiomas(idUsuario, infoIdioma);
        return idiomas;
    } catch(error) {
        console.log(`Error en el controlador al registrar el idioma: ${error}`);
        throw new Error(error.message);
    }
}

let actualizarIdiomas = async(idUsuario, infoIdioma, idIdioma) =>{
    try{
        await modeloIdiomas.actualizarIdiomas(idUsuario, infoIdioma, idIdioma);
    } catch(error) {
        console.log(`Error en el controlador al actualizar el idioma: ${error}`);
        throw new Error(error.message);
    }
}

let eliminarIdiomas = async(idUsuario, idIdioma) =>{
    try{
        await modeloIdiomas.eliminarIdiomas(idUsuario, idIdioma);
    } catch(error) {
        console.log(`Error en el controlador al eliminar el idioma: ${error}`);
        throw new Error(error.message);
    }
}

let listarIdiomas = async(idUsuario) =>{
    try{
        let idiomas = await modeloIdiomas.listarIdiomas(idUsuario);
        return idiomas;
    } catch(error) {
        console.log(`Error en el controlador al listar la educación del usuario: ${error}`);
        throw new Error(error.message);
    }
}


// Exportar los modulos
module.exports = {registrarIdiomas, actualizarIdiomas, eliminarIdiomas, listarIdiomas};