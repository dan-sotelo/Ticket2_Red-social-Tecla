// Importar los modulos necesarios
const Empresas = require('../../db/db.modelo.empresas');
const Representantes = require('../../db/db.modelo.representantesEmpresas');
const ConocimientosDeUsuarios = require('../../db/db.modelo.conocimientosUsuarios');
const Conocimientos = require('../../db/db.modelo.conocimientos');
const TecnologiasDeUsuarios = require('../../db/db.modelo.tecnologiasUsuarios');
const Tecnologias = require('../../db/db.modelo.tecnologias');
const DesempenoDeUsuarios = require('../../db/db.modelo.desempenoUsuarios');
const Desempenos = require('../../db/db.modelo.desempeno');
const HabilidadesDeUsuarios = require('../../db/db.modelo.habilidadesUsuarios');
const Habilidades = require('../../db/db.modelo.habilidades');
const EntornosDeUsuarios = require('../../db/db.modelo.entornosUsuarios');
const Entornos = require('../../db/db.modelo.entornos');

// Definir los modulos
let activarEmpresa = async(idEmpresa) =>{
    try{
        let empresaRegistrada = await Empresas.findOne({where: {id_empresa: `${idEmpresa}`, empresa_activa: false}});
        if(empresaRegistrada != null){
            await Empresas.update({id_credencial: 3, empresa_activa: true}, {where: {id_empresa: `${idEmpresa}`}});
            await Representantes.update({representante_activo: true},{where: {id_empresa: `${idEmpresa}`}});
        } else {
            throw new Error('La empresa no ha realizado su solicitud de registro o ya esta dada de alta')
        }
    }catch(error){
        console.log(`Error en el controlador al activar la empresa: ${error}`);
        throw new Error(error.message);
    }
}

let listarEmpresasSolicitantes = async() =>{
    try{
        let empresaSolicitante = await Empresas.findOne({where: {id_credencial: `${4}`}});
        if (empresaSolicitante != null){
            return empresa = await Empresas.findAll({
                attributes: [['id_empresa','idEmpresa'], ['empresa_nombre','nombre'], ['empresa_correo','correo'], 'fecha_registro'],
                include: [{model: Representantes, attributes: [['representante_nombre','nombre'], ['representante_correo','correo'], ['representante_telefono','telefono'], ['representante_departamento','departamento'], ['representante_cargo','cargo']], required:true}],
                where: {id_credencial: `${4}`}
            });
        } else {
            throw new Error ('No existen registros de empresas solicitantes')
        }
    } catch(error) {
        console.log(`Error en el modelo al listar las empresas: ${error}`);
        throw new Error(error.message);
    }
}

let evaluarConocimiento = async(aspecto, puntaje, idUsuario) =>{
    try{
        let idConocimiento = (await Conocimientos.findOne({where: {conocimiento: `${aspecto}`}})).id_conocimiento;
        let conocimientoRegistrado = await ConocimientosDeUsuarios.findOne({where: {id_usuario: `${idUsuario}`, id_conocimiento:`${idConocimiento}`}});
        if(conocimientoRegistrado == null){
            await ConocimientosDeUsuarios.create({
                id_usuario: idUsuario,
                id_conocimiento: idConocimiento,
                puntaje_tecla: puntaje
            });
        } else {
            await ConocimientosDeUsuarios.update({puntaje_tecla: `${puntaje}`}, {where: {id_usuario: `${idUsuario}`, id_conocimiento:`${idConocimiento}`}});
        }
    } catch(error) {
        console.log(`Error en el modelo al evaluar conocimiento: ${error}`);
        throw new Error(error.message);
    }
}

let evaluarTecnologia = async(aspecto, puntaje, idUsuario) =>{
    try{
        let idTecnologia = (await Tecnologias.findOne({where: {tecnologia: `${aspecto}`}})).id_tecnologia;
        let tecnologiaRegistrada = await TecnologiasDeUsuarios.findOne({where: {id_usuario: `${idUsuario}`, id_tecnologia:`${idTecnologia}`}});
        if(tecnologiaRegistrada == null){
            await TecnologiasDeUsuarios.create({
                id_usuario: idUsuario,
                id_tecnologia: idTecnologia,
                puntaje_tecla: puntaje
            });
        } else {
            await TecnologiasDeUsuarios.update({puntaje_tecla: `${puntaje}`}, {where: {id_usuario: `${idUsuario}`, id_tecnologia:`${idTecnologia}`}});
        }
    } catch(error) {
        console.log(`Error en el modelo al evaluar tecnologia: ${error}`);
        throw new Error(error.message);
    }
}

let evaluarDesempeno = async(aspecto, puntaje, idUsuario) =>{
    try{
        let idDesempeno = (await Desempenos.findOne({where: {desempeno: `${aspecto}`}})).id_desempeno;
        let desempenoRegistrado = await DesempenoDeUsuarios.findOne({where: {id_usuario: `${idUsuario}`, id_desempeno:`${idDesempeno}`}});
        if(desempenoRegistrado == null){
            await DesempenoDeUsuarios.create({
                id_usuario: idUsuario,
                id_desempeno: idDesempeno,
                puntaje_tecla: puntaje
            });
        } else {
            await DesempenoDeUsuarios.update({puntaje_tecla: `${puntaje}`}, {where: {id_usuario: `${idUsuario}`, id_desempeno:`${idDesempeno}`}});
        }
    } catch(error) {
        console.log(`Error en el modelo al evaluar desempeño: ${error}`);
        throw new Error(error.message);
    }
}

let evaluarHabilidad = async(aspecto, puntaje, idUsuario) =>{
    try{
        let idHabilidad = (await Habilidades.findOne({where: {habilidad: `${aspecto}`}})).id_habilidad;
        let habilidadRegistrada = await HabilidadesDeUsuarios.findOne({where: {id_usuario: `${idUsuario}`, id_habilidad:`${idHabilidad}`}});
        if(habilidadRegistrada == null){
            await HabilidadesDeUsuarios.create({
                id_usuario: idUsuario,
                id_habilidad: idHabilidad,
                puntaje_tecla: puntaje
            });
        } else {
            await HabilidadesDeUsuarios.update({puntaje_tecla: `${puntaje}`}, {where: {id_usuario: `${idUsuario}`, id_habilidad:`${idHabilidad}`}});
        }
    } catch(error) {
        console.log(`Error en el modelo al evaluar habilidad: ${error}`);
        throw new Error(error.message);
    }
}

let evaluarEntorno = async(aspecto, puntaje, idUsuario) =>{
    try{
        let idEntorno = (await Entornos.findOne({where: {entorno: `${aspecto}`}})).id_entorno;
        let entornoRegistrado = await EntornosDeUsuarios.findOne({where: {id_usuario: `${idUsuario}`, id_entorno:`${idEntorno}`}});
        if(entornoRegistrado == null){
            await EntornosDeUsuarios.create({
                id_usuario: idUsuario,
                id_entorno: idEntorno,
                puntaje_tecla: puntaje
            });
        } else {
            await EntornosDeUsuarios.update({puntaje_tecla: `${puntaje}`}, {where: {id_usuario: `${idUsuario}`, id_entorno:`${idEntorno}`}});
        }
    } catch(error) {
        console.log(`Error en el modelo al evaluar habilidad: ${error}`);
        throw new Error(error.message);
    }
}

// Exportar los modulos
module.exports = {activarEmpresa, listarEmpresasSolicitantes, evaluarConocimiento, evaluarTecnologia, evaluarDesempeno, evaluarHabilidad, evaluarEntorno}