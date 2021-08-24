// Importar los modulos necesarios
const controladorUsuarios = require('../app/controlador/controlador.usuarios');
const rateLimit = require('express-rate-limit');
const Joi = require('joi');
const {modeloRegistro, modeloIniciarSesion, modeloDomicilioContacto} = require('./midd.modeloUsuarios');

// Middleware para limitar el número de peticiones por usuario
const limiteConsultas = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Exedio el número de peticiones al servidor'
});

// Middleware para validar los datos ingresados para inciar sesión o registrar un usuario
let datosRegistro = async(req, res, next) =>{
    try{
        await Joi.attempt(req.body, modeloRegistro);
        next();
    }catch(error){
        console.log(error)
        res.status(400).json({message: 'Acceso denegado: Alguno de los campos cumple con los estandares'});
    }
}

let datosIniciarSesion = async(req, res, next) =>{
    try{
        await Joi.attempt(req.body, modeloIniciarSesion);
        next();
    } catch(error) {
        console.log(error);
        res.status(400).json({message: 'Acceso denegado: Alguno de los campos cumple con los estandares'});
    }
}

// Middleware para validar el ingreso de datos para completar el perfil de usuario
let datosContacto = async(req, res, next) =>{
    try{
        await Joi.attempt(req.body, modeloDomicilioContacto);
        next();
    } catch(error) {
        console.log(error);
        res.status(400).json({message: 'Acceso denegado: Alguno de los campos cumple con los estandares'});
    }
}

// Middleware para validar acceso por token
let validarToken = async(req, res, next) =>{
    try{
        if (req.headers.authorization != undefined){
            const token = req.headers.authorization.split(' ')[1];
            let verificacion = await controladorUsuarios.verificarToken(token);
            req.params.usuario = verificacion.usuario;
            return next();
        } else {
            throw new Error ('Se requiere autorización para acceder a este sistema');
        }
    } catch(error) {
        console.log(error.message);
        res.status(400).json({message: `Acceso denegado: ${error.message}`});
    }
}

// Validar credenciales de usuario
let validarCredencialUsuario = async(req, res, next) =>{
    let infoUsuario = req.params.usuario;
    let developerRegistrado = 2;
    try{
        if(infoUsuario.credencial == developerRegistrado){
            return next();
        } else {
            throw new Error ('Usuario invalido');
        }
    } catch(error) {
        console.log(error.message);
        res.status(400).json({message: `Acceso denegado: ${error.message}`});
    }
}

// Exportar los modulos
module.exports = {limiteConsultas, datosRegistro, datosIniciarSesion, datosContacto, validarToken, validarCredencialUsuario};