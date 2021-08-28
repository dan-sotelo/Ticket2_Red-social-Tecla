// Importar los modulos necesarios
const Joi = require('joi');

// Exportar los modelos
module.exports = {
    modeloRegistro: Joi.object().keys({
        nombre: Joi.string().min(4).max(100).required(),
        correo: Joi.string().email().max(50).required(),
        password: Joi.string().regex(/^[a-zA-Z0-9]{8,15}$/).min(8).required(),
        edad: Joi.number().integer().required(),
    }),

    modeloLogin: Joi.object().keys({
        correo: Joi.string().email().max(50).required(),
        password: Joi.string().regex(/^[a-zA-Z0-9]{8,15}$/).min(8).required()
    }).with('correo','password'),

    modeloInformacion: Joi.object().keys({
        pais: Joi.string().min(3).max(20),
        estado: Joi.string().min(3).max(20),
        municipio: Joi.string().min(3).max(40),
        telefono: Joi.string().min(10).max(15),
        linkedin: Joi.string().min(10).max(100),
        github: Joi.string().min(10).max(50)
    }),

    modeloCambiarPassword: Joi.object().keys({
        correo: Joi.string().email().max(50).required(),
        passwordActual: Joi.string().regex(/^[a-zA-Z0-9]{8,15}$/).min(8).required(),
        passwordNueva: Joi.string().regex(/^[a-zA-Z0-9]{8,15}$/).min(8).required()
    }),

    modeloPassword: Joi.object().keys({
        password: Joi.string().regex(/^[a-zA-Z0-9]{8,15}$/).min(8).required()
    }),

    modeloEducacion: Joi.object().keys({
        gradoAcademico: Joi.string().min(5).max(25).required(),
        escuela: Joi.string().min(5).max(100).required(),
        estatus: Joi.string().min(5).max(100).required(),
        promedio: Joi.number().required()
    }),

    modeloCertificacion: Joi.object().keys({
        certificacion: Joi.string().min(5).max(25).required(),
        institucion: Joi.string().min(5).max(100).required(),
        expedicion: Joi.string().max(15),
        expiracion: Joi.string().max(15),
        folio: Joi.string().max(50)
    }),

    modeloIdiomas: Joi.object().keys({
        idioma: Joi.string().min(4).max(15).required(),
        nivel: Joi.string().min(2).max(15).required(),
    }), 

    modeloHobbies: Joi.object().keys({
        hobby: Joi.string().min(3).max(20).required()
    })
}