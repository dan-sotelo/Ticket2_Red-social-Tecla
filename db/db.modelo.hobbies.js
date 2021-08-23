// Importar los modulos necesarios
const {DataTypes, Model} = require('sequelize');
const sequelize = require('./db.conexion');

// Definir el modelo de la tabla para la DB
const Hobbies = sequelize.define('hobbies',{
    id_hobbie:{
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false
    },
    hobbie:{
        type: DataTypes.STRING(20),
        allowNull: false
    }
}, {
    timestamps: true,
    createdAt: 'fecha_registro',
    updatedAt: 'fecha_actualizacion'
});

// Exportar modelo
module.exports = Hobbies;