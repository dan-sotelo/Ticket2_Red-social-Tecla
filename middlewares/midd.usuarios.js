// Importar los modulos necesarios
const controladorUsuarios = require('../app/controlador/controlador.usuarios');
const rateLimit = require('express-rate-limit');
const Joi = require('joi');
const {modeloRegistro, modeloLogin, modeloInformacion, modeloCambiarPassword} = require('./midd.modeloUsuarios');
const {modeloPassword, modeloEducacion, modeloCertificacion, modeloIdiomas, modeloHobbies} = require('./midd.modeloUsuarios');

// Middleware para limitar el número de peticiones por usuario
const limiteConsultas = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Exedio el número de peticiones al servidor'
});

// Middlewares para validar los datos ingresados
let datosRegistro = async(req, res, next) =>{
    try{
        await Joi.attempt(req.body, modeloRegistro);
        next();
    }catch(error){
        console.log(error)
        res.status(400).json({message: 'Acceso denegado: Alguno de los campos cumple con los estandares'});
    }
}

let datosLogin = async(req, res, next) =>{
    try{
        await Joi.attempt(req.body, modeloLogin);
        next();
    } catch(error) {
        console.log(error);
        res.status(400).json({message: 'Acceso denegado: Alguno de los campos cumple con los estandares'});
    }
}

let datosInformacion = async(req, res, next) =>{
    try{
        await Joi.attempt(req.body, modeloInformacion);
        next();
    } catch(error) {
        console.log(error);
        res.status(400).json({message: 'Acceso denegado: Alguno de los campos cumple con los estandares'});
    }
}

let datosCambiarPassword = async(req, res, next) =>{
    try{
        await Joi.attempt(req.body, modeloCambiarPassword);
        next();
    } catch(error) {
        console.log(error);
        res.status(400).json({message: 'Acceso denegado: Alguno de los campos cumple con los estandares'});
    }
}

let datosPassword = async(req, res, next) =>{
    try{
        await Joi.attempt(req.body, modeloPassword);
        next();
    } catch(error) {
        console.log(error);
        res.status(400).json({message: 'Acceso denegado: Alguno de los campos cumple con los estandares'});
    }
}

let datosEducacion = async(req, res, next) =>{
    try{
        await Joi.attempt(req.body, modeloEducacion);
        next();
    } catch(error) {
        console.log(error);
        res.status(400).json({message: 'Acceso denegado: Alguno de los campos cumple con los estandares'});
    }
}

let datosCertificados = async(req, res, next) =>{
    try{
        await Joi.attempt(req.body, modeloCertificacion);
        next();
    } catch(error) {
        console.log(error);
        res.status(400).json({message: 'Acceso denegado: Alguno de los campos cumple con los estandares'});
    }
}

let datosIdiomas = async(req, res, next) =>{
    try{
        await Joi.attempt(req.body, modeloIdiomas);
        next();
    } catch(error) {
        console.log(error);
        res.status(400).json({message: 'Acceso denegado: Alguno de los campos cumple con los estandares'});
    }
}

let datosHobbies = async(req, res, next) =>{
    try{
        await Joi.attempt(req.body, modeloHobbies);
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
            if(verificacion.usuario != undefined){
                req.params.usuario = verificacion.usuario;
                console.log(req.params.usuario)
                return next();
            } else if (verificacion.empresa != undefined){
                req.params.empresa = verificacion.empresa;
                console.log(req.params.empresa)
                return next();
            }
        } else {
            throw new Error ('Se requiere autorización para acceder a este sistema');
        }
    } catch(error) {
        console.log(error.message);
        res.status(400).json({message: `Acceso denegado: ${error.message}`});
    }
}

// Middleware para validar credenciales
let validarCredenciales = async(req, res, next) =>{
    let infoUsuario = req.params.usuario;
    try{
        if(infoUsuario.credencial == 1 || infoUsuario.credencial == 2){
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
module.exports = {
    limiteConsultas,
    datosRegistro,
    datosLogin,
    datosInformacion,
    datosCambiarPassword,
    datosPassword,
    datosEducacion,
    datosCertificados,
    datosIdiomas,
    datosHobbies,
    validarToken,
    validarCredenciales
};