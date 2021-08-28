// Importar los modulos necesarios
const modeloEmpresas = require('../modelo/modelo.empresas');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Definir los modulos
let registrarEmpresas = async(empresa,representante) =>{
    try{
        empresa.activa = false;
        empresa.id_credencial = 2;
        let encriptacion = await bcrypt.genSalt(10);
        empresa.password = await bcrypt.hash(empresa.password, encriptacion);
        representante.activo = false;
        let nuevaEmpresa = await modeloEmpresas.registrarEmpresas(empresa,representante);
        return nuevaEmpresa;
    } catch(error) {
        console.log(`Error en el controlador al registrar la empresa: ${error}`);
        throw new Error(error.message);
    }
}

let buscarEmpresa = async(empresa) =>{
    try{
        let infoEmpresa = await modeloEmpresas.buscarEmpresa(empresa);
        return infoEmpresa;
    } catch(error) {
        console.log(`Error en el controlador al buscar la empresa: ${error}`);
        throw new Error(error.message);
    }
}

let generarToken = async(infoEmpresa) =>{
    let empresa = {
        id_empresa: infoEmpresa.id_empresa,
        correo: infoEmpresa.empresa_correo,
        credencial: infoEmpresa.id_credencial,
        activo: infoEmpresa.empresa_activa
    };
    try{
        const token = jwt.sign({empresa}, process.env.SECRET_KEY, {expiresIn: '1h'});  //Token con validación de 1 hora
        return token;
    } catch(error) {
        console.log(`Error en el controlador al generar el token: ${error}`);
        throw new Error(error.message);
    }
}

// Exportar los modulos
module.exports = {registrarEmpresas, buscarEmpresa, generarToken}