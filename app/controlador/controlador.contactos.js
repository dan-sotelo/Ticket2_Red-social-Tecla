// Importar los modulos necesarios
const modeloContactos = require('../modelo/modelo.contactos');

// Definir los modulos
let enviarSolicitud = async(idEmisor, idReceptor) =>{
    try{
        let solicitud = await modeloContactos.enviarSolicitud(idEmisor, idReceptor);
        return solicitud;
    } catch(error) {
        console.log(`Error en el controlador al realizar la solicitud: ${error}`);
        throw new Error(error.message);
    }
}

let listarConexiones = async(idUsuario, idRelacion) =>{
    try{
        let solicitudesRecibidas = await modeloContactos.listarConexiones(idUsuario,idRelacion);
        return solicitudesRecibidas;
    } catch(error) {
        console.log(`Error en el controlador al listar las solicitudes: ${error}`);
        throw new Error(error.message);
    }
}

let aceptarSolicitud = async(idUsuario, idConexion) =>{
    try{
        await modeloContactos.aceptarSolicitud(idUsuario, idConexion);
    } catch(error) {
        console.log(`Error en el controlador al aceptar la solicitud de amistad: ${error}`);
        throw new Error(error.message);
    }
}

let eliminarContacto = async(idUsuario, idConexion) =>{
    try{
        await modeloContactos.eliminarContacto(idUsuario, idConexion);
    } catch(error) {
        console.log(`Error en el controlador al eliminar el hobbie: ${error}`);
        throw new Error(error.message);
    }
}

let buscarConexion = async(idUsuario, idContacto, idRelacion) =>{
    try{
        return amistad = await modeloContactos.buscarConexion(idUsuario, idContacto, idRelacion);
    } catch(error) {
        console.log(`Error en el controlador al eliminar buscar la conexion: ${error}`);
        throw new Error(error.message);
    }
}

// Exportar los modulos
module.exports = {enviarSolicitud, listarConexiones, aceptarSolicitud, eliminarContacto, buscarConexion};