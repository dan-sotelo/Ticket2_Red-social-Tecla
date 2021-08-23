// Importar los modulos necesarios
const {DataTypes, Model} = require('sequelize');
const sequelize = require('./db.conexion');
const Usuarios = require('./db.modelo.usuarios');
const Hobbies = require('./db.modelo.hobbies');

// Definir el modelo de la tabla para la DB
const HobbiesDeUsuarios = sequelize.define('hobbies_de_usuarios',{
    id_hobbie_de_usuario:{
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_usuario:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_hobbie:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: true,
    createdAt: 'fecha_registro',
    updatedAt: 'fecha_actualizacion'
});
HobbiesDeUsuarios.belongsTo(Usuarios, {foreignKey: 'id_usuario'});
Usuarios.hasMany(HobbiesDeUsuarios, {foreignKey: 'id_usuario'});

HobbiesDeUsuarios.belongsTo(Hobbies, {foreignKey: 'id_hobbie'});
Hobbies.hasMany(HobbiesDeUsuarios, {foreignKey: 'id_hobbie'});

// Exportar el modelo
module.exports = HobbiesDeUsuarios;