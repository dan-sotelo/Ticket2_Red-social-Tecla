// Importar olos modulos necesarios
const controladorContactos = require('../app/controlador/controlador.contactos');

// Middleware para validar credenciales de administrador
let validarCredencialAdministrador = async(req, res, next) =>{
    let infoUsuario = req.params.usuario;
    let administrador = 1;
    try{
        if(infoUsuario.credencial == administrador){
            return next();
        } else {
            throw new Error ('Usuario invalido');
        }
    } catch(error) {
        console.log(error.message);
        res.status(400).json({message: `Acceso denegado: ${error.message}`});
    }
}

// Middleware para validar credenciales especiales (Acceso de empresas, administradores o amigos de usuario)
let validarCredencialEspecial = async(req, res, next) =>{
    let infoUsuario;
    if(req.params.usuario != undefined){
        infoUsuario = req.params.usuario;
        amigos = await controladorContactos.buscarConexion(infoUsuario.id_usuario, req.params.idUsuario, 3);
    } else if(req.params.empresa != undefined){
        infoUsuario = req.params.empresa;
    }
    let administrador = 1;
    let empresas = 3;
    try{
        if(infoUsuario.credencial == administrador || infoUsuario.credencial == empresas || amigos){
            return next();
        } else {
            throw new Error ('Usuario invalido');
        }
    } catch(error) {
        console.log(error.message);
        res.status(400).json({message: `Acceso denegado: ${error.message}`});
    }
}

module.exports = {validarCredencialAdministrador, validarCredencialEspecial};