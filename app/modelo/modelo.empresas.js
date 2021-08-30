// Importar los modulos necesarios
const Empresas = require('../../db/db.modelo.empresas');
const Representantes = require('../../db/db.modelo.representantesEmpresas');
const Paises = require('../../db/db.modelo.paises');
const Estados = require('../../db/db.modelo.estados');
const Municipios = require('../../db/db.modelo.municipios');
const bcrypt = require('bcrypt')

// Definir los modulos
let consultarPais = async(idPais) =>{
    if(idPais != null){
        let paisRegistrado = await Paises.findOne({attributes: ['pais'],where: {id_pais: `${idPais}`}});
        return paisRegistrado.pais;
    } else {
        return null;
    }
}

let consultarEstado = async(idEstado) =>{
    if(idEstado != null){
        let estadoRegistrado = await Estados.findOne({attributes: ['estado'], where: {id_estado: `${idEstado}`}});
        return estadoRegistrado.estado;
    } else {
        return null;
    }
}

let consultarMunicipio = async(idMunicipio) =>{
    if(idMunicipio != null){
        let municipioRegistrado = await Municipios.findOne({attributes: ['municipio'], where: {id_municipio: `${idMunicipio}`}});
        return municipioRegistrado.municipio;
    } else {
        return null;
    }
}

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
            throw new Error('El empresa no se encuentra registrada, o su cuenta aún no esta activa');s
        }
    } catch(error){
        console.log(`Error en el modelo al buscar empresa: ${error}`)
        throw new Error(error.message);
    }
}

let registrarPais = async(idEmpresa, pais) =>{
    let idPais;
    try{
        let paisRegistrado = await Paises.findOne({where: {pais: `${pais}`}});
        if(paisRegistrado == null){
            let nuevoPais = await Paises.create({pais: pais})
            idPais = nuevoPais.id_pais;
        } else {
            idPais = paisRegistrado.id_pais;
        }
        await Empresas.update({id_pais: `${idPais}`}, {where: {id_empresa: `${idEmpresa}`}});
    } catch(error) {
        console.log(`Error en el modelo al registrar el pais: ${error}`)
        throw new Error(error.message);
    }
}

let registrarEstado = async(idEmpresa, estado) =>{
    let idEstado;
    try{
        let estadoRegistrado = await Estados.findOne({where: {estado: `${estado}`}});
        if(estadoRegistrado == null){
            let nuevoEstado = await Estados.create({estado: estado})
            idEstado = nuevoEstado.id_estado;
        } else {
            idEstado = estadoRegistrado.id_estado;
        }
        await Empresas.update({id_estado: `${idEstado}`}, {where: {id_empresa: `${idEmpresa}`}});
    } catch(error) {
        console.log(`Error en el modelo al registrar el estado: ${error}`)
        throw new Error(error.message);
    }
}

let registrarMunicipio = async(idEmpresa, municipio) =>{
    let idMunicipio;
    try{
        let municipioRegistrado = await Municipios.findOne({where: {municipio: `${municipio}`}});
        if(municipioRegistrado == null){
            let nuevoMunicipio = await Municipios.create({municipio: municipio})
            idMunicipio = nuevoMunicipio.id_municipio;
        } else {
            idMunicipio = municipioRegistrado.id_municipio;
        }
        await Empresas.update({id_municipio: `${idMunicipio}`}, {where: {id_empresa: `${idEmpresa}`}});
    } catch(error) {
        console.log(`Error en el modelo al registrar el municipio: ${error}`)
        throw new Error(error.message);
    }
}

let registrarLinkedin = async(idEmpresa, linkedin) =>{
    try{
        await Empresas.update({empresa_linkedin: `${linkedin}`}, {where: {id_empresa: `${idEmpresa}`}});
    } catch(error) {
        console.log(`Error en el modelo al registrar linkedin: ${error}`)
        throw new Error(error.message);
    }
}

let registrarImagen = async(idEmpresa, imagen) =>{
    try{
        await Empresas.update({empresa_imagen: `${imagen}`}, {where: {id_empresa: `${idEmpresa}`}});
    } catch(error) {
        console.log(`Error en el modelo al registrar la imagen: ${error}`)
        throw new Error(error.message);
    }
}

let consultarEmpresa = async(idEmpresa) =>{
    try{
        let empresaRegistrada = await Empresas.findOne({where: {id_empresa: `${idEmpresa}`, empresa_activa: true}});
        if(empresaRegistrada != null){
            let empresa = {
                informacion:{
                    idEmpresa: idEmpresa,
                    nombre: empresaRegistrada.empresa_nombre,
                    correo: empresaRegistrada.empresa_correo,
                    imagen: empresaRegistrada.empresa_imagen,
                    linkedin: empresaRegistrada.empresa_linkedin,
                    pais: await consultarPais(empresaRegistrada.id_pais),
                    estado: await consultarEstado(empresaRegistrada.id_estado),
                    municipio: await consultarMunicipio(empresaRegistrada.id_municipio)
                },
                representante: await Representantes.findOne({
                    attributes: [['representante_nombre','nombre'], ['representante_correo','correo'], ['representante_telefono','telefono'], ['representante_departamento','departamento'], ['representante_cargo','cargo']],
                    where: {id_empresa: `${idEmpresa}`}
                })
            };
            return empresa;
        } else {
            throw new Error ('La empresa no se encuentra registrada');
        }
    } catch(error) {
        console.log(`Error en el modelo al consultar la información de la empresa: ${error}`);
        throw new Error(error.message);
    }
}

let listarEmpresas = async() =>{
    try{
        let empresas = await Empresas.findAll({
            attributes: ['id_empresa',['empresa_nombre','nombre'], ['empresa_correo','correo'],['empresa_imagen','imagen']],
            where: {empresa_activa: true}
        });
        return empresas;
    } catch(error) {
        console.log(`Error en el modelo al listar las empresas: ${error}`);
        throw new Error(error.message);
    }
}

// Exportar los modelos
module.exports = {registrarEmpresas, buscarEmpresa, registrarPais, registrarEstado, registrarMunicipio, registrarLinkedin, consultarEmpresa, registrarImagen, listarEmpresas}