// Importar los modulos necesarios
const Hobbies = require('../../db/db.modelo.hobbies');
const HobbiesDeUsuarios = require('../../db/db.modelo.hobbiesUsuarios');

// Definir los modulos
let identificarHobbie = async(hobbie) =>{
    try{
        let hobbieRegistrado = await Hobbies.findOne({where: {hobbie: `${hobbie}`}});
        if(hobbieRegistrado == null){
            let nuevoHobbie = await Hobbies.create({hobbie: hobbie});
            return nuevoHobbie.id_hobbie;
        } else {
            return hobbieRegistrado.id_hobbie;
        }
    } catch(error) {
        console.log(`Error en el modelo al consultar el hobbie: ${error}`);
        throw new Error(error.message);
    }
}

let registrarHobbies = async(idUsuario, infoHobbie) =>{
    try{
        let idHobbie = await identificarHobbie(infoHobbie.hobbie)
        let hobbieUsuario = await HobbiesDeUsuarios.findOne({where: {id_usuario: `${idUsuario}`, id_hobbie: `${idHobbie}`}});
        if(hobbieUsuario == null){
            await HobbiesDeUsuarios.create({
                id_usuario: idUsuario,
                id_hobbie: idHobbie
            });
        } else {
            throw new Error('El hobbie ya fue registrado, puede editarlo si desea');
        }
    } catch (error) {
        console.log(`Error en el modelo al registrar los hobbies: ${error}`);
        throw new Error(error.message);
    }
}

let actualizarHobbies = async(idUsuario, infoHobbie, idHobbieUsuario) =>{
    try{
        let hobbieUsuario = await HobbiesDeUsuarios.findOne({where: {id_hobbie_de_usuario: `${idHobbieUsuario}`}});
        if (hobbieUsuario != null && hobbieUsuario.id_usuario == idUsuario){
            let idHobbie = await identificarHobbie(infoHobbie.hobbie);
            await HobbiesDeUsuarios.update({id_hobbie: `${idHobbie}`}, {where: {id_hobbie_de_usuario: `${idHobbieUsuario}`}});
        } else {
            throw new Error('No existe el registro del hobbie solicitado');
        }
    } catch(error) {
        console.log(`Error en el modelo al actualizar el hobbie del usuario: ${error}`);
        throw new Error(error.message);
    }
}

let eliminarHobbies = async(idUsuario, idHobbieUsuario) =>{
    try{
        let hobbieUsuario = await HobbiesDeUsuarios.findOne({where: {id_hobbie_de_usuario: `${idHobbieUsuario}`, id_usuario: `${idUsuario}`}});
        if(hobbieUsuario != null){
            await HobbiesDeUsuarios.destroy({where: {id_hobbie_de_usuario: `${idHobbieUsuario}`, id_usuario: `${idUsuario}`}});
        } else {
            throw new Error('No existe el registro del hobbie solicitado');
        }
    } catch(error) {
        console.log(`Error en el modelo al eliminar el hobbie: ${error}`);
        throw new Error(error.message);
    }
}

let listarHobbies = async(idUsuario) =>{
    try{
        let hobbies = await HobbiesDeUsuarios.findAll({
            attributes: {exclude: ['id_hobbie']},
            include:[
                {
                    model: Hobbies,
                    attributes: ['id_hobbie','hobbie'],
                    required: true
                }
            ],
            where: {id_usuario: `${idUsuario}`}});
        return hobbies;
    } catch(error) {
        console.log(`Error en el modelo al eliminar la certificacion: ${error}`);
        throw new Error(error.message);
    }
}

// Exportar los modulos
module.exports = {registrarHobbies, actualizarHobbies, eliminarHobbies, listarHobbies};