// Importar los modulos necesarios
const {DataTypes, Model} = require('sequelize');
const sequelize = require('./db.conexion');
const Usuarios = require('./db.modelo.usuarios');
const Conocimientos = require('./db.modelo.conocimientos');

// Definir el modelo de la tabla para la DB
const ConocimientoDeUsuarios = sequelize.define('conocimiento_de_usuarios',{
    id_conocimiento_de_usuario:{
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_usuario:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_conocimiento:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    puntaje_tecla:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: true,
    createdAt: 'fecha_registro',
    updatedAt: 'fecha_actualizacion'
});
ConocimientoDeUsuarios.belongsTo(Usuarios, {foreignKey: 'id_usuario'});
Usuarios.hasMany(ConocimientoDeUsuarios, {foreignKey: 'id_usuario'});

ConocimientoDeUsuarios.belongsTo(Conocimientos, {foreignKey: 'id_conocimiento'});
Conocimientos.hasMany(ConocimientoDeUsuarios, {foreignKey: 'id_conocimiento'});

// Exportar modelo
module.exports = ConocimientoDeUsuarios;