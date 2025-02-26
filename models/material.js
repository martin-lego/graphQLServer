const { DataTypes } = require('sequelize');
const sequelize = require('../config');
const Manufacturer = require('./manufacturer');

const Material = sequelize.define('Material', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  long_description: { type: DataTypes.TEXT },
  customer_part_id: { type: DataTypes.STRING },
  category: { type: DataTypes.STRING },
  manufacturer_id: { type: DataTypes.INTEGER, references: { model: Manufacturer, key: 'id' } },
}, { tableName: 'materials', timestamps: false });

Material.belongsTo(Manufacturer, { foreignKey: 'manufacturer_id', as: 'manufacturer' });

module.exports = Material;