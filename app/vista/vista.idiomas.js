// Importar los modulos necesarios
const controladorIdiomas = require('../controlador/controlador.idiomas');
const middUsuarios = require('../../middlewares/midd.usuarios');

// Definir los endpoints y exportar los modulos
module.exports = async(app) =>{
    // Endpoint para registrar un idioma
    app.post('/teclers/perfil/idiomas', middUsuarios.validarToken, middUsuarios.validarCredencialUsuario, middUsuarios.datosIdiomas, async(req, res) =>{
        let usuario = req.params.usuario;
        let infoIdioma = req.body;
        try{
            let idioma = await controladorIdiomas.registrarIdiomas(usuario.id_usuario, infoIdioma);
            res.status(500).json({message: 'Registro exitoso', idioma})
        } catch(error){
            console.log(error.message);
            res.status(500).json({message: error.message});
        }
    });

    // Endpoint para actualizar la información de idiomas de un usuario
    app.patch('/teclers/perfil/idiomas/:idIdioma', middUsuarios.validarToken, middUsuarios.validarCredencialUsuario, middUsuarios.datosIdiomas, async(req, res) =>{
        let usuario = req.params.usuario;
        let idIdioma = req.params.idIdioma;
        let infoIdioma = req.body;
        try{
            await controladorIdiomas.actualizarIdiomas(usuario.id_usuario, infoIdioma, idIdioma);
            res.status(500).json({message: 'Actualización exitosa'})
        } catch(error){
            console.log(error.message);
            res.status(500).json({message: error.message});
        }
    });

    // Endpoint para eliminar un registro de idiomas
    app.delete('/teclers/perfil/idiomas/:idIdioma', middUsuarios.validarToken, middUsuarios.validarCredencialUsuario, async(req, res) =>{
        let usuario = req.params.usuario;
        let idIdioma = req.params.idIdioma;
        try{
            await controladorIdiomas.eliminarIdiomas(usuario.id_usuario, idIdioma);
            res.status(500).json({message: 'Eliminación exitosa'})
        } catch(error){
            console.log(error.message);
            res.status(500).json({message: error.message});
        }
    });

    // Endpoint para visualizar registros de idiomas del usuario
    app.get('/teclers/perfil/idiomas', middUsuarios.validarToken, middUsuarios.validarCredencialUsuario, async(req, res) =>{
        let usuario = req.params.usuario;
        try{
            let idiomas = await controladorIdiomas.listarIdiomas(usuario.id_usuario);
            res.status(500).json({message: 'Consulta exitosa', idiomas})
        } catch(error){
            console.log(error.message);
            res.status(500).json({message: error.message});
        }
    });
}