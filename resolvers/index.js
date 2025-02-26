const materialResolvers = require('./materialResolvers');
const manufacturerResolvers = require('./manufacturerResolvers');
const priceResolvers = require('./priceResolvers');

module.exports = {
  Query: {
    ...materialResolvers.Query,
    ...manufacturerResolvers.Query,
    ...priceResolvers.Query
  },
  Mutation: {
    ...materialResolvers.Mutation,
    ...manufacturerResolvers.Mutation
  }
};