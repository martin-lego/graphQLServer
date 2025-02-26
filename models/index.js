const Sequelize = require('sequelize');
const sequelize = require('../config');

const Manufacturer = require('./manufacturer');
const Material = require('./material');
const Competitor = require('./competitor');
const Price = require('./price');
const Unit = require('./unit');

// Material.belongsTo(Manufacturer, { foreignKey: 'manufacturer_id', as: 'manufacturer' });

module.exports = { sequelize, Manufacturer, Material, Competitor, Price, Unit };