// Importar los modulos necesarios
const controladorEducacion = require('../controlador/controlador.educacion');
const middUsuarios = require('../../middlewares/midd.usuarios');

// Definir los endpoints y exportar los modulos
module.exports = async(app) =>{
    // Endpoint para registrar el grado academico
    app.post('/teclers/perfil/educacion', middUsuarios.validarToken, middUsuarios.validarCredencialUsuario, middUsuarios.datosEducacion, async(req, res) =>{
        let usuario = req.params.usuario;
        let infoEducacion = req.body;
        try{
            let educacion = await controladorEducacion.registrarEducacion(usuario.id_usuario, infoEducacion);
            res.status(500).json({message: 'Registro exitoso', educacion})
        } catch(error){
            console.log(error.message);
            res.status(500).json({message: error.message});
        }
    });

    // Endpoint para actualizar la información de educación de un usuario
    app.patch('/teclers/perfil/educacion/:idEducacion', middUsuarios.validarToken, middUsuarios.validarCredencialUsuario, middUsuarios.datosEducacion, async(req, res) =>{
        let usuario = req.params.usuario;
        let idEducacion = req.params.idEducacion;
        let infoEducacion = req.body;
        try{
            await controladorEducacion.actualizarEducacion(usuario.id_usuario, infoEducacion, idEducacion);
            res.status(500).json({message: 'Actualización exitosa'})
        } catch(error){
            console.log(error.message);
            res.status(500).json({message: error.message});
        }
    });

    // Endpoint para eliminar un registro de educacion
    app.delete('/teclers/perfil/educacion/:idEducacion', middUsuarios.validarToken, middUsuarios.validarCredencialUsuario, async(req, res) =>{
        let usuario = req.params.usuario;
        let idEducacion = req.params.idEducacion;
        try{
            await controladorEducacion.eliminarEducacion(usuario.id_usuario, idEducacion);
            res.status(500).json({message: 'Eliminación exitosa'})
        } catch(error){
            console.log(error.message);
            res.status(500).json({message: error.message});
        }
    });

    // Endpoint para visualizar registros de educación del usuario
    app.get('/teclers/perfil/educacion', middUsuarios.validarToken, middUsuarios.validarCredencialUsuario, async(req, res) =>{
        let usuario = req.params.usuario;
        try{
            let educacion = await controladorEducacion.listarEducacion(usuario.id_usuario);
            res.status(500).json({message: 'Consulta exitosa', educacion})
        } catch(error){
            console.log(error.message);
            res.status(500).json({message: error.message});
        }
    });

    // Endpoint para registrar una nueva certificacion
    app.post('/teclers/perfil/certificaciones', middUsuarios.validarToken, middUsuarios.validarCredencialUsuario, middUsuarios.datosCertificados, async(req, res) =>{
        let usuario = req.params.usuario;
        let infoCertificacion = req.body;
        try{
            let certificacion = await controladorEducacion.registrarCertificacion(usuario.id_usuario, infoCertificacion);
            res.status(500).json({message: 'Registro exitoso', certificacion})
        } catch(error){
            console.log(error.message);
            res.status(500).json({message: error.message});
        }
    });

    // Endpoint para actualizar una nueva certificacion
    app.patch('/teclers/perfil/certificaciones/:idCertificacion', middUsuarios.validarToken, middUsuarios.validarCredencialUsuario, middUsuarios.datosCertificados, async(req, res) =>{
        let usuario = req.params.usuario;
        let idCertificacion = req.params.idCertificacion;
        let infoCertificacion = req.body;
        try{
            await controladorEducacion.actualizarCertificacion(usuario.id_usuario, infoCertificacion, idCertificacion);
            res.status(500).json({message: 'Actualización exitosa'})
        } catch(error){
            console.log(error.message);
            res.status(500).json({message: error.message});
        }
    });

    // Endpoint para eliminar un certificado
    app.delete('/teclers/perfil/certificaciones/:idCertificacion', middUsuarios.validarToken, middUsuarios.validarCredencialUsuario, async(req, res) =>{
        let usuario = req.params.usuario;
        let idCertificacion = req.params.idCertificacion;
        try{
            await controladorEducacion.eliminarCertificacion(usuario.id_usuario, idCertificacion);
            res.status(500).json({message: 'Eliminación exitosa'})
        } catch(error){
            console.log(error.message);
            res.status(500).json({message: error.message});
        }
    });

    // Endpoint para visualizar registros de certificaciones del usuario
    app.get('/teclers/perfil/certificaciones', middUsuarios.validarToken, middUsuarios.validarCredencialUsuario, async(req, res) =>{
        let usuario = req.params.usuario;
        try{
            let certificaciones = await controladorEducacion.listarCertificaciones(usuario.id_usuario);
            res.status(500).json({message: 'Consulta exitosa', certificaciones});
        } catch(error){
            console.log(error.message);
            res.status(500).json({message: error.message});
        }
    });
}