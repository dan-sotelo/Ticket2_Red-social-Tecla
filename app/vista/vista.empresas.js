// Importar los modulos necesarios
const controladorEmpresas = require('../controlador/controlador.empresas');
const middEmpresas = require('../../middlewares/midd.empresas');
const middUsuarios = require('../../middlewares/midd.usuarios');

// Definir los endpoints y exportar los modulos
module.exports = async(app) =>{
    // Endpoint para el registro de una empresa y su representante
    app.post('/empresas/nuevo_registro', middEmpresas.datosRegistroEmpresas, middEmpresas.datosRegistroRepresentantes, async(req, res) =>{
        let datos = req.body;
        try {
            let nuevaEmpresa = await controladorEmpresas.registrarEmpresas(datos.empresa, datos.representante);
            res.status(200).json({message: 'Registro Exitoso', nuevaEmpresa});
        } catch (error) {
            console.log(error.message);
            res.status(500).json({message: error.message});
        }
    });

    // Endpoint para actualizarque una empresa inicie sesion
    app.post('/empresas/iniciar_sesion', middUsuarios.datosIniciarSesion ,async(req, res) =>{
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
}