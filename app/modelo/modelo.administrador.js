// Importar los modulos necesarios
const Empresas = require('../../db/db.modelo.empresas');
const Representantes = require('../../db/db.modelo.representantesEmpresas');

// Definir los modulos
let activarEmpresa = async(idEmpresa) =>{
    try{
        let empresaRegistrada = await Empresas.findOne({where: {id_empresa: `${idEmpresa}`, empresa_activa: false}});
        if(empresaRegistrada != null){
            await Empresas.update({id_credencial: 1, empresa_activa: true}, {where: {id_empresa: `${idEmpresa}`}});
            await Representantes.update({representante_activo: true},{where: {id_empresa: `${idEmpresa}`}});
        } else {
            throw new Error('La empresa no ha realizado su solicitud de registro o ya esta dada de alta')
        }
    }catch(error){
        console.log(`Error en el controlador al activar la empresa: ${error}`);
        throw new Error(error.message);
    }
}

// Exportar los modulos
module.exports = {activarEmpresa}