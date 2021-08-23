// Importar los modulos necesarios
const {DataTypes, Model} = require('sequelize');
const sequelize = require('./db.conexion');
const Usuarios = require('./db.modelo.usuarios');
const Tecnologias = require('./db.modelo.tecnologias');

// Definir el modelo de la tabla para la DB
const TecnologiasDeUsuarios = sequelize.define('tecnologias_de_usuarios',{
    id_tecnologia_de_usuario:{
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_usuario:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_tecnologia:{
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
TecnologiasDeUsuarios.belongsTo(Usuarios, {foreignKey: 'id_usuario'});
Usuarios.hasMany(TecnologiasDeUsuarios, {foreignKey: 'id_usuario'});

TecnologiasDeUsuarios.belongsTo(Tecnologias, {foreignKey: 'id_tecnologia'});
Tecnologias.hasMany(TecnologiasDeUsuarios, {foreignKey: 'id_tecnologia'});

// Exportar modelo
module.exports = TecnologiasDeUsuarios;