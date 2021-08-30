// Importar los modulos necesarios
const modeloComentarios = require('../modelo/modelo.comentarios');

// Definir los modulos
let enviarComentario = async(emisor, idEmisor, mensaje, idReceptor) =>{
    try{
        let comentario = await modeloComentarios.enviarComentario(emisor, idEmisor, mensaje, idReceptor);
        return comentario;
    } catch(error) {
        console.log(`Error en el controlador al registrar el comentario: ${error}`);
        throw new Error(error.message);
    }
}

let listarComentarios = async(idUsuario) =>{
    try{
        let comentarios = await modeloComentarios.listarComentarios(idUsuario);
        return comentarios;
    } catch(error) {
        console.log(`Error en el controlador al listar los comentarios: ${error}`);
        throw new Error(error.message);
    }
}

// Exportar los modulos
module.exports = {enviarComentario, listarComentarios};