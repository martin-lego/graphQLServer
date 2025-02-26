const { gql } = require('apollo-server');

const manufacturerSchema = gql`
  type Manufacturer {
    id: ID!
    name: String!
  }

  extend type Query {
    getManufacturer(id: ID!): Manufacturer
    getManufacturers: [Manufacturer]
  }

  extend type Mutation {
    updateManufacturer(id: ID!, name: String!): Manufacturer
  }
`;

module.exports = manufacturerSchema;