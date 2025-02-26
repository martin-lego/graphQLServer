const { Price, Material, sequelize } = require('../models');
const { Op, fn, col, Sequelize } = require('sequelize');

const priceResolvers = {
  Query: {
    /**
     * Retrieves price statistics for a given category.
     * 
     * @param {Object} _ - Unused parameter.
     * @param {Object} args - The arguments object.
     * @param {string} args.category - The category to retrieve price statistics for.
     * @returns {Promise<PriceStats>} The price statistics for the specified category.
     */
    getPriceStatsByCategory: async (_, { category }) => {
        const stats = await sequelize.query(
            `SELECT 
              COUNT(*) as "itemCount",
              AVG(requested_unit_price) as "avgPrice", 
              MIN(requested_unit_price) as "minPrice",
              MAX(requested_unit_price) as "maxPrice"
            FROM prices
            JOIN materials ON prices.material_id = materials.id
            WHERE materials.category = :category`,
            { replacements: { category }, type: Sequelize.QueryTypes.SELECT }
        );
        return stats[0];
    //   const stats = await Price.findOne({
    //     attributes: [
    //       [fn('COUNT', col('material.id')), 'itemCount'],
    //       [fn('MIN', col('requested_unit_price')), 'minPrice'],
    //       [fn('MAX', col('requested_unit_price')), 'maxPrice'],
    //       [fn('AVG', col('requested_unit_price')), 'avgPrice']
    //     ],
    //     include: {
    //       model: Material,
    //       as: 'material',
    //       where: { category: { [Op.iLike]: `%${category}%` } }
    //     },
    //     raw: true
    //   });

    //   return {
    //     category,
    //     minPrice: parseFloat(stats.minPrice) || 0,
    //     maxPrice: parseFloat(stats.maxPrice) || 0,
    //     avgPrice: parseFloat(stats.avgPrice) || 0,
    //     itemCount: parseInt(stats.itemCount, 10) || 0
    //   };
    }
  }
};

module.exports = priceResolvers;