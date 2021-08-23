// Importar los modulos necesarios
const {DataTypes, Model} = require('sequelize');
const sequelize = require('./db.conexion');
const CredencialUsuarios = require('./db.modelo.credencialUsuarios');
const Educacion = require('./db.modelo.educacion');

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
    usuario_pais: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    usuario_estado: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    usuario_municipio:{
        type: DataTypes.STRING(40),
        allowNull: false
    },
    usuario_edad:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_grado:{
        type: DataTypes.INTEGER,
        allowNull: false
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

Usuarios.belongsTo(Educacion, {foreignKey: 'id_grado'});
Educacion.hasMany(Usuarios, {foreignKey: 'id_grado'});

// Exportar el modelo
module.exports = Usuarios;