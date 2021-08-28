// Importar los modulos necesarios
const Empresas = require('../../db/db.modelo.empresas');
const Representantes = require('../../db/db.modelo.representantesEmpresas');
const bcrypt = require('bcrypt')

// Definir los modelos
let registrarEmpresas = async(empresa, representante) =>{
    try{
        let empresaRegistrada = await Empresas.findOne({where: {empresa_correo: `${empresa.correoEmpresa}`}});
        if (empresaRegistrada == null){
            let representanteRegistrado = await Representantes.findOne({where: {representante_correo: `${representante.correoRepresentante}`}});
            if (representanteRegistrado == null){
                let nuevaEmpresa = await Empresas.create({
                    empresa_nombre: empresa.nombreEmpresa,
                    empresa_correo: empresa.correoEmpresa,
                    empresa_password: empresa.password,
                    id_credencial: empresa.id_credencial,
                    empresa_activa: empresa.activa
                });
                let nuevoRepresentante = await Representantes.create({
                    representante_nombre: representante.nombreRepresentante,
                    representante_correo: representante.correoRepresentante,
                    representante_telefono: representante.telefono,
                    id_empresa: nuevaEmpresa.id_empresa,
                    representante_departamento: representante.departamento,
                    representante_cargo: representante.cargo,
                    representante_activo: representante.activo
                });
                return {nuevaEmpresa,nuevoRepresentante};
            } else {
            throw new Error('El representante ya ha sido registrado, por favor contactese con su empresa');
            }
        } else {
            throw new Error('La empresa ya se encuentra registrada, por favor inicie sesion');
        }
    } catch(error){
        console.log(`Error en el modelo al registrar la empresa: ${error}`);
        throw new Error(error.message);
    }
}

let buscarEmpresa = async(empresa) =>{
    try{
        let infoEmpresa = await Empresas.findOne({where: {empresa_correo: `${empresa.correo}`}});
        if(infoEmpresa != null && infoEmpresa.empresa_activa ==true){
            let validacionPass = await bcrypt.compare(empresa.password, infoEmpresa.empresa_password);
            if(validacionPass){
                return infoEmpresa;
            } else {
                console.log('La contraseña es incorrecta');
                throw new Error('La contraseña es incorrecta');
            }
        } else {
            console.log('empresa no registrado');
            throw new Error('El empresa no esta registrado, revise su correo');
        }
    } catch(error){
        console.log(`Error en el modelo al buscar empresa: ${error}`)
        throw new Error(error.message);
    }
}

// Exportar los modelos
module.exports = {registrarEmpresas, buscarEmpresa}