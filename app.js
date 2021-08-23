// Importar los modulos necesarios
const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');

const sequelize = require('./db/db.conexion');
const CredencialUsuarios = require('./db/db.modelo.credencialUsuarios');
const CredencialEmpresas = require('./db/db.modelo.credencialEmpresas');
const Educacion = require('./db/db.modelo.educacion');
const Usuarios = require('./db/db.modelo.usuarios');
const Empresas = require('./db/db.modelo.empresas');
const CertificacionesDeUsuarios = require('./db/db.modelo.certificacionesUsuarios');
const Idiomas = require('./db/db.modelo.idiomas');
const DominioIdiomas = require('./db/db.modelo.dominioIdiomas');
const IdiomasDeUsuarios = require('./db/db.modelo.idiomasUsuarios');
const Hobbies = require('./db/db.modelo.hobbies');
const HobbiesDeUsuarios = require('./db/db.modelo.hobbiesUsuarios');
const RepresentantesDeEmpresas = require('./db/db.modelo.representantesEmpresas');
const Conocimientos = require('./db/db.modelo.conocimientos');
const ConocimientoDeUsuarios = require('./db/db.modelo.conocimientosUsuarios');
const Tecnologias = require('./db/db.modelo.tecnologias');
const TecnologiasDeUsuarios = require('./db/db.modelo.tecnologiasUsuarios');
const Desempeno = require('./db/db.modelo.desempeno');
const DesempenoDeUsuarios = require('./db/db.modelo.desempenoUsuarios');
const Habilidades = require('./db/db.modelo.habilidades');
const HabilidadesDeUsuarios = require('./db/db.modelo.habilidadesUsuarios');
const Entornos = require('./db/db.modelo.entornos');
const EntornosDeUsuarios = require('./db/db.modelo.entornosUsuarios');
const Relaciones = require('./db/db.modelo.relacionUsuarios');
const Contactos = require('./db/db.modelo.contactos');
const Comentarios = require('./db/db.modelo.comentarios');

// Middlewares globales
app.use(express.json());
app.use(cors());

// Configuraciones globales
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Inicializar el servidor
const iniciarServidor = async () =>{
    try {
        await CredencialUsuarios.sync();
        await CredencialEmpresas.sync();
        await Educacion.sync();
        await Usuarios.sync();
        await Empresas.sync();
        await CertificacionesDeUsuarios.sync();
        await Idiomas.sync();
        await DominioIdiomas.sync();
        await IdiomasDeUsuarios.sync();
        await Hobbies.sync();
        await HobbiesDeUsuarios.sync();
        await RepresentantesDeEmpresas.sync();
        await Conocimientos.sync();
        await ConocimientoDeUsuarios.sync();
        await Tecnologias.sync();
        await TecnologiasDeUsuarios.sync();
        await Desempeno.sync();
        await DesempenoDeUsuarios.sync();
        await Habilidades.sync();
        await HabilidadesDeUsuarios.sync();
        await Entornos.sync();
        await EntornosDeUsuarios.sync();
        await Relaciones.sync();
        await Contactos.sync();
        await Comentarios.sync();
        await sequelize.authenticate();
        console.log('Se establecio una conexión exitosa con la DB');
        app.listen(process.env.PORT, ()=>{
            console.log(`El servidor se ha iniciado correctamente en http://${process.env.HOST}:${process.env.PORT}`);
        })
    } catch (error) {
        console.log(`Error al realizar la conexión con la DB: ${error}`);
    }
}

iniciarServidor();

// Inicializar las rutas del servidor