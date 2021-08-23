// Importar los modulos necesarios
const {DataTypes, Model} = require('sequelize');
const sequelize = require('./db.conexion');

// Definir el modelo de la tabla para la DB
const Educacion = sequelize.define('grados_academicos',{
    id_grado:{
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false
    },
    grado_academico:{
        type: DataTypes.STRING(25),
        allowNull: false
    }
}, {
    timestamps: true,
    createdAt: 'fecha_registro',
    updatedAt: 'fecha_actualizacion'
});

// Exportar el modelo
module.exports = Educacion;