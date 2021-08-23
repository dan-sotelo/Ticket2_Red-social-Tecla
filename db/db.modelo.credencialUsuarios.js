// Importar los modulos necesarios
const {DataTypes, Model} = require('sequelize');
const sequelize = require('./db.conexion');

// Definir el modelo de la tabla para la DB
const CredencialUsuarios = sequelize.define('credenciales_de_usuarios',{
    id_credencial_usuario:{
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false
    },
    credencial_usuario:{
        type: DataTypes.STRING(25),
        allowNull: false
    }
}, {
    timestamps: false
});

// Exportar el modelo
module.exports = CredencialUsuarios;