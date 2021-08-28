// Importar los modulos necesarios
const Joi = require('joi');
const {modeloRegistroEmpresa, modeloRegistroRepresentante} = require('./midd.modeloEmpresas');

// Middleware para validar datos ingresados para registrar una nueva empresa y su representante
let datosRegistroEmpresas = async(req, res, next) =>{
    try{
        await Joi.attempt(req.body.empresa, modeloRegistroEmpresa);
        next();
    } catch(error){
        console.log(error)
        res.status(400).json({message: 'Acceso denegado: Alguno de los campos cumple con los estandares'});
    }
}

let datosRegistroRepresentantes = async(req, res, next) =>{
    try{
        await Joi.attempt(req.body.representante, modeloRegistroRepresentante);
        next();
    } catch(error){
        console.log(error)
        res.status(400).json({message: 'Acceso denegado: Alguno de los campos cumple con los estandares'});
    }
}

// Exportar los modulos
module.exports = {datosRegistroEmpresas, datosRegistroRepresentantes}