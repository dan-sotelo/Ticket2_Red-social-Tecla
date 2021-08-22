// Importar los modulos necesarios
const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const sequelize = require('./db/db.conexion');

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
        await sequelize.authenticate();
        app.listen(process.env.PORT, ()=>{
            console.log(`El servidor se ha iniciado correctamente en http://${process.env.HOST}:${process.env.PORT}`);
        })
    } catch (error) {
        console.log(`Error al realizar la conexión con la DB: ${error}`);
    }
}

iniciarServidor();

// Inicializar las rutas del servidor