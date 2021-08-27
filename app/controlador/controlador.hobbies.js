// Importar los modulos necesarios
const modeloHobbies = require('../modelo/modelo.hobbies');

// Definir los modulos
let registrarHobbies = async(idUsuario, infoHobby) =>{
    try{
        let hobby = await modeloHobbies.registrarHobbies(idUsuario, infoHobby);
        return hobby;
    } catch(error) {
        console.log(`Error en el controlador al registrar el hobby: ${error}`);
        throw new Error(error.message);
    }
}

let actualizarHobbies = async(idUsuario, infoHobby, idHobbyUsuario) =>{
    try{
        await modeloHobbies.actualizarHobbies(idUsuario, infoHobby, idHobbyUsuario);
    } catch(error) {
        console.log(`Error en el controlador al actualizar el hobby: ${error}`);
        throw new Error(error.message);
    }
}

let eliminarHobbies = async(idUsuario, idHobbyUsuario) =>{
    try{
        await modeloHobbies.eliminarHobbies(idUsuario, idHobbyUsuario);
    } catch(error) {
        console.log(`Error en el controlador al eliminar el hobby: ${error}`);
        throw new Error(error.message);
    }
}

let listarHobbies = async(idUsuario) =>{
    try{
        let hobbies = await modeloHobbies.listarHobbies(idUsuario);
        return hobbies;
    } catch(error) {
        console.log(`Error en el controlador al listar los hobbies del usuario: ${error}`);
        throw new Error(error.message);
    }
}


// Exportar los modulos
module.exports = {registrarHobbies, actualizarHobbies, eliminarHobbies, listarHobbies};