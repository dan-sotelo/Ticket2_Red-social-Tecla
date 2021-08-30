// Importar los modulos necesarios
const middAdministrador = require('../../middlewares/midd.administrador');
const middUsuarios = require('../../middlewares/midd.usuarios');
const controladorComentarios = require('../controlador/controlador.comentarios');

// Definir los endpoints y exportar los modulos
module.exports = async(app) =>{
    // Endpoint para realizar un comentario (Acceso, solo empreseas, administrador o contactos del usuario)
    app.post('/teclers/comentarios/:idUsuario', middUsuarios.validarToken, middAdministrador.validarCredencialEspecial, async(req, res) =>{
        let idReceptor = req.params.idUsuario;
        let mensaje = req.body.comentario;
        let idEmisor;
        let emisor;
        try{
            if(req.params.usuario != undefined){
                idEmisor = req.params.usuario.id_usuario;
                emisor = 'usuario';
            } else if (req.params.empresa != undefined){
                idEmisor = req.params.empresa.id_empresa;
                emisor = 'empresa';
            }
            let comentario = await controladorComentarios.enviarComentario(emisor, idEmisor, mensaje, idReceptor);
            res.status(200).json({message: 'Comentario realizado exitosamente', comentario})
        } catch(error){
            console.log(error.message);
            res.status(500).json({message: error.message});
        }
    });

    // Endpoint para que cada usuario pueda visualizar todos los comentarios
    app.get('/teclers/comentarios', middUsuarios.validarToken, middUsuarios.validarCredenciales, async(req, res) =>{
        let idUsuario = req.params.usuario.id_usuario;
        try{
            let comentarios = await controladorComentarios.listarComentarios(idUsuario);
            res.status(200).json({message: 'Consulta Exitosa', comentarios})
        } catch(error) {
            console.log(error.message);
            res.status(500).json({message: error.message});
        }
    });
}