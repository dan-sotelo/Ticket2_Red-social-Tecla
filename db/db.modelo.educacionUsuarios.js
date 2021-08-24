// Importar los modulos necesarios
const {DataTypes, Model} = require('sequelize');
const sequelize = require('./db.conexion');
const Usuarios = require('./db.modelo.usuarios');
const GradosAcademicos = require('./db.modelo.gradosAcademicos');

// Definir el modelo de la tabla para la DB
const Educacion = sequelize.define('educacion_de_usuarios',{
    id_educacion:{
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_usuario:{
        type: DataTypes.INTEGER,
        allowNull: false  
    },
    id_grado_academico: {
       type: DataTypes.INTEGER,
       allowNull: false 
    }
}, {
    timestamps: true,
    createdAt: 'fecha_registro',
    updatedAt: 'fecha_actualizacion'
});
Educacion.belongsTo(Usuarios, {foreignKey: 'id_usuario'});
Usuarios.hasMany(Educacion, {foreignKey: 'id_usuario'});

Educacion.belongsTo(GradosAcademicos, {foreignKey: 'id_grado_academico'});
GradosAcademicos.hasMany(Educacion, {foreignKey: 'id_grado_academico'});

// Exportar el modelo
module.exports = Educacion;