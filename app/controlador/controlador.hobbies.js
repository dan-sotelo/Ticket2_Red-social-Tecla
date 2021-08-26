// Importar los modulos necesarios
const modeloHobbies = require('../modelo/modelo.hobbies');

// Definir los modulos
let registrarHobbies = async(idUsuario, infoHobbie) =>{
    try{
        let hobbie = await modeloHobbies.registrarHobbies(idUsuario, infoHobbie);
        return hobbie;
    } catch(error) {
        console.log(`Error en el controlador al registrar el hobbie: ${error}`);
        throw new Error(error.message);
    }
}

let actualizarHobbies = async(idUsuario, infoHobbie, idHobbieUsuario) =>{
    try{
        await modeloHobbies.actualizarHobbies(idUsuario, infoHobbie, idHobbieUsuario);
    } catch(error) {
        console.log(`Error en el controlador al actualizar el hobbie: ${error}`);
        throw new Error(error.message);
    }
}

let eliminarHobbies = async(idUsuario, idHobbieUsuario) =>{
    try{
        await modeloHobbies.eliminarHobbies(idUsuario, idHobbieUsuario);
    } catch(error) {
        console.log(`Error en el controlador al eliminar el hobbie: ${error}`);
        throw new Error(error.message);
    }
}

let listarHobbies = async(idUsuario) =>{
    try{
        let hobbies = await modeloHobbies.listarHobbies(idUsuario);
        return hobbies;
    } catch(error) {
        console.log(`Error en el controlador al listar la educación del usuario: ${error}`);
        throw new Error(error.message);
    }
}


// Exportar los modulos
module.exports = {registrarHobbies, actualizarHobbies, eliminarHobbies, listarHobbies};