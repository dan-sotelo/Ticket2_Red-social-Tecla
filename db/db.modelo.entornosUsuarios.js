// Importar los modulos necesarios
const {DataTypes, Model} = require('sequelize');
const sequelize = require('./db.conexion');
const Usuarios = require('./db.modelo.usuarios');
const Entornos = require('./db.modelo.entornos');

// Definir el modelo de la tabla para la DB
const EntornosDeUsuarios = sequelize.define('entornos_de_usuarios',{
    id_entorno_de_usuario:{
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_usuario:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_entorno:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    puntaje_tecla:{
        type: DataTypes.FLOAT,
        allowNull: false
    }
}, {
    timestamps: true,
    createdAt: 'fecha_registro',
    updatedAt: 'fecha_actualizacion'
});
EntornosDeUsuarios.belongsTo(Usuarios, {foreignKey: 'id_usuario'});
Usuarios.hasMany(EntornosDeUsuarios, {foreignKey: 'id_usuario'});

EntornosDeUsuarios.belongsTo(Entornos, {foreignKey: 'id_entorno'});
Entornos.hasMany(EntornosDeUsuarios, {foreignKey: 'id_entorno'});

// Exportar modelo
module.exports = EntornosDeUsuarios;