// Importar los modulos necesarios
const {DataTypes, Model} = require('sequelize');
const sequelize = require('./db.conexion');

// Definir el modelo de la tabla para la DB
const Credenciales = sequelize.define('credenciales',{
    id_credencial:{
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false
    },
    credencial:{
        type: DataTypes.STRING(25),
        allowNull: false
    }
}, {
    timestamps: false
});

// Exportar el modelo
module.exports = Credenciales;