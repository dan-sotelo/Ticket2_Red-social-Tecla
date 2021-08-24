// Importar los modulos necesarios
const {DataTypes, Model} = require('sequelize');
const sequelize = require('./db.conexion');
const CredencialEmpresas = require('./db.modelo.credencialEmpresas');
const Paises = require('./db.modelo.paises');
const Estados = require('./db.modelo.estados');
const Municipios = require('./db.modelo.municipios');

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
    id_pais:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_estado:{
        type: DataTypes.INTEGER,
        allowNull: true
    },
    id_municipio:{
        type: DataTypes.INTEGER,
        allowNull: true
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

Empresas.belongsTo(Paises, {foreignKey: 'id_pais'});
Paises.hasMany(Empresas, {foreignKey: 'id_pais'});

Empresas.belongsTo(Estados, {foreignKey: 'id_estado'});
Estados.hasMany(Empresas, {foreignKey: 'id_estado'});

Empresas.belongsTo(Municipios, {foreignKey: 'id_municipio'});
Municipios.hasMany(Empresas, {foreignKey: 'id_municipio'});


// Exportar el modelo
module.exports = Empresas;