// Importar los modulos necesarios
const {DataTypes, Model} = require('sequelize');
const sequelize = require('./db.conexion');

// Definir el modelo de la tabla para la DB
const Relaciones = sequelize.define('relacion_de_usuarios',{
    id_relacion:{
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false
    },
    relacion:{
        type: DataTypes.STRING(20),
        allowNull: false
    }
}, {
    timestamps: true,
    createdAt: 'fecha_registro',
    updatedAt: 'fecha_actualizacion'
});

// Exportar el modelo
module.exports = Relaciones;