const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schemas');
const resolvers = require('./resolvers');
const { sequelize } = require('./models');

const server = new ApolloServer({ typeDefs, resolvers });

sequelize.sync().then(() => {
  server.listen().then(({ url }) => {
    console.log(`Servidor GraphQL listen on ${url}`);
  });
});