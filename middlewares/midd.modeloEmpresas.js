// Importar los modulos necesarios
const Joi = require('joi');

// Exportar los modelos
module.exports = {
    modeloRegistroEmpresa: Joi.object().keys({
        nombreEmpresa: Joi.string().min(4).max(100).required(),
        correoEmpresa: Joi.string().email().max(50).required(),
        password: Joi.string().regex(/^[a-zA-Z0-9]{8,15}$/).min(8).required(),
    }),

    modeloRegistroRepresentante: Joi.object().keys({
        nombreRepresentante: Joi.string().min(4).max(100).required(),
        correoRepresentante: Joi.string().email().max(50).required(),
        telefono: Joi.string().min(10).max(15).required(),
        departamento: Joi.string().min(4).max(40).required(),
        cargo: Joi.string().min(4).max(30).required(),
    })
}