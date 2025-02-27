const { DataTypes } = require('sequelize');
const sequelize = require('../config');
const Material = require('./material');

const Unit = sequelize.define('Unit', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  material_id: { type: DataTypes.INTEGER, references: { model: Material, key: 'id' } },
  unit_of_measure: { type: DataTypes.STRING },
  unit_quantity: { type: DataTypes.INTEGER },
  requested_quantity: { type: DataTypes.INTEGER },
}, { tableName: 'units', timestamps: false });

module.exports = Unit;