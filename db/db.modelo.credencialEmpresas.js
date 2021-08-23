// Importar los modulos necesarios
const {DataTypes, Model} = require('sequelize');
const sequelize = require('./db.conexion');

// Definir el modelo de la tabla para la DB
const CredencialEmpresas = sequelize.define('credenciales_de_empresas',{
    id_credencial_empresa:{
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false
    },
    credencial_empresa:{
        type: DataTypes.STRING(25),
        allowNull: false
    }
}, {
    timestamps: false
});

// Exportar el modelo
module.exports = CredencialEmpresas;