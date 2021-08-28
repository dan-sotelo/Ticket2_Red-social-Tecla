// Importar los modulos necesarios
const controladorUsuarios = require('../controlador/controlador.usuarios');
const middUsuarios = require('../../middlewares/midd.usuarios');

// Definir los endpoints y exportar los modulos
module.exports = async(app) =>{
    // Endpoint para el registro de usuarios (Registrar: Nombre completo, correo, password, edad)
    app.post('/teclers/registro', middUsuarios.datosRegistro ,async(req,res) =>{
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
    app.post('/teclers/login', middUsuarios.datosLogin, async(req,res) =>{
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

    // Endpoint para listar la información completa del perfil de un usuario
    app.get('/teclers/perfil', middUsuarios.validarToken, middUsuarios.validarCredenciales, async(req, res) =>{
        let usuario = req.params.usuario;
        try{
            let informacionUsuario = await controladorUsuarios.consultarUsuario(usuario.id_usuario);
            res.status(200).json({message: 'Consulta exitosa', informacionUsuario});
        } catch(error) {
            console.log(error.message);
            res.status(500).json({message: error.message});
        }
    });

    // Endpoint para completar o actualizar la información de domicilio y contacto (pais, estado, municipio, telefono, LinkedIn, GitHub)
    app.patch('/teclers/perfil/informacion', middUsuarios.validarToken, middUsuarios.validarCredenciales, middUsuarios.datosInformacion, async(req,res) =>{
        let usuario = req.params.usuario;
        let datos = req.body;
        try{
            if (Object.keys(datos).length > 0){
                await controladorUsuarios.actualizarInformacion(usuario.id_usuario, datos);
                res.status(200).json({message: 'Actualización de perfil exitoso'});
            } else {
                res.status(400).json({message: 'No se recibio ningun valor'});
            }
        } catch(error) {
            console.log(error.message);
            res.status(500).json({message: error.message});
        }
    });

    // Endpoint para registrar o actualizar la imagen de perfil del usuario
    app.patch('/teclers/perfil/imagen', middUsuarios.validarToken, middUsuarios.validarCredenciales, async(req, res) =>{
        let usuario = req.params.usuario;
        let datos = req.body;
        try{
            if(datos.imagen){
                await controladorUsuarios.registrarImagen(usuario.id_usuario, datos.imagen);
                res.status(200).json({message: 'Actualización exitosa de la foto de perfil'});
            } else {
                res.status(400).json({message: 'No se registro ninguna respuesta'});
            }
        } catch(error) {
            console.log(error.message);
            res.status(500).json({message: error.message});
        }
    });

    // Endpoint para cambiar la password
    app.patch('/teclers/perfil/password', middUsuarios.validarToken, middUsuarios.validarCredenciales, middUsuarios.datosCambiarPassword, async(req, res) =>{
        let usuario = req.params.usuario;
        let datosUsuario = req.body;
        try{
            if(datosUsuario.correo == usuario.correo){
                await controladorUsuarios.cambiarPassword(datosUsuario, usuario.id_usuario);
                res.status(200).json({message: 'Actualización exitosa de password'});
            } else {
                throw new Error ('Usuario invalido');
            }
        } catch(error) {
            console.log(error.message);
            res.status(500).json({message: error.message});
        }
    });

    // Endpoint para desactivar la cuenta
    app.patch('/teclers/perfil/desactivacion', middUsuarios.validarToken, middUsuarios.validarCredenciales, middUsuarios.datosPassword, async(req, res) =>{
        let usuario = req.params.usuario;
        let datosUsuario = req.body;
        try{
            await controladorUsuarios.desactivarCuenta(usuario.id_usuario, datosUsuario.password);
            res.status(200).json({message: 'La cuenta se desactivo satisfactoriamente'});
        } catch(error) {
            console.log(error.message);
            res.status(500).json({message: error.message});
        }
    });
}