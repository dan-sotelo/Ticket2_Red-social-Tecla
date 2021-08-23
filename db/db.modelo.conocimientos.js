// Importar los modulos necesarios
const {DataTypes, Model} = require('sequelize');
const sequelize = require('./db.conexion');

// Definir el modelo de la tabla para la DB
const Conocimientos = sequelize.define('conocimientos',{
    id_conocimiento:{
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false
    },
    conocimiento:{
        type: DataTypes.STRING(20),
        allowNull: false
    }
}, {
    timestamps: true,
    createdAt: 'fecha_registro',
    updatedAt: 'fecha_actualizacion'
});

// Exportar el modelo
module.exports = Conocimientos;