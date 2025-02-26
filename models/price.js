const { DataTypes } = require('sequelize');
const sequelize = require('../config');
const Material = require('./material');

const Price = sequelize.define('Price', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  material_id: { type: DataTypes.INTEGER, references: { model: Material, key: 'id' } },
  requested_unit_price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
}, { tableName: 'prices', timestamps: false });

module.exports = Price;