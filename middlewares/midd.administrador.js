// Importar los modulos necesarios

// Middleware para validar credenciales de administrador
let validarCredencialAdministrador = async(req, res, next) =>{
    let infoUsuario = req.params.usuario;
    let administrador = 1;
    try{
        if(infoUsuario.credencial == administrador){
            return next();
        } else {
            throw new Error ('Usuario invalido');
        }
    } catch(error) {
        console.log(error.message);
        res.status(400).json({message: `Acceso denegado: ${error.message}`});
    }
}

module.exports = {validarCredencialAdministrador};