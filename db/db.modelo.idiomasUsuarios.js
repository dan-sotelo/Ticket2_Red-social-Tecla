// Importar los modulos necesarios
const {DataTypes, Model} = require('sequelize');
const sequelize = require('./db.conexion');
const Usuarios = require('./db.modelo.usuarios');
const Idiomas = require('./db.modelo.idiomas');
const DominioIdiomas = require('./db.modelo.dominioIdiomas');

// Definir el modelo de la tabla para la DB
const IdiomasDeUsuarios = sequelize.define('idiomas_de_usuarios',{
    id_idioma_de_usuario:{
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_usuario:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_idioma:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_nivel:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: true,
    createdAt: 'fecha_registro',
    updatedAt: 'fecha_actualizacion'
});
IdiomasDeUsuarios.belongsTo(Usuarios, {foreignKey: 'id_usuario'});
Usuarios.hasMany(IdiomasDeUsuarios, {foreignKey: 'id_usuario'});

IdiomasDeUsuarios.belongsTo(Idiomas, {foreignKey: 'id_idioma'});
Idiomas.hasMany(IdiomasDeUsuarios, {foreignKey: 'id_idioma'});

IdiomasDeUsuarios.belongsTo(DominioIdiomas, {foreignKey: 'id_nivel'});
DominioIdiomas.hasMany(IdiomasDeUsuarios, {foreignKey: 'id_nivel'});

// Exportar modelo
module.exports = IdiomasDeUsuarios;