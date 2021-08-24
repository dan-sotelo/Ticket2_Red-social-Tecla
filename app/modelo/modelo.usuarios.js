// Importar los modulos necesarios
const Usuarios = require('../../db/db.modelo.usuarios');
const Paises = require('../../db/db.modelo.paises');
const Estados = require('../../db/db.modelo.estados');
const Municipios = require('../../db/db.modelo.municipios');
const bcrypt = require('bcrypt');

// Definir los modulos
let registrarUsuario = async(usuario) =>{
    try{
        let usuarioRegistrado = await Usuarios.findOne({where: {usuario_correo: `${usuario.correo}`}});
        if(usuarioRegistrado == null){
            let nuevoUsuario = await Usuarios.create({
                usuario_nombre: usuario.nombre,
                usuario_correo: usuario.correo,
                usuario_password: usuario.password,
                id_credencial: usuario.id_credencial,
                usuario_edad: usuario.edad,
                usuario_activo: usuario.activo
            });
            return nuevoUsuario;
        } else {
            throw new Error('Usuario ya registrado, por favor inicie sesión');
        }
    } catch(error) {
        console.log(`Error en el modelo al registrar al usuario: ${error}`);
        throw new Error(error.message);
    }
}

let buscarUsuario = async(usuario) =>{
    try{
        let infoUsuario = await Usuarios.findOne({where: {usuario_correo: `${usuario.correo}`}});
        if(infoUsuario != null){
            let validacionPass = await bcrypt.compare(usuario.password, infoUsuario.usuario_password);
            if(validacionPass){
                return infoUsuario;
            } else {
                console.log('La contraseña es incorrecta');
                throw new Error('La contraseña es incorrecta');
            }
        } else {
            console.log('Usuario no registrado');
            throw new Error('El usuario no esta registrado, revise su correo');
        }
    } catch(error){
        console.log(`Error en el modelo al buscar usuario: ${error}`)
        throw new Error(error.message);
    }
}

let registrarPais = async(idUsuario, pais) =>{
    let idPais;
    try{
        let paisRegistrado = await Paises.findOne({where: {pais: `${pais}`}});
        if(paisRegistrado == null){
            let nuevoPais = await Paises.create({pais: pais})
            idPais = nuevoPais.id_pais;
        } else {
            idPais = paisRegistrado.id_pais;
        }
        await Usuarios.update({id_pais: `${idPais}`}, {where: {id_usuario: `${idUsuario}`}});
    } catch(error) {
        console.log(`Error en el modelo al registrar el pais: ${error}`)
        throw new Error(error.message);
    }
}

let registrarEstado = async(idUsuario, estado) =>{
    let idEstado;
    try{
        let estadoRegistrado = await Estados.findOne({where: {estado: `${estado}`}});
        if(estadoRegistrado == null){
            let nuevoEstado = await Estados.create({estado: estado})
            idEstado = nuevoEstado.id_estado;
        } else {
            idEstado = estadoRegistrado.id_estado;
        }
        await Usuarios.update({id_estado: `${idEstado}`}, {where: {id_usuario: `${idUsuario}`}});
    } catch(error) {
        console.log(`Error en el modelo al registrar el estado: ${error}`)
        throw new Error(error.message);
    }
}

let registrarMunicipio = async(idUsuario, municipio) =>{
    let idMunicipio;
    try{
        let municipioRegistrado = await Municipios.findOne({where: {municipio: `${municipio}`}});
        if(municipioRegistrado == null){
            let nuevoMunicipio = await Municipios.create({municipio: municipio})
            idMunicipio = nuevoMunicipio.id_municipio;
        } else {
            idMunicipio = municipioRegistrado.id_municipio;
        }
        await Usuarios.update({id_municipio: `${idMunicipio}`}, {where: {id_usuario: `${idUsuario}`}});
    } catch(error) {
        console.log(`Error en el modelo al registrar el municipio: ${error}`)
        throw new Error(error.message);
    }
}

let registrarTelefono = async(idUsuario, telefono) =>{
    try{
        await Usuarios.update({usuario_telefono: `${telefono}`}, {where: {id_usuario: `${idUsuario}`}});
    } catch(error) {
        console.log(`Error en el modelo al registrar el municipio: ${error}`)
        throw new Error(error.message);
    }
}

let registrarLinkedin = async(idUsuario, linkedin) =>{
    try{
        await Usuarios.update({usuario_linkedin: `${linkedin}`}, {where: {id_usuario: `${idUsuario}`}});
    } catch(error) {
        console.log(`Error en el modelo al registrar el municipio: ${error}`)
        throw new Error(error.message);
    }
}

let registrarGithub = async(idUsuario, github) =>{
    try{
        await Usuarios.update({usuario_github: `${github}`}, {where: {id_usuario: `${idUsuario}`}});
    } catch(error) {
        console.log(`Error en el modelo al registrar el municipio: ${error}`)
        throw new Error(error.message);
    }
}

// Exportar modulos
module.exports = {registrarUsuario, buscarUsuario, registrarPais, registrarEstado, registrarMunicipio, registrarTelefono, registrarLinkedin, registrarGithub};