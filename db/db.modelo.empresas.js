// Importar los modulos necesarios
const {DataTypes, Model} = require('sequelize');
const sequelize = require('./db.conexion');
const CredencialEmpresas = require('./db.modelo.credencialEmpresas');

// Definir el modelo de la tabla para la DB
const Empresas = sequelize.define('empresas',{
    id_empresa:{
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false
    },
    empresa_nombre:{
        type: DataTypes.STRING(50),
        allowNull: false
    },
    empresa_correo:{
        type: DataTypes.STRING(50),
        allowNull: false
    },
    empresa_password:{
        type: DataTypes.STRING(80),
        allowNull: false
    },
    id_credencial:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    empresa_imagen:{
        type: DataTypes.STRING(150),
        allowNull: true
    },
    empresa_pais:{
        type: DataTypes.STRING(20),
        allowNull: false
    },
    empresa_estado:{
        type: DataTypes.STRING(20),
        allowNull: false
    },
    empresa_municipio:{
        type: DataTypes.STRING(40),
        allowNull: false
    },
    empresa_linkedin:{
        type: DataTypes.STRING(100),
        allowNull: true
    },
    empresa_activa:{
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
}, {
    timestamps: true,
    createdAt: 'fecha_registro',
    updatedAt: 'fecha_actualizacion'
});
Empresas.belongsTo(CredencialEmpresas, {foreignKey: 'id_credencial'});
CredencialEmpresas.hasMany(Empresas, {foreignKey: 'id_credencial'});

// Exportar el modelo
module.exports = Empresas;