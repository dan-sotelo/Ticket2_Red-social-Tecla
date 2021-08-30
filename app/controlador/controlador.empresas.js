// Importar los modulos necesarios
const modeloEmpresas = require('../modelo/modelo.empresas');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Definir los modulos
let registrarEmpresas = async(empresa,representante) =>{
    try{
        empresa.activa = false;
        representante.activo = false;
        empresa.id_credencial = 4;
        let encriptacion = await bcrypt.genSalt(10);
        empresa.password = await bcrypt.hash(empresa.password, encriptacion);
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

let actualizarInformacion = async(idEmpresa, datos) =>{
    try{
        if (datos.pais != undefined){await modeloEmpresas.registrarPais(idEmpresa, datos.pais)};
        if (datos.estado != undefined){await modeloEmpresas.registrarEstado(idEmpresa, datos.estado)};
        if (datos.municipio != undefined){await modeloEmpresas.registrarMunicipio(idEmpresa, datos.municipio)};
        if (datos.linkedin != undefined){await modeloEmpresas.registrarLinkedin(idEmpresa, datos.linkedin)};
    } catch(error) {
        console.log(`Error en el controlador al actualizar la información: ${error}`);
        throw new Error(error.message);
    }
}

let consultarEmpresa = async(idEmpresa) =>{
    try{
        let empresa = await modeloEmpresas.consultarEmpresa(idEmpresa);
        return empresa;
    } catch(error) {
        console.log(`Error en el controlador al listar la información de la empresa: ${error}`);
        throw new Error(error.message);
    }
}

let registrarImagen = async(idEmpresa, imagen) =>{
    try{
        await modeloEmpresas.registrarImagen(idEmpresa, imagen)
    } catch(error) {
        console.log(`Error en el controlador al actualizar la imagen de usuario: ${error}`);
        throw new Error(error.message);
    }
}

let listarEmpresas = async() =>{
    try{
        let empresas = await modeloEmpresas.listarEmpresas();
        return empresas;
    } catch(error) {
        console.log(`Error en el controlador al listar las empresas: ${error}`);
        throw new Error(error.message);
    }
}

// Exportar los modulos
module.exports = {registrarEmpresas, buscarEmpresa, generarToken, actualizarInformacion, consultarEmpresa, registrarImagen, listarEmpresas}