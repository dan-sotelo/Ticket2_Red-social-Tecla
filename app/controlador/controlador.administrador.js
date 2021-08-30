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

let listarEmpresasSolicitantes = async() =>{
    try{
        let empresas = await modeloAdministrador.listarEmpresasSolicitantes();
        return empresas;
    } catch(error) {
        console.log(`Error en el controlador al listar las empresas solicitantes: ${error}`);
        throw new Error(error.message);
    }
}

let evaluarUsuario = async(datos) =>{
    try{
        for (aspecto in datos.conocimientos){await modeloAdministrador.evaluarConocimiento(aspecto, datos.conocimientos[aspecto], datos.idUsuario)};
        for (aspecto in datos.tecnologias){await modeloAdministrador.evaluarTecnologia(aspecto, datos.tecnologias[aspecto], datos.idUsuario)};
        for (aspecto in datos.desempeno){await modeloAdministrador.evaluarDesempeno(aspecto, datos.desempeno[aspecto], datos.idUsuario)};
        for (aspecto in datos.habilidades){await modeloAdministrador.evaluarHabilidad(aspecto, datos.habilidades[aspecto], datos.idUsuario)};
        for (aspecto in datos.entornos){await modeloAdministrador.evaluarEntorno(aspecto, datos.entornos[aspecto], datos.idUsuario)};
    } catch(error) {
        console.log(`Error en el controlador al evaluar al usuario: ${error}`);
        throw new Error(error.message);
    }
}

// Exportar los modulos
module.exports = {activarEmpresa, listarEmpresasSolicitantes, evaluarUsuario}