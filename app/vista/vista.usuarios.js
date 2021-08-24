// Importar los modulos necesarios
const controladorUsuarios = require('../controlador/controlador.usuarios');
const middUsuarios = require('../../middlewares/midd.usuarios');

// Definir los endpoints y exportar los modulos
module.exports = async(app) =>{
    // Endpoint para el registro de usuarios (Registrar: Nombre completo, correo, password, edad)
    app.post('/teclers/nuevo_registro', middUsuarios.datosRegistro ,async(req,res) =>{
        let usuario = req.body;
        try{
            let nuevoUsuario = await controladorUsuarios.registrarUsuario(usuario);
            res.status(200).json({message: 'Registro de usuario exitoso', nuevoUsuario});
        } catch(error) {
            console.log(error.message);
            res.status(500).json({message: error.message});
        }
    });

    // Endpoint para el inicio de sesión de usuarios
    app.post('/teclers/iniciar_sesion', middUsuarios.datosIniciarSesion, async(req,res) =>{
        let usuario = req.body;
        try{
            let infoUsuario = await controladorUsuarios.buscarUsuario(usuario);
            let token = await controladorUsuarios.generarToken(infoUsuario);
            res.status(200).json({message: 'El usuario es valido', token});
        } catch(error) {
            console.log(error.message);
            res.status(500).json({message: error.message});
        }
    });

    // Endpoint para completar o actualizar la información de domicilio y contacto (pais, estado, municipio, telefono, LinkedIn, GitHub)
    app.patch('/teclers/perfil/contacto', middUsuarios.validarToken, middUsuarios.validarCredencialUsuario, middUsuarios.datosContacto, async(req,res) =>{
        let usuario = req.params.usuario;
        let datos = req.body;
        try{
            if (Object.keys(datos).length > 0){
                let datosUsuario = await controladorUsuarios.actualizarPerfilUsuario(usuario.id_usuario, datos);
                res.status(200).json({message: 'Actualización de perfil exitoso'});
            } else {
                res.status(400).json({message: 'No se recibio ningun valor'});
            }
        } catch(error) {
            console.log(error.message);
            res.status(500).json({message: error.message});
        }
    });
}