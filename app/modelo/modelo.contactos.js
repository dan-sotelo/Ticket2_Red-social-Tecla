// Importar los modulos necesarios
const Relacion = require('../../db/db.modelo.relacionUsuarios');
const Contactos = require('../../db/db.modelo.contactos');
const Usuarios = require('../../db/db.modelo.usuarios');

// Definir los modulos
let enviarSolicitud = async(idEmisor, idReceptor) =>{
    try{
        let receptorRegistrado = await Usuarios.findOne({where: {id_usuario: `${idReceptor}`, usuario_activo: true}});
        if (receptorRegistrado){
            let solicitudRegistrada = await Contactos.findOne({where: {id_usuario: `${idEmisor}`, id_contacto: `${idReceptor}`}});
            if(solicitudRegistrada == null){
                let solicitudEnviada = await Contactos.create({
                    id_usuario: idEmisor,
                    id_contacto: idReceptor,
                    id_relacion: 1
                });
                let solicitudRecibida = await Contactos.create({
                    id_usuario: idReceptor,
                    id_contacto: idEmisor,
                    id_relacion: 2
                });
                let solicitud = {solicitudEnviada, solicitudRecibida}
                return solicitud;
            } else {
                throw new Error('Ya se relizó una solcitud de amistad previamente');
            }
        } else {
            throw new Error('El usuario que desea contactar no se encuentra registrado')
        }
    } catch (error) {
        console.log(`Error en el modelo al registrar los Relacion: ${error}`);
        throw new Error(error.message);
    }
}

let listarConexiones = async(idUsuario, idRelacion) =>{
    try{
        let conexion = await Contactos.findAll({
            attributes: [['id_conexion','idConexion'],'fecha_registro'],
            include: [
                {model: Usuarios, attributes: ['id_usuario',['usuario_nombre','contacto']], required:true},
                {model: Relacion, attributes: ['relacion'], required: true}
            ],
            where: {id_usuario: `${idUsuario}`, id_relacion: `${idRelacion}`}
        });
        if(conexion.length > 0){
            return conexion;
        } else {
            throw new Error('No existen registros');
        }
    } catch(error) {
        console.log(`Error en el modelo al listar las conexiones: ${error}`);
        throw new Error(error.message);
    }
}

let aceptarSolicitud = async(idUsuario, idConexion) =>{
    try{
        let idRelacion = 2;
        let conexionRegistrada = await Contactos.findOne({where: {id_conexion: `${idConexion}`, id_usuario: `${idUsuario}`, id_relacion: `${idRelacion}`}});
        if(conexionRegistrada != null){
            idRelacion = 3;
            await Contactos.update({id_relacion: `${idRelacion}`}, {where: {id_conexion: `${idConexion}`}});
            await Contactos.update({id_relacion: `${idRelacion}`}, {where: {id_usuario: `${conexionRegistrada.id_contacto}`, id_contacto: `${idUsuario}`}});
        } else {
            throw new Error('El registro no existe')
        }
    } catch(error) {
        console.log(`Error en el modelo al aceptar la solicitud: ${error}`);
        throw new Error(error.message);
    }
}

let eliminarContacto = async(idUsuario, idConexion) =>{
    try{
        let conexionRegistrada = await Contactos.findOne({where: {id_conexion: `${idConexion}`, id_usuario: `${idUsuario}`}});
        if(conexionRegistrada != null){
            await Contactos.destroy({where: {id_conexion: `${idConexion}`}});
            await Contactos.destroy({where: {id_usuario: `${conexionRegistrada.id_contacto}`, id_contacto: `${idUsuario}`}});
        } else {
            throw new Error('El registro no existe')
        }
    } catch(error) {
        console.log(`Error en el modelo al eliminar el contacto: ${error}`);
        throw new Error(error.message);
    }
}

let buscarConexion = async(idUsuario, idContacto, idRelacion) =>{
    try{
        let contacto = await Contactos.findOne({where: {id_usuario: `${idUsuario}`, id_contacto:`${idContacto}`, id_relacion: `${idRelacion}`}});
        if(contacto!=null){
            return true;
        } else {
            return false;
        }
    } catch(error) {
        console.log(`Error en el modelo al eliminar el contacto: ${error}`);
        throw new Error(error.message);
    }
}

// Exportar los modulos
module.exports = {enviarSolicitud, listarConexiones, aceptarSolicitud, eliminarContacto, buscarConexion};