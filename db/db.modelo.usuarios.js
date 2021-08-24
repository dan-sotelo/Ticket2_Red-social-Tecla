// Importar los modulos necesarios
const {DataTypes, Model} = require('sequelize');
const sequelize = require('./db.conexion');
const CredencialUsuarios = require('./db.modelo.credencialUsuarios');
const Paises = require('./db.modelo.paises');
const Estados = require('./db.modelo.estados');
const Municipios = require('./db.modelo.municipios');

// Definir el modelo de la tabla para la DB
const Usuarios = sequelize.define('usuarios',{
    id_usuario:{
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false
    },
    usuario_nombre:{
        type: DataTypes.STRING(100),
        allowNull: false
    },
    usuario_correo:{
        type: DataTypes.STRING(50),
        allowNull: false
    },
    usuario_password:{
        type: DataTypes.STRING(100),
        allowNull: false
    },
    id_credencial:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    usuario_imagen: {
        type: DataTypes.STRING(150),
        allowNull: true
    },
    id_pais: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    id_estado: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    id_municipio:{
        type: DataTypes.INTEGER,
        allowNull: true
    },
    usuario_edad:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    usuario_telefono:{
        type: DataTypes.STRING(15),
        allowNull: true
    },
    usuario_linkedin:{
        type: DataTypes.STRING(100),
        allowNull: true
    },
    usuario_github:{
        type: DataTypes.STRING(50),
        allowNull: true
    },
    usuario_activo:{
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
}, {
    timestamps: true,
    createdAt: 'fecha_registro',
    updatedAt: 'fecha_actualizacion'
});
Usuarios.belongsTo(CredencialUsuarios,{foreignKey: 'id_credencial'});
CredencialUsuarios.hasMany(Usuarios,{foreignKey: 'id_credencial'});

Usuarios.belongsTo(Paises, {foreignKey: 'id_pais'});
Paises.hasMany(Usuarios, {foreignKey: 'id_pais'});

Usuarios.belongsTo(Estados, {foreignKey: 'id_estado'});
Estados.hasMany(Usuarios, {foreignKey: 'id_estado'});

Usuarios.belongsTo(Municipios, {foreignKey: 'id_municipio'});
Municipios.hasMany(Usuarios, {foreignKey: 'id_municipio'});

// Exportar el modelo
module.exports = Usuarios;