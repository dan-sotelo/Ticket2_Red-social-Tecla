// Importar los modulos necesarios
const Usuarios = require('../../db/db.modelo.usuarios');
const Paises = require('../../db/db.modelo.paises');
const Estados = require('../../db/db.modelo.estados');
const Municipios = require('../../db/db.modelo.municipios');
const GradosAcademicos = require('../../db/db.modelo.gradosAcademicos');
const Educacion = require('../../db/db.modelo.educacionUsuarios');
const CertificacionesDeUsuarios = require('../../db/db.modelo.certificacionesUsuarios');
const Idiomas = require('../../db/db.modelo.idiomas');
const DominioIdiomas = require('../../db/db.modelo.dominioIdiomas');
const IdiomasDeUsuarios = require('../../db/db.modelo.idiomasUsuarios');
const Hobbies = require('../../db/db.modelo.hobbies');
const HobbiesDeUsuarios = require('../../db/db.modelo.hobbiesUsuarios');
const Conocimientos = require('../../db/db.modelo.conocimientos');
const ConocimientoDeUsuarios = require('../../db/db.modelo.conocimientosUsuarios');
const Tecnologias = require('../../db/db.modelo.tecnologias');
const TecnologiasDeUsuarios = require('../../db/db.modelo.tecnologiasUsuarios');
const Desempeno = require('../../db/db.modelo.desempeno');
const DesempenoDeUsuarios = require('../../db/db.modelo.desempenoUsuarios');
const Habilidades = require('../../db/db.modelo.habilidades');
const HabilidadesDeUsuarios = require('../../db/db.modelo.habilidadesUsuarios');
const Entornos = require('../../db/db.modelo.entornos');
const EntornosDeUsuarios = require('../../db/db.modelo.entornosUsuarios');
const sequelize = require('../../db/db.conexion');

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

let consultarUsuario = async(idUsuario) =>{
    try {
        let usuarioRegistrado = await Usuarios.findOne({where: {id_usuario: `${idUsuario}`, usuario_activo: true}});
        if(usuarioRegistrado != null){
            let usuario = {
                informacionGeneral: {
                    idUsuario: idUsuario,
                    nombre: usuarioRegistrado.usuario_nombre,
                    correo: usuarioRegistrado.usuario_correo,
                    imagen: usuarioRegistrado.usuario_imagen,
                    edad: usuarioRegistrado.usuario_edad,
                    telefono: usuarioRegistrado.usuario_telefono,
                    linkedin: usuarioRegistrado.usuario_linkedin,
                    github: usuarioRegistrado.usuario_github,
                    pais: await consultarPais(usuarioRegistrado.id_pais),
                    estado: await consultarEstado(usuarioRegistrado.id_estado),
                    municipio: await consultarMunicipio(usuarioRegistrado.id_municipio)
                },
                educacion: await Educacion.findAll({
                    attributes: [['id_educacion','idEducacion'],'escuela','estatus','promedio'],
                    include: [{model: GradosAcademicos, attributes:[['grado_academico','gradoAcademico']], required: true}],
                    where: {id_usuario: `${idUsuario}`}
                }),
                certificaciones: await CertificacionesDeUsuarios.findAll({
                    attributes: [['id_certificacion','idCertificacion'],'certificacion','institucion','expedicion','expiracion','folio'],
                    where: {id_usuario: `${idUsuario}`}
                }),
                idiomas: await IdiomasDeUsuarios.findAll({
                    attributes: [['id_idioma_de_usuario','idIdioma']],
                    include: [
                        {model: Idiomas, attributes: ['idioma'], required: true},
                        {model: DominioIdiomas, attributes: ['nivel'], required: true}
                    ],
                    where: {id_usuario: `${idUsuario}`}
                }),
                hobbies: await HobbiesDeUsuarios.findAll({
                    attributes: [['id_hobbie_de_usuario','idHobbyUsuario']],
                    include: [{model: Hobbies, attributes: [['hobbie','hobby']], required: true}],
                    where: {id_usuario: `${idUsuario}`}
                }),
                conocimientos:{
                    aspectos: await ConocimientoDeUsuarios.findAll({
                        attributes: [['id_conocimiento_de_usuario','idConocimientoUsuario'],'puntaje_tecla'],
                        include: [{model: Conocimientos, attributes: [['conocimiento','concepto']], required: true}],
                        where: {id_usuario: `${idUsuario}`}
                    }),
                    calificacion: (await ConocimientoDeUsuarios.findAll({
                        attributes: [[sequelize.fn('AVG',sequelize.col('puntaje_tecla')),'Promedio']],
                        where: {id_usuario: `${idUsuario}`}
                    }))[0]
                },
                tecnologias: {
                    aspectos: await TecnologiasDeUsuarios.findAll({
                        attributes: [['id_tecnologia_de_usuario','idTecnologiaUsuario'],'puntaje_tecla'],
                        include:[{model: Tecnologias, attributes: [['tecnologia','concepto']], required: true}],
                        where: {id_usuario: `${idUsuario}`}
                    }),
                    calificacion: (await TecnologiasDeUsuarios.findAll({
                        attributes: [[sequelize.fn('AVG',sequelize.col('puntaje_tecla')),'Promedio']],
                        where: {id_usuario: `${idUsuario}`}
                    }))[0]
                },
                desempeno: {
                    aspectos: await DesempenoDeUsuarios.findAll({
                        attributes: [['id_desempeno_de_usuario','idDesempenoUsuario'],'puntaje_tecla'],
                        include:[{model: Desempeno, attributes: [['desempeno','concepto']], required: true}],
                        where: {id_usuario: `${idUsuario}`}
                    }),
                    calificacion: (await DesempenoDeUsuarios.findAll({
                        attributes: [[sequelize.fn('AVG',sequelize.col('puntaje_tecla')),'Promedio']],
                        where: {id_usuario: `${idUsuario}`}
                    }))[0]
                },
                habilidadesBlandas: {
                    aspectos: await HabilidadesDeUsuarios.findAll({
                        attributes: [['id_habilidad_de_usuario','idHabilidadUsuario'],'puntaje_tecla'],
                        include:[{model: Habilidades, attributes: [['habilidad','concepto']], required: true}],
                        where: {id_usuario: `${idUsuario}`}
                    }),
                    calificacion: (await HabilidadesDeUsuarios.findAll({
                        attributes: [[sequelize.fn('AVG',sequelize.col('puntaje_tecla')),'Promedio']],
                        where: {id_usuario: `${idUsuario}`}
                    }))[0]
                },
                entornosProfesionales: {
                    aspectos: await EntornosDeUsuarios.findAll({
                        attributes: [['id_entorno_de_usuario','idEntornoUsuario'],'puntaje_tecla'],
                        include:[{model: Entornos,attributes: [['entorno','concepto']],required: true}],
                        where: {id_usuario: `${idUsuario}`}
                    }),
                    calificacion: (await EntornosDeUsuarios.findAll({
                        attributes: [[sequelize.fn('AVG',sequelize.col('puntaje_tecla')),'Promedio']],
                        where: {id_usuario: `${idUsuario}`}
                    }))[0]
                }
            }
            return usuario;
        } else {
            throw new Error('El usuario no se encuentra registrado')
        }
    } catch (error) {
        console.log(`Error en el modelo al consultar la información del usuario: ${error}`);
        throw new Error(error.message);
    }
}

// Exportar los modulos
module.exports = {consultarUsuario};