const { Material, Manufacturer } = require('../models');
const { Op } = require('sequelize');

const materialResolvers = {
  Query: {
    /**
     * Retrieves all materials from the database.
     * 
     * @async
     * @function getAllMaterials
     * @memberof materialResolvers.Query
     * @returns {Promise<Array>} A promise that resolves to an array of materials.
     */
    getAllMaterials: async () => {
        return await Material.findAll({ include: { model: Manufacturer, as: 'manufacturer' } });
    },

    /**
     * Retrieves materials by manufacturer name with pagination.
     * 
     * @async
     * @function getMaterialsByManufacturer
     * @memberof materialResolvers.Query
     * @param {Object} _ - Unused parameter.
     * @param {Object} args - Arguments for the query.
     * @param {string} args.name - The name of the manufacturer to filter materials by.
     * @param {number} [args.limit=10] - The maximum number of materials to return.
     * @param {number} [args.offset=0] - The number of materials to skip before starting to collect the result set.
     * @returns {Promise<Array>} A promise that resolves to an array of materials.
     */
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