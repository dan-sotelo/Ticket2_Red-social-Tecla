// Importar los modulos necesarios
const GradosAcademicos = require('../../db/db.modelo.gradosAcademicos');
const Educacion = require('../../db/db.modelo.educacionUsuarios');
const CertificacionesDeUsuarios = require('../../db/db.modelo.certificacionesUsuarios');

let registrarGradosAcademicos = async(gradoAcademico) =>{
    let idGrado;
    try{
        let gradoRegistrado = await GradosAcademicos.findOne({where: {grado_academico: `${gradoAcademico}`}});
        if(gradoRegistrado == null){
            let nuevoGrado = await GradosAcademicos.create({grado_academico: gradoAcademico});
            idGrado = nuevoGrado.id_grado;
        } else {
            idGrado = gradoRegistrado.id_grado;
        }
        return idGrado;
    } catch(error) {
        console.log(`Error en el modelo al registrar el grado academico: ${error}`);
        throw new Error(error.message);
    }
}


// Definir los modulos
let registrarEducacion = async(idUsuario, infoEducacion) =>{
    try{
        let idGrado = await registrarGradosAcademicos(infoEducacion.gradoAcademico)
        let educacion = await Educacion.create({
            id_usuario: idUsuario,
            id_grado_academico: idGrado,
            escuela: infoEducacion.escuela,
            estatus: infoEducacion.estatus,
            promedio: infoEducacion.promedio
        });
        return educacion;
    } catch(error) {
        console.log(`Error en el modelo al registrar la educación: ${error}`);
        throw new Error(error.message);
    }
}

let actualizarEducacion = async(idUsuario, infoEducacion, idEducacion) =>{
    try{
        let educacionRegistrada = await Educacion.findOne({where: {id_educacion: `${idEducacion}`}});
        if (educacionRegistrada != null && educacionRegistrada.id_usuario == idUsuario){
            let idGrado = await registrarGradosAcademicos(infoEducacion.gradoAcademico);
            await Educacion.update({
                id_grado_academico: `${idGrado}`,
                escuela: `${infoEducacion.escuela}`,
                estatus: `${infoEducacion.estatus}`,
                promedio: `${infoEducacion.promedio}`
            }, {where: {id_educacion: `${idEducacion}`}});
        } else {
            throw new Error('No existe el registro de educacion solicitado');
        }
    } catch(error) {
        console.log(`Error en el modelo al actualizar la educación: ${error}`);
        throw new Error(error.message);
    }
}

let eliminarEducacion = async(idUsuario, idEducacion) =>{
    try{
        let educacionRegistrada = await Educacion.findOne({where: {id_educacion: `${idEducacion}`, id_usuario: `${idUsuario}`}});
        if(educacionRegistrada != null){
            await Educacion.destroy({where: {id_educacion: `${idEducacion}`, id_usuario: `${idUsuario}`}});
        } else {
            throw new Error('No existe el registro de educacion solicitado');
        }
    } catch(error) {
        console.log(`Error en el modelo al eliminar la educación: ${error}`);
        throw new Error(error.message);
    }
}

let listarEducacion = async(idUsuario) =>{
    try{
        let educacion = await Educacion.findAll({
            attributes: [['id_educacion','idEducacion'],'escuela','estatus','promedio','fecha_registro','fecha_actualizacion'],
            include:[{ model: GradosAcademicos, attributes: [['grado_academico','gradoAcademico']], required: true}],
            where: {id_usuario: `${idUsuario}`}});
        return educacion;
    } catch(error) {
        console.log(`Error en el modelo al eliminar la certificacion: ${error}`);
        throw new Error(error.message);
    }
}

let registrarCertificacion = async(idUsuario, infoCertificacion) =>{
    try{
        let certificacionRegistrada = await CertificacionesDeUsuarios.findOne({where: {certificacion: `${infoCertificacion.certificacion}`, id_usuario:`${idUsuario}`}});
        if (certificacionRegistrada == null){
            let nuevaCertificacion = await CertificacionesDeUsuarios.create({
                certificacion: infoCertificacion.certificacion,
                id_usuario: idUsuario,
                institucion: infoCertificacion.institucion,
                expedicion: infoCertificacion.expedicion,
                expiracion: infoCertificacion.expiracion,
                folio: infoCertificacion.folio
            });
            return nuevaCertificacion;
        } else {
            throw new Error('La certificación ya fue registrada, si lo desea puede editarla');
        }
    } catch(error){
        console.log(`Error en el modelo al registrar la certificación: ${error}`);
        throw new Error(error.message);
    }
}

let actualizarCertificacion = async(idUsuario, infoCertificacion, idCertificacion) =>{
    try{
        let certificacionRegistrada = await CertificacionesDeUsuarios.findOne({where: {id_certificacion: `${idCertificacion}`}});
        if (certificacionRegistrada != null && certificacionRegistrada.id_usuario == idUsuario){
            await CertificacionesDeUsuarios.update({
                certificacion: `${infoCertificacion.certificacion}`,
                institucion: `${infoCertificacion.institucion}`,
                expedicion: `${infoCertificacion.expedicion}`,
                expiracion: `${infoCertificacion.expiracion}`,
                folio: `${infoCertificacion.folio}`
            }, {where: {id_certificacion: `${idCertificacion}`}});
        } else {
            throw new Error('No existe la certificacion solicitada');
        }
    } catch(error) {
        console.log(`Error en el modelo al actualizar la certificación: ${error}`);
        throw new Error(error.message);
    }
}

let eliminarCertificacion = async(idUsuario, idCertificacion) =>{
    try{
        let certificacionRegistrada = await CertificacionesDeUsuarios.findOne({where: {id_certificacion: `${idCertificacion}`, id_usuario: `${idUsuario}`}});
        if(certificacionRegistrada != null){
            await CertificacionesDeUsuarios.destroy({where: {id_certificacion: `${idCertificacion}`, id_usuario: `${idUsuario}`}});
        } else {
            throw new Error('No existe el registro de la certificación solicitada');
        }
    } catch(error) {
        console.log(`Error en el modelo al eliminar la certificación: ${error}`);
        throw new Error(error.message);
    }
}

let listarCertificaciones = async(idUsuario) =>{
    try{
        let certificaciones = await CertificacionesDeUsuarios.findAll({
            attributes: [['id_certificacion','idCertificacion'],'certificacion','institucion','expedicion','expiracion','folio','fecha_registro','fecha_actualizacion'],
            where: {id_usuario: `${idUsuario}`}});
        return certificaciones;
    } catch(error) {
        console.log(`Error en el modelo al eliminar la certificacion: ${error}`);
        throw new Error(error.message);
    }
}

// Exportar modulos
module.exports = {registrarEducacion, actualizarEducacion, eliminarEducacion, listarEducacion, registrarCertificacion, actualizarCertificacion, eliminarCertificacion, listarCertificaciones};
