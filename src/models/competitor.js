const { DataTypes } = require('sequelize');
const sequelize = require('../config');

const Competitor = sequelize.define('Competitor', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING },
  part_name: { type: DataTypes.STRING },
  part_id: { type: DataTypes.STRING },
}, { tableName: 'competitors', timestamps: false });

module.exports = Competitor;