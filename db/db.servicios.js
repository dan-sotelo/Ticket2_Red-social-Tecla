// Importar los modulos necesarios
const Credenciales = require('./db.modelo.credenciales');
const GradosAcademicos = require('./db.modelo.gradosAcademicos');
const Idiomas = require('./db.modelo.idiomas');
const DominioIdiomas = require('./db.modelo.dominioIdiomas');
const Conocimientos = require('./db.modelo.conocimientos');
const Tecnologias = require('./db.modelo.tecnologias');
const Desempeno = require('./db.modelo.desempeno');
const Habilidades = require('./db.modelo.habilidades');
const Entornos = require('./db.modelo.entornos');
const Relaciones = require('./db.modelo.relacionUsuarios');

// Modulos para insertar valores iniciales en la tablas
let registrarCredenciales = async() =>{
    try{
        let credenciales = ['Administrador','Developer registrado', 'Empresa Partner','Empresa solicitante','Usuario Solicitante'];
        for(let tipo = 0; tipo < credenciales.length; tipo++){
            let credencialRegistrada = await Credenciales.findOne({where: {credencial: `${credenciales[tipo]}`}});
            if (credencialRegistrada == null){
                await Credenciales.create({credencial: credenciales[tipo]});
            }
        }
    } catch(error) {
        console.log(`Ocurrio un error al registrar las credenciales de usuario: ${error}`)
        throw new Error(`Ocurrio un error al registrar las credenciales de usuario: ${error.message}`)
    }
}

let registrarGradosAcademicos = async() =>{
    try{
        let grados = ['Media Superior', 'Carrera técnica', 'Licenciatura', 'Maestria', 'Doctorado'];
        for(let tipo = 0; tipo < grados.length; tipo++){
            let gradoRegistrado = await GradosAcademicos.findOne({where: {grado_academico: `${grados[tipo]}`}});
            if (gradoRegistrado == null){
                await GradosAcademicos.create({grado_academico: grados[tipo]});
            }
        }
    } catch(error) {
        console.log(`Ocurrio un error al registrar los grados academicos: ${error}`)
        throw new Error(`Ocurrio un error al registrar los grados academicos: ${error.message}`)
    }
}

let registrarIdiomas = async() =>{
    try{
        let idiomas = ['Español', 'Inglés', 'Frances', 'Portugues'];
        for(let tipo = 0; tipo < idiomas.length; tipo++){
            let idiomaRegistrado = await Idiomas.findOne({where: {idioma: `${idiomas[tipo]}`}});
            if (idiomaRegistrado == null){
                await Idiomas.create({idioma: idiomas[tipo]});
            }
        }
    } catch(error) {
        console.log(`Ocurrio un error al registrar los idiomas: ${error}`)
        throw new Error(`Ocurrio un error al registrar los idiomas: ${error.message}`)
    }
}

let registrarDominioDeIdiomas = async() =>{
    try{
        let niveles = ['Básico', 'Intermedio', 'Avanzado'];
        for(let tipo = 0; tipo < niveles.length; tipo++){
            let nivelRegistrado = await DominioIdiomas.findOne({where: {nivel: `${niveles[tipo]}`}});
            if (nivelRegistrado == null){
                await DominioIdiomas.create({nivel: niveles[tipo]});
            }
        }
    } catch(error) {
        console.log(`Ocurrio un error al registrar el nivel de dominio de idiomas: ${error}`)
        throw new Error(`Ocurrio un error al registrar el nivel de dominio de idiomas: ${error.message}`)
    }
}

let registrarConocimientos = async() =>{
    try{
        let conocimientos = ['DataBase', 'Apis', 'Testing', 'Seguridad','TeoriaObjetos'];
        for(let tipo = 0; tipo < conocimientos.length; tipo++){
            let conocimientoRegistrado = await Conocimientos.findOne({where: {conocimiento: `${conocimientos[tipo]}`}});
            if (conocimientoRegistrado == null){
                await Conocimientos.create({conocimiento: conocimientos[tipo]});
            }
        }
    } catch(error) {
        console.log(`Ocurrio un error al registrar los conocimientos: ${error}`)
        throw new Error(`Ocurrio un error al registrar los conocimientos: ${error.message}`)
    }
}

let registrarTecnologias = async() =>{
    try{
        let tecnologias = ['NodeJS', 'FrontEnd', 'Swagger', 'JavaScript'];
        for(let tipo = 0; tipo < tecnologias.length; tipo++){
            let tecnologiaRegistrada = await Tecnologias.findOne({where: {tecnologia: `${tecnologias[tipo]}`}});
            if (tecnologiaRegistrada == null){
                await Tecnologias.create({tecnologia: tecnologias[tipo]});
            }
        }
    } catch(error) {
        console.log(`Ocurrio un error al registrar las tecnologias: ${error}`)
        throw new Error(`Ocurrio un error al registrar las tecnologias: ${error.message}`)
    }
}

let registrarDesempeno = async() =>{
    try{
        let conceptos = ['CalidadCodigo', 'VelocidadEntrega', 'PerformanceCodigo'];
        for(let tipo = 0; tipo < conceptos.length; tipo++){
            let desempenoRegistrado = await Desempeno.findOne({where: {desempeno: `${conceptos[tipo]}`}});
            if (desempenoRegistrado == null){
                await Desempeno.create({desempeno: conceptos[tipo]});
            }
        }
    } catch(error) {
        console.log(`Ocurrio un error al registrar los conceptos de desempeño: ${error}`)
        throw new Error(`Ocurrio un error al registrar los conceptos de desempeño: ${error.message}`)
    }
}

let registrarHabilidadesBlandas = async() =>{
    try{
        let habilidades = ['Enfocado', 'TrabajoEquipo', 'Comprometido', 'Comunicacion', 'CapacidadAprendizaje', 'ResolucionProblemas'];
        for(let tipo = 0; tipo < habilidades.length; tipo++){
            let habilidadRegistrada = await Habilidades.findOne({where: {habilidad: `${habilidades[tipo]}`}});
            if (habilidadRegistrada == null){
                await Habilidades.create({habilidad: habilidades[tipo]});
            }
        }
    } catch(error) {
        console.log(`Ocurrio un error al registrar las habilidades blandas: ${error}`)
        throw new Error(`Ocurrio un error al registrar las habilidades blandas: ${error.message}`)
    }
}

let registrarEntornosProfesionales = async() =>{
    try{
        let entornos = ['GitHub', 'Trello', 'Slack', 'MetodologiasAgiles'];
        for(let tipo = 0; tipo < entornos.length; tipo++){
            let entornoRegistrado = await Entornos.findOne({where: {entorno: `${entornos[tipo]}`}});
            if (entornoRegistrado == null){
                await Entornos.create({entorno: entornos[tipo]});
            }
        }
    } catch(error) {
        console.log(`Ocurrio un error al registrar los entornos: ${error}`)
        throw new Error(`Ocurrio un error al registrar los entornos: ${error.message}`)
    }
}

let registrarRelacionUsuarios = async() =>{
    try{
        let relaciones = ['Solicitud enviada','Solicitud recibida','Contacto activo'];
        for(let tipo = 0; tipo < relaciones.length; tipo++){
            let relacionRegistrada = await Relaciones.findOne({where: {relacion: `${relaciones[tipo]}`}});
            if (relacionRegistrada == null){
                await Relaciones.create({relacion: relaciones[tipo]});
            }
        }
    } catch(error) {
        console.log(`Ocurrio un error al registrar las relaciones: ${error}`)
        throw new Error(`Ocurrio un error al registrar las relaciones: ${error.message}`)
    }
}

let registrarValoresIniciales = async() =>{
    try{
        await registrarCredenciales();
        await registrarGradosAcademicos();
        await registrarIdiomas();
        await registrarDominioDeIdiomas();
        await registrarConocimientos();
        await registrarTecnologias();
        await registrarDesempeno();
        await registrarHabilidadesBlandas();
        await registrarEntornosProfesionales();
        await registrarRelacionUsuarios();
    }catch(error){
        console.log(`Ocurrio un error al registrar los valores: ${error}`)
        throw new Error(`Ocurrio un error al registrar los valores iniciales: ${error.message}`)
    }
}

// Exportar los modulos
module.exports = {registrarValoresIniciales}