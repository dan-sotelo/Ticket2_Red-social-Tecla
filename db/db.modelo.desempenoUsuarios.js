// Importar los modulos necesarios
const {DataTypes, Model} = require('sequelize');
const sequelize = require('./db.conexion');
const Usuarios = require('./db.modelo.usuarios');
const Desempeno = require('./db.modelo.desempeno');

// Definir el modelo de la tabla para la DB
const DesempenoDeUsuarios = sequelize.define('desempeno_de_usuarios',{
    id_desempeno_de_usuario:{
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_usuario:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_desempeno:{
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
DesempenoDeUsuarios.belongsTo(Usuarios, {foreignKey: 'id_usuario'});
Usuarios.hasMany(DesempenoDeUsuarios, {foreignKey: 'id_usuario'});

DesempenoDeUsuarios.belongsTo(Desempeno, {foreignKey: 'id_desempeno'});
Desempeno.hasMany(DesempenoDeUsuarios, {foreignKey: 'id_desempeno'});

// Exportar modelo
module.exports = DesempenoDeUsuarios;