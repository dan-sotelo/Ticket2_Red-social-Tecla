// Importar los modulos necesarios
const Comentarios = require('../../db/db.modelo.comentarios');
const Usuarios = require('../../db/db.modelo.usuarios');
const Empresas = require('../../db/db.modelo.empresas');

// Definir los modulos
let enviarComentario = async(emisor, idEmisor, mensaje, idReceptor) =>{
    try{
        let receptorRegistrado = await Usuarios.findOne({where: {id_usuario: `${idReceptor}`, usuario_activo: true}});
        if (receptorRegistrado != null){
            if (emisor == 'usuario'){
                return comentario = await Comentarios.create({id_usuario_receptor: idReceptor, id_usuario_emisor: idEmisor, comentario: mensaje});
            } else if(emisor == 'empresa') {
                return comentario = await Comentarios.create({id_usuario_receptor: idReceptor, id_empresa_emisora: idEmisor, comentario: mensaje});
            }
        } else {
            throw new Error('El usuario no se encuentra registrado')
        }
    } catch(error) {
        console.log(`Error en el modelo al registrar el comentario: ${error}`);
        throw new Error(error.message);
    }
}

let listarComentarios = async(idUsuario) =>{
    try{
        let comentarios = { 
            Usuarios: await Comentarios.findAll({
                attributes: [['id_comentario','idComentario'],'fecha_registro', 'comentario'],
                include:[{model: Usuarios, attributes: [['id_usuario','idEmisor'],['usuario_nombre','contacto']], required:true}],
                where: {id_usuario_receptor: `${idUsuario}`}
            }),
            Empresas: await Comentarios.findAll({
                attributes: [['id_comentario','idComentario'],'fecha_registro', 'comentario'],
                include:[{model: Empresas, attributes: [['id_empresa','idEmpresa'],['empresa_nombre','empresa']], required:true}],
                where: {id_usuario_receptor: `${idUsuario}`}
            })
        }
        return comentarios;
    } catch(error) {
        console.log(`Error en el modelo al listar los comentarios: ${error}`);
        throw new Error(error.message);
    }
}

// Exportar los modulos
module.exports = {enviarComentario, listarComentarios}