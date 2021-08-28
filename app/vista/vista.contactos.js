// Importar los modulos necesarios
const controladorContactos = require('../controlador/controlador.contactos');
const middUsuarios = require('../../middlewares/midd.usuarios');

// Definir los endpoints y exportar los modulos
module.exports = async(app) =>{
    // Endpoint para realizar una solicitud de amistad entre dos usuarios
    app.post('/teclers/perfil/contactos/:idUsuario', middUsuarios.validarToken, middUsuarios.validarCredenciales, async(req, res) =>{
        let emisor = req.params.usuario;
        let idReceptor = req.params.idUsuario;
        try{
            let solicitud = await controladorContactos.enviarSolicitud(emisor.id_usuario, idReceptor);
            res.status(200).json({message: 'Solicitud de amistad realizada', solicitud})
        } catch(error){
            console.log(error.message);
            res.status(500).json({message: error.message});
        }
    });

    // Endpoint para visualizar las solicitudes de amistad enviadas
    app.get('/teclers/perfil/contactos/solicitudes_enviadas', middUsuarios.validarToken, middUsuarios.validarCredenciales, async(req, res) =>{
        let usuario = req.params.usuario;
        try{
            let solicitudesEnviadas = await controladorContactos.listarConexiones(usuario.id_usuario, 1);
            res.status(200).json({message: 'Consulta Exitosa', solicitudesEnviadas})
        } catch(error) {
            console.log(error.message);
            res.status(500).json({message: error.message});
        }
    });

    // Endpoint para visualizar las solicitudes de amistad recibidas
    app.get('/teclers/perfil/contactos/solicitudes_recibidas', middUsuarios.validarToken, middUsuarios.validarCredenciales, async(req, res) =>{
        let usuario = req.params.usuario;
        try{
            let solicitudesRecibidas = await controladorContactos.listarConexiones(usuario.id_usuario, 2);
            res.status(200).json({message: 'Consulta Exitosa', solicitudesRecibidas})
        } catch(error) {
            console.log(error.message);
            res.status(500).json({message: error.message});
        }
    });

    // Endpoint para visualizar los contactos del usuario
    app.get('/teclers/perfil/contactos', middUsuarios.validarToken, middUsuarios.validarCredenciales, async(req, res) =>{
        let usuario = req.params.usuario;
        try{
            let listaDeContactos = await controladorContactos.listarConexiones(usuario.id_usuario, 3);
            res.status(200).json({message: 'Consulta Exitosa', listaDeContactos});
        } catch(error) {
            console.log(error.message);
            res.status(500).json({message: error.message});
        }
    });

    // Endpoint para aceptar una solicitud de amistad
    app.patch('/teclers/perfil/contactos/aceptar/:idConexion', middUsuarios.validarToken, middUsuarios.validarCredenciales, async(req, res) =>{
        let usuario = req.params.usuario;
        let idConexion = req.params.idConexion
        try{
            await controladorContactos.aceptarSolicitud(usuario.id_usuario, idConexion);
            res.status(200).json({message: 'Solicitud aceptada'});
        } catch (error) {
            console.log(error.message);
            res.status(500).json({message: error.message});
        }
    })

    // Endpoint para eliminar un contacto o cancelar una solicitud de amistad
    app.delete('/teclers/perfil/contactos/borrar/:idConexion', middUsuarios.validarToken, middUsuarios.validarCredenciales, async(req, res) =>{
        let usuario = req.params.usuario;
        let idConexion = req.params.idConexion;
        try{
            await controladorContactos.eliminarContacto(usuario.id_usuario, idConexion);
            res.status(200).json({message: 'Eliminación exitosa'})
        } catch(error){
            console.log(error.message);
            res.status(500).json({message: error.message});
        }
    });
}