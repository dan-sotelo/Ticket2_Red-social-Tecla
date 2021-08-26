// Importar los modulos necesarios
const modeloEducacion = require('../modelo/modelo.educacion');

// Definir los modulos
let registrarEducacion = async(idUsuario, infoEducacion) =>{
    try{
        let educacion = await modeloEducacion.registrarEducacion(idUsuario, infoEducacion);
        return educacion;
    } catch(error) {
        console.log(`Error en el controlador al registrar grados academicos: ${error}`);
        throw new Error(error.message);
    }
}

let actualizarEducacion = async(idUsuario, infoEducacion, idEducacion) =>{
    try{
        await modeloEducacion.actualizarEducacion(idUsuario, infoEducacion, idEducacion);
    } catch(error) {
        console.log(`Error en el controlador al actualizar grados academicos: ${error}`);
        throw new Error(error.message);
    }
}

let eliminarEducacion = async(idUsuario, idEducacion) =>{
    try{
        await modeloEducacion.eliminarEducacion(idUsuario, idEducacion);
    } catch(error) {
        console.log(`Error en el controlador al eliminar los grados academicos: ${error}`);
        throw new Error(error.message);
    }
}

let listarEducacion = async(idUsuario) =>{
    try{
        let educacion = await modeloEducacion.listarEducacion(idUsuario);
        return educacion;
    } catch(error) {
        console.log(`Error en el controlador al listar la educación del usuario: ${error}`);
        throw new Error(error.message);
    }
}

let registrarCertificacion = async(idUsuario, infoCertificacion) =>{
    try{
        let certificacion = await modeloEducacion.registrarCertificacion(idUsuario, infoCertificacion);
        return certificacion;
    } catch(error) {
        console.log(`Error en el controlador al registrar la certificación: ${error}`);
        throw new Error(error.message);
    }
}

let actualizarCertificacion = async(idUsuario, infoCertificacion, idCertificacion) =>{
    try{
        await modeloEducacion.actualizarCertificacion(idUsuario, infoCertificacion, idCertificacion);
    } catch(error) {
        console.log(`Error en el controlador al actualizar la certificación: ${error}`);
        throw new Error(error.message);
    }
}

let eliminarCertificacion = async(idUsuario, idCertificacion) =>{
    try{
        await modeloEducacion.eliminarCertificacion(idUsuario, idCertificacion);
    } catch(error) {
        console.log(`Error en el controlador al eliminar la certificacion: ${error}`);
        throw new Error(error.message);
    }
}

let listarCertificaciones = async(idUsuario) =>{
    try{
        let certificaciones = await modeloEducacion.listarCertificaciones(idUsuario);
        return certificaciones;
    } catch(error) {
        console.log(`Error en el controlador al listar las certificaciones del usuario: ${error}`);
        throw new Error(error.message);
    }
}

// Exportar los modulos
module.exports = {registrarEducacion, actualizarEducacion, eliminarEducacion, listarEducacion, registrarCertificacion, actualizarCertificacion, eliminarCertificacion, listarCertificaciones};