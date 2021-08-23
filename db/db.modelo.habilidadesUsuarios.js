// Importar los modulos necesarios
const {DataTypes, Model} = require('sequelize');
const sequelize = require('./db.conexion');
const Usuarios = require('./db.modelo.usuarios');
const Habilidades = require('./db.modelo.habilidades');

// Definir el modelo de la tabla para la DB
const HabilidadesDeUsuarios = sequelize.define('habilidades_de_usuarios',{
    id_habilidad_de_usuario:{
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_usuario:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_habilidad:{
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
HabilidadesDeUsuarios.belongsTo(Usuarios, {foreignKey: 'id_usuario'});
Usuarios.hasMany(HabilidadesDeUsuarios, {foreignKey: 'id_usuario'});

HabilidadesDeUsuarios.belongsTo(Habilidades, {foreignKey: 'id_habilidad'});
Habilidades.hasMany(HabilidadesDeUsuarios, {foreignKey: 'id_habilidad'});

// Exportar modelo
module.exports = HabilidadesDeUsuarios;