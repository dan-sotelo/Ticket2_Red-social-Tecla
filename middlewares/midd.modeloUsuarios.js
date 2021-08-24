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

    modeloIniciarSesion: Joi.object().keys({
        correo: Joi.string().email().max(50).required(),
        password: Joi.string().regex(/^[a-zA-Z0-9]{8,15}$/).min(8).required()
    }).with('correo','password'),

    modeloDomicilioContacto: Joi.object().keys({
        pais: Joi.string().min(3).max(20),
        estado: Joi.string().min(3).max(20),
        municipio: Joi.string().min(3).max(40),
        telefono: Joi.string().min(10).max(15),
        linkedin: Joi.string().min(10).max(100),
        github: Joi.string().min(10).max(50)
    })
}