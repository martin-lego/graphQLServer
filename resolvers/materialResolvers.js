const { Material, Manufacturer } = require('../models');
const { Op } = require('sequelize');

const materialResolvers = {
  Query: {
    getAllMaterials: async () => {
        return await Material.findAll({ include: { model: Manufacturer, as: 'manufacturer' } });
    },
    getMaterialsByManufacturer: async (_, { name, limit = 10, offset = 0 }) => {
      return await Material.findAll({
        include: { model: Manufacturer, as: 'manufacturer' },
        where: { '$manufacturer.name$': { [Op.iLike]: `%${name}%` } },
        limit,
        offset,
      });
    },
  },
};

module.exports = materialResolvers;