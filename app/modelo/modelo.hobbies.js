// Importar los modulos necesarios
const Hobbies = require('../../db/db.modelo.hobbies');
const HobbiesDeUsuarios = require('../../db/db.modelo.hobbiesUsuarios');

// Definir los modulos
let identificarHobby = async(hobby) =>{
    try{
        let hobbyRegistrado = await Hobbies.findOne({where: {hobbie: `${hobby}`}});
        if(hobbyRegistrado == null){
            let nuevoHobby = await Hobbies.create({hobbie: hobby});
            return nuevoHobby.id_hobbie;
        } else {
            return hobbyRegistrado.id_hobbie;
        }
    } catch(error) {
        console.log(`Error en el modelo al consultar el hobbie: ${error}`);
        throw new Error(error.message);
    }
}

let registrarHobbies = async(idUsuario, infoHobby) =>{
    try{
        let idHobby = await identificarHobby(infoHobby.hobby)
        let hobbyUsuario = await HobbiesDeUsuarios.findOne({where: {id_usuario: `${idUsuario}`, id_hobbie: `${idHobby}`}});
        if(hobbyUsuario == null){
            await HobbiesDeUsuarios.create({
                id_usuario: idUsuario,
                id_hobbie: idHobby
            });
        } else {
            throw new Error('El hobby ya fue registrado, puede editarlo si desea');
        }
    } catch (error) {
        console.log(`Error en el modelo al registrar los hobbies: ${error}`);
        throw new Error(error.message);
    }
}

let actualizarHobbies = async(idUsuario, infoHobby, idHobbyUsuario) =>{
    try{
        let hobbyUsuario = await HobbiesDeUsuarios.findOne({where: {id_hobbie_de_usuario: `${idHobbyUsuario}`}});
        if (hobbyUsuario != null && hobbyUsuario.id_usuario == idUsuario){
            let idHobby = await identificarHobby(infoHobby.hobby);
            await HobbiesDeUsuarios.update({id_hobbie: `${idHobby}`}, {where: {id_hobbie_de_usuario: `${idHobbyUsuario}`}});
        } else {
            throw new Error('No existe el registro del hobby solicitado');
        }
    } catch(error) {
        console.log(`Error en el modelo al actualizar el hobbie del usuario: ${error}`);
        throw new Error(error.message);
    }
}

let eliminarHobbies = async(idUsuario, idHobbyUsuario) =>{
    try{
        let hobbyUsuario = await HobbiesDeUsuarios.findOne({where: {id_hobbie_de_usuario: `${idHobbyUsuario}`, id_usuario: `${idUsuario}`}});
        if(hobbyUsuario != null){
            await HobbiesDeUsuarios.destroy({where: {id_hobbie_de_usuario: `${idHobbyUsuario}`, id_usuario: `${idUsuario}`}});
        } else {
            throw new Error('No existe el registro del hobby solicitado');
        }
    } catch(error) {
        console.log(`Error en el modelo al eliminar el hobbie: ${error}`);
        throw new Error(error.message);
    }
}

let listarHobbies = async(idUsuario) =>{
    try{
        let hobbies = await HobbiesDeUsuarios.findAll({
            attributes: [['id_hobbie_de_usuario','idHobbyUsuario'],'fecha_registro','fecha_actualizacion'],
            include: [{model: Hobbies, attributes: [['hobbie','hobby']], required: true}],
            where: {id_usuario: `${idUsuario}`}});
        return hobbies;
    } catch(error) {
        console.log(`Error en el modelo al eliminar la certificacion: ${error}`);
        throw new Error(error.message);
    }
}

// Exportar los modulos
module.exports = {registrarHobbies, actualizarHobbies, eliminarHobbies, listarHobbies};