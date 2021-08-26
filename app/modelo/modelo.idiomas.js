// Importar los modulos necesarios
const Idiomas = require('../../db/db.modelo.idiomas');
const DominioIdiomas = require('../../db/db.modelo.dominioIdiomas');
const IdiomasDeUsuarios = require('../../db/db.modelo.idiomasUsuarios');

// Definir los modulos
let identificarIdioma = async(idioma) =>{
    try {
        let idiomaRegistrado = await Idiomas.findOne({where: {idioma: `${idioma}`}});
        if (idiomaRegistrado == null){
            let nuevoIdioma = await Idiomas.create({idioma: idioma});
            return nuevoIdioma.id_idioma;
        } else {
            return idiomaRegistrado.id_idioma;
        }
    } catch (error) {
        console.log(`Error en el modelo al consultar el idioma: ${error}`);
        throw new Error(error.message);
    }
}

let identificarNivel = async(nivel) =>{
    try{
        let nivelRegistrado = await DominioIdiomas.findOne({where: {nivel: `${nivel}`}});
        if (nivelRegistrado == null){
            let nuevoNivel = await DominioIdiomas.create({nivel: nivel});
            return nuevoNivel.id_nivel;
        } else {
            return nivelRegistrado.id_nivel;
        }
    } catch(error) {
        console.log(`Error en el modelo al consultar el nivel: ${error}`);
        throw new Error(error.message);
    }
}


let registrarIdiomas = async(idUsuario, infoIdioma) =>{
    try{
        let idIdioma = await identificarIdioma(infoIdioma.idioma);
        let idiomaUsuario = await IdiomasDeUsuarios.findOne({where: {id_usuario: `${idUsuario}`, id_idioma:`${idIdioma}`}});
        if (idiomaUsuario == null){
            let idNivel = await identificarNivel(infoIdioma.nivel);
            let idioma = await IdiomasDeUsuarios.create({
                id_usuario: idUsuario,
                id_idioma: idIdioma,
                id_nivel: idNivel
            });
            return idioma;
        } else {
            throw new Error('El idioma ya fue registrado, puede editarlo si desea')
        }
    } catch(error) {
        console.log(`Error en el modelo al registrar el idioma del usuario: ${error}`);
        throw new Error(error.message);
    }
}

let actualizarIdiomas = async(idUsuario, infoIdioma, idIdiomaUsuario) =>{
    try{
        let idiomaRegistrado = await IdiomasDeUsuarios.findOne({where: {id_idioma_de_usuario: `${idIdiomaUsuario}`}});
        if (idiomaRegistrado != null && idiomaRegistrado.id_usuario == idUsuario){
            let idIdioma = await identificarIdioma(infoIdioma.idioma);
            let idNivel = await identificarNivel(infoIdioma.nivel);
            await IdiomasDeUsuarios.update({
                id_idioma: `${idIdioma}`,
                id_nivel: `${idNivel}`
            }, {where: {id_idioma_de_usuario: `${idIdiomaUsuario}`}});
        } else {
            throw new Error('No existe el registro del idioma solicitado');
        }
    } catch(error) {
        console.log(`Error en el modelo al actualizar el idioma del usuario: ${error}`);
        throw new Error(error.message);
    }
}

let eliminarIdiomas = async(idUsuario, idIdiomaUsuario) =>{
    try{
        let idiomaRegistrado = await IdiomasDeUsuarios.findOne({where: {id_idioma_de_usuario: `${idIdiomaUsuario}`, id_usuario: `${idUsuario}`}});
        if(idiomaRegistrado != null){
            await IdiomasDeUsuarios.destroy({where: {id_idioma_de_usuario: `${idIdiomaUsuario}`, id_usuario: `${idUsuario}`}});
        } else {
            throw new Error('No existe el registro del idioma solicitado');
        }
    } catch(error) {
        console.log(`Error en el modelo al eliminar el idioma: ${error}`);
        throw new Error(error.message);
    }
}

let listarIdiomas = async(idUsuario) =>{
    try{
        let idiomas = await IdiomasDeUsuarios.findAll({
            attributes: {exclude: ['id_idioma','id_nivel']},
            include:[
                {
                    model: Idiomas,
                    attributes: ['id_idioma','idioma'],
                    required: true
                },
                {
                    model: DominioIdiomas,
                    attributes: ['id_nivel','nivel'],
                    required: true
                }
            ],
            where: {id_usuario: `${idUsuario}`}});
        return idiomas;
    } catch(error) {
        console.log(`Error en el modelo al eliminar la certificacion: ${error}`);
        throw new Error(error.message);
    }
}

// Exportar los modulos
module.exports = {registrarIdiomas, actualizarIdiomas, eliminarIdiomas, listarIdiomas};