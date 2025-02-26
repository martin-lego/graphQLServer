const { gql } = require('apollo-server-express');

const priceTypeDefs = gql`
  type PriceStats {
    itemCount: Int!
    avgPrice: Float
    minPrice: Float
    maxPrice: Float
  }

  extend type Query {
    getPriceStatsByCategory(category: String!): PriceStats
  }
`;

module.exports = priceTypeDefs;