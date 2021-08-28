// Importar los modulos necesarios
const controladorAdministrador = require('../controlador/controlador.administrador');
const middAdministrador = require('../../middlewares/midd.administrador');
const middUsuarios = require('../../middlewares/midd.usuarios');

// Definir los endpoints y exportar los modulos
module.exports = async(app) =>{
    // Endpoint para dar de alta una empresa
    app.patch('/empresas/activar/:idEmpresa', middUsuarios.validarToken, middAdministrador.validarCredencialAdministrador, async(req, res) =>{
        let idEmpresa = req.params.idEmpresa;
        try{
            await controladorAdministrador.activarEmpresa(idEmpresa);
            res.status(200).json({message: 'La empresa fue dada de alta de forma exitosa'});
        } catch(error) {
            console.log(error.message);
            res.status(500).json({message: error.message});
        }
    });

    // Endpoint para visualizar la lista de empresas solicitantes:


    // Endpoint para listar usuarios registrados y su información general (Acceso solo usuarios o empresas registradas)
    app.get('/teclers', middUsuarios.validarToken, async(req, res) =>{
        try {
            let usuarios = await controladorUsuarios.listarUsuarios();
            res.status(200).json({message: 'Consulta exitosa', usuarios});
        } catch (error) {
            console.log(error.message);
            res.status(500).json({message: error.message});
        }
    });

    // Endpoint para visualizar la información completa de un usuario (Acceso para usuarios registrados, empresas Partner o Administrador)
    app.get('/teclers/perfil/:idUsuario', middUsuarios.validarToken, middUsuarios.validarCredenciales, async(req, res) =>{
        let idUsuario = req.params.idUsuario;
        try{
            let informacionUsuario = await controladorUsuarios.consultarUsuario(idUsuario);
            res.status(200).json({message: 'Consulta exitosa', informacionUsuario});
        } catch(error) {
            console.log(error.message);
            res.status(500).json({message: error.message});
        }
    });
}