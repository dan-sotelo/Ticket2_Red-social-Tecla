// Importar los modulos necesarios
const controladorEmpresas = require('../controlador/controlador.empresas');
const middEmpresas = require('../../middlewares/midd.empresas');
const middUsuarios = require('../../middlewares/midd.usuarios');

// Definir los endpoints y exportar los modulos
module.exports = async(app) =>{
    // Endpoint para el registro de una empresa y su representante
    app.post('/empresas/registro', middEmpresas.datosRegistroEmpresas, middEmpresas.datosRegistroRepresentantes, async(req, res) =>{
        let datos = req.body;
        try {
            let nuevaEmpresa = await controladorEmpresas.registrarEmpresas(datos.empresa, datos.representante);
            res.status(200).json({message: 'Registro Exitoso', nuevaEmpresa});
        } catch (error) {
            console.log(error.message);
            res.status(500).json({message: error.message});
        }
    });

    // Endpoint para que una empresa inicie sesion
    app.post('/empresas/login', middUsuarios.datosLogin ,async(req, res) =>{
        let empresa = req.body;
        try{
            let infoEmpresa = await controladorEmpresas.buscarEmpresa(empresa);
            let tokenEmpresa = await controladorEmpresas.generarToken(infoEmpresa);
            res.status(200).json({message: 'La empresa es valida', tokenEmpresa});
        } catch(error) {
            console.log(error.message);
            res.status(500).json({message: error.message});
        }
    });

    // Endpoint para agregar o editar la información del perfil de la empresa
    app.patch('/empresas/informacion', middUsuarios.validarToken, middEmpresas.validarCredenciales ,middUsuarios.datosInformacion, async(req, res) =>{
        let empresa = req.params.empresa;
        let datos = req.body;
        try{
            if (Object.keys(datos).length > 0){
                await controladorEmpresas.actualizarInformacion(empresa.id_empresa, datos);
                res.status(200).json({message: 'Actualización de perfil exitoso'});
            } else {
                res.status(400).json({message: 'No se recibio ningun valor'});
            }
        } catch(error) {
            console.log(error.message);
            res.status(500).json({message: error.message});
        }
    });

    // Endpoint para registrar o actualizar la imagen de perfil de la empresa
    app.patch('/empresas/imagen', middUsuarios.validarToken, middEmpresas.validarCredenciales, async(req, res) =>{
        let idEmpresa = req.params.empresa.id_empresa;
        let datos = req.body;
        try{
            if(datos.imagen){
                await controladorEmpresas.registrarImagen(idEmpresa, datos.imagen);
                res.status(200).json({message: 'Actualización exitosa de la foto de perfil'});
            } else {
                res.status(400).json({message: 'No se registro ninguna respuesta'});
            }
        } catch(error) {
            console.log(error.message);
            res.status(500).json({message: error.message});
        }
    });

    // Endpoint para listar la información completa de una empresa
    app.get('/empresas/perfil', middUsuarios.validarToken, middEmpresas.validarCredenciales, async(req, res) =>{
        let idEmpresa = req.params.empresa.id_empresa;
        try{
            let empresa = await controladorEmpresas.consultarEmpresa(idEmpresa);
            res.status(200).json({message: 'Consulta exitosa', empresa});
        } catch(error) {
            console.log(error.message);
            res.status(500).json({message: error.message});
        }
    });
}