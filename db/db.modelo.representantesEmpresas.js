// Importar los modulos necesarios
const {DataTypes, Model} = require('sequelize');
const sequelize = require('./db.conexion');
const Empresas = require('./db.modelo.empresas');

// Definir el modelo de la tabla para la DB
const RepresentantesDeEmpresas = sequelize.define('representantes_de_empresas', {
    id_representante:{
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false
    },
    representante_nombre:{
        type: DataTypes.STRING(100),
        allowNull: false
    },
    representante_correo:{
        type: DataTypes.STRING(50),
        allowNull: false
    },
    representante_telefono:{
        type: DataTypes.STRING(15),
        allowNull: false
    },
    id_empresa:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    representante_departamento:{
        type: DataTypes.STRING(40),
        allowNull: false
    },
    representante_cargo:{
        type: DataTypes.STRING(30),
        allowNull: false
    },
    representante_activo:{
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
}, {
    timestamps: true,
    createdAt: 'fecha_registro',
    updatedAt: 'fecha_actualizacion'
});
RepresentantesDeEmpresas.belongsTo(Empresas, {foreignKey: 'id_empresa'});
Empresas.hasOne(RepresentantesDeEmpresas, {foreignKey: 'id_empresa'});

// Exportar el modelo
module.exports = RepresentantesDeEmpresas;