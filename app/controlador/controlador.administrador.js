// Importar los modulos necesarios
const modeloAdministrador = require('../modelo/modelo.administrador');

// Definir los modulos
let activarEmpresa = async(idEmpresa) =>{
    try{
        await modeloAdministrador.activarEmpresa(idEmpresa);
    } catch(error) {
        console.log(`Error en el controlador al activar la empresa: ${error}`);
        throw new Error(error.message);
    }
}

// Exportar los modulos
module.exports = {activarEmpresa}