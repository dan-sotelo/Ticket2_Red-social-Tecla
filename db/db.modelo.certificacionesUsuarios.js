// Importar los modulos necesarios
const {DataTypes, Model} = require('sequelize');
const sequelize = require('./db.conexion');
const Usuarios = require('./db.modelo.usuarios');

// Definir el modelo de la tabla para la DB
const CertificacionesDeUsuarios = sequelize.define('certificaciones_de_usuarios',{
    id_certificacion:{
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false
    },
    certificacion:{
        type: DataTypes.STRING(100),
        allowNull: false
    },
    id_usuario:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    institucion:{
        type: DataTypes.STRING(100),
        allowNull: false
    },
    expedicion:{
        type: DataTypes.STRING(15),
        allowNull: false
    },
    expiracion: {
        type: DataTypes.STRING(15),
        allowNull: true
    },
    folio: {
        type: DataTypes.STRING(50),
        allowNull: true
    }
}, {
    timestamps: true,
    createdAt: 'fecha_registro',
    updatedAt: 'fecha_actualizacion'
});
CertificacionesDeUsuarios.belongsTo(Usuarios, {foreignKey: 'id_usuario'});
Usuarios.hasMany(CertificacionesDeUsuarios, {foreignKey: 'id_usuario'});

// Exportar el modelo
module.exports = CertificacionesDeUsuarios;