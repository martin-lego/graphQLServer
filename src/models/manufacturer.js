const { DataTypes } = require('sequelize');
const sequelize = require('../config');

const Manufacturer = sequelize.define('Manufacturer', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
}, { tableName: 'manufacturers', timestamps: false });

module.exports = Manufacturer;