// Importar los modulos necesarios
const {DataTypes, Model} = require('sequelize');
const sequelize = require('./db.conexion');
const Usuarios = require('./db.modelo.usuarios');
const Relaciones = require('./db.modelo.relacionUsuarios');

// Definir el modelo de la tabla para la DB
const Contactos = sequelize.define('contactos',{
    id_conexion:{
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_usuario:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_contacto:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_relacion:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: true,
    createdAt: 'fecha_registro',
    updatedAt: 'fecha_actualizacion'
});
Contactos.belongsTo(Usuarios, {foreignKey: 'id_usuario'});
Usuarios.hasMany(Contactos, {foreignKey: 'id_usuario'});

Contactos.belongsTo(Usuarios, {foreignKey: 'id_contacto'});
Usuarios.hasMany(Contactos, {foreignKey: 'id_contacto'});

Contactos.belongsTo(Relaciones, {foreignKey: 'id_relacion'});
Relaciones.hasMany(Contactos, {foreignKey: 'id_relacion'});

// Exportar modelo
module.exports = Contactos;