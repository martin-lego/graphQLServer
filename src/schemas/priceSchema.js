const { gql } = require('apollo-server-express');

const priceTypeDefs = gql`
  """ Price statistics for a category. """
  type PriceStats {
    """ The number of items. """
    itemCount: Int!
    
    """ The average price of the items. """
    avgPrice: Float
    
    """ The minimum price of the items. """
    minPrice: Float

    """ The maximum price of the items. """
    maxPrice: Float
  }

  extend type Query {
    """ Fetches price statistics for a given category. """
    getPriceStatsByCategory(category: String!): PriceStats
  }
`;

module.exports = priceTypeDefs;