// Importar los modulos necesarios
const modeloUsuarios = require('../modelo/modelo.usuarios');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Definir los modulos
let registrarUsuario = async(usuario) =>{
    try{
        usuario.activo = true;
        usuario.id_credencial = 2;
        let encriptacion = await bcrypt.genSalt(10);
        usuario.password = await bcrypt.hash(usuario.password, encriptacion);
        let nuevoUsuario = await modeloUsuarios.registrarUsuario(usuario);
        return nuevoUsuario;
    }catch(error){
        console.log(`Error en el controlador al registrar un nuevo usuario: ${error}`);
        throw new Error(error.message);
    }
}

let buscarUsuario = async(usuario) =>{
    try{
        let infoUsuario = await modeloUsuarios.buscarUsuario(usuario);
        return infoUsuario;
    } catch(error) {
        console.log(`Error en el controlador al buscar usuario: ${error}`);
        throw new Error(error.message);
    }
}

let generarToken = async(infoUsuario) =>{
    let usuario = {
        id_usuario: infoUsuario.id_usuario,
        correo: infoUsuario.usuario_correo,
        credencial: infoUsuario.id_credencial
    };
    try{
        const token = jwt.sign({usuario}, process.env.SECRET_KEY, {expiresIn: '1h'});  //Token con validación de 1 hora
        return token;
    } catch(error) {
        console.log(`Error en el controlador al generar el token: ${error}`);
        throw new Error(error.message);
    }
}

let verificarToken = async(token) =>{
    try{
        const validacion = jwt.verify(token, process.env.SECRET_KEY);
        if (validacion){
            return validacion;
        } else {
            throw new Error('Token no valido')
        }
    } catch(error) {
        console.log(`Error en el controlador al verificar el token: ${error}`);
        throw new Error(error.message);
    }
}

let actualizarPerfilUsuario = async(idUsuario, datos) =>{
    try{
        if (datos.pais != undefined){await modeloUsuarios.registrarPais(idUsuario, datos.pais)};
        if (datos.estado != undefined){await modeloUsuarios.registrarEstado(idUsuario, datos.estado)};
        if (datos.municipio != undefined){await modeloUsuarios.registrarMunicipio(idUsuario, datos.municipio)};
        if (datos.telefono != undefined){await modeloUsuarios.registrarTelefono(idUsuario, datos.telefono)};
        if (datos.linkedin != undefined){await modeloUsuarios.registrarLinkedin(idUsuario, datos.linkedin)};
        if (datos.github != undefined){await modeloUsuarios.registrarGithub(idUsuario, datos.github)};
    } catch(error) {
        console.log(`Error en el controlador al verificar el token: ${error}`);
        throw new Error(error.message);
    }
}

// Exportar los modulos
module.exports = {registrarUsuario, buscarUsuario, generarToken, verificarToken, actualizarPerfilUsuario};