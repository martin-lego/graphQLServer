const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('verusen', 'postgres', 'postgres', {
    host: 'localhost',
    dialect: 'postgres',
});

module.exports = sequelize;