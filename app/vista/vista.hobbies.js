// Importar los modulos necesarios
const controladorHobbies = require('../controlador/controlador.hobbies');
const middUsuarios = require('../../middlewares/midd.usuarios');

// Definir los endpoints y exportar los modulos
module.exports = async(app) =>{
    // Endpoint para registrar un hobbies
    app.post('/teclers/perfil/hobbies', middUsuarios.validarToken, middUsuarios.validarCredencialUsuario, middUsuarios.datosHobbies, async(req, res) =>{
        let usuario = req.params.usuario;
        let infoHobby = req.body;
        try{
            let hobby = await controladorHobbies.registrarHobbies(usuario.id_usuario, infoHobby);
            res.status(500).json({message: 'Registro exitoso', hobby})
        } catch(error){
            console.log(error.message);
            res.status(500).json({message: error.message});
        }
    });

    // Endpoint para actualizar la información de hobbies de un usuario
    app.patch('/teclers/perfil/hobbies/:idHobbyUsuario', middUsuarios.validarToken, middUsuarios.validarCredencialUsuario, middUsuarios.datosHobbies, async(req, res) =>{
        let usuario = req.params.usuario;
        let idHobbyUsuario = req.params.idHobbyUsuario;
        let infoHobby = req.body;
        try{
            await controladorHobbies.actualizarHobbies(usuario.id_usuario, infoHobby, idHobbyUsuario);
            res.status(500).json({message: 'Actualización exitosa'})
        } catch(error){
            console.log(error.message);
            res.status(500).json({message: error.message});
        }
    });

    // Endpoint para eliminar un registro de hobbies
    app.delete('/teclers/perfil/hobbies/:idHobbyUsuario', middUsuarios.validarToken, middUsuarios.validarCredencialUsuario, async(req, res) =>{
        let usuario = req.params.usuario;
        let idHobbyUsuario = req.params.idHobbyUsuario;
        try{
            await controladorHobbies.eliminarHobbies(usuario.id_usuario, idHobbyUsuario);
            res.status(500).json({message: 'Eliminación exitosa'})
        } catch(error){
            console.log(error.message);
            res.status(500).json({message: error.message});
        }
    });

    // Endpoint para visualizar registros de hobbies del usuario
    app.get('/teclers/perfil/hobbies', middUsuarios.validarToken, middUsuarios.validarCredencialUsuario, async(req, res) =>{
        let usuario = req.params.usuario;
        try{
            let hobbies = await controladorHobbies.listarHobbies(usuario.id_usuario);
            res.status(500).json({message: 'Consulta exitosa', hobbies})
        } catch(error){
            console.log(error.message);
            res.status(500).json({message: error.message});
        }
    });
}