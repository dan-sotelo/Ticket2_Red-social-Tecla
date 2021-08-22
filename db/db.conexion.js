// Importar los modulos necesarios
const {Sequelize,DataTypes,Modelo} = require('sequelize');

// Realizar la conexión con la base de datos
const sequelize = new Sequelize(process.env.DB_NAME, null, null, {
    dialect: 'mssql',
    server: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialectOptions: {
        authentication: {
            type: 'default',
            options: {
                encrypt: true,
                userName: process.env.DB_USER,
                password: process.env.DB_PASS
            }
        }
    }
});

// Exportar el modulo
module.exports = sequelize;