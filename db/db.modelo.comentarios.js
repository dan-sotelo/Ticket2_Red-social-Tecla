// Importar los modulos necesarios
const {DataTypes, Model} = require('sequelize');
const sequelize = require('./db.conexion');
const Usuarios = require('./db.modelo.usuarios');
const Empresas = require('./db.modelo.empresas');

// Definir el modelo de la tabla para la DB
const Comentarios = sequelize.define('comentarios',{
    id_comentario:{
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_usuario_receptor:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_usuario_emisor:{
        type: DataTypes.INTEGER,
        allowNull: true
    },
    id_empresa_emisora:{
        type: DataTypes.INTEGER,
        allowNull: true
    },
    comentario:{
        type: DataTypes.STRING(250)
    }
}, {
    timestamps: true,
    createdAt: 'fecha_registro',
    updatedAt: 'fecha_actualizacion'
});
Comentarios.belongsTo(Usuarios, {foreignKey: 'id_usuario_receptor'});
Usuarios.hasMany(Comentarios, {foreignKey: 'id_usuario_receptor'});

Comentarios.belongsTo(Usuarios, {foreignKey: 'id_usuario_emisor'});
Usuarios.hasMany(Comentarios, {foreignKey: 'id_usuario_emisor'});

Comentarios.belongsTo(Empresas, {foreignKey: 'id_empresa_emisora'});
Empresas.hasMany(Comentarios, {foreignKey: 'id_empresa_emisora'});

// Exportar modelo
module.exports = Comentarios;