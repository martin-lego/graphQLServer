const { gql } = require('apollo-server-express');
const materialTypeDefs = require('./materialSchema');
const manufacturerTypeDefs = require('./manufacturerSchema');
const priceTypeDefs = require('./priceSchema');

const rootTypeDefs = gql`
  type Query
  type Mutation
`;

module.exports = [rootTypeDefs, materialTypeDefs, manufacturerTypeDefs, priceTypeDefs];