const { gql } = require('apollo-server');

const manufacturerSchema = gql`
  """ Manufacturer of a material. """
  type Manufacturer {
    """ The ID of the manufacturer. """
    id: ID!

    """ The name of the manufacturer. """
    name: String!
  }

  extend type Query {
    """ Fetches a manufacturer by ID. """
    getManufacturer(id: ID!): Manufacturer

    """ Fetches all manufacturers. """
    getManufacturers: [Manufacturer]
  }

  extend type Mutation {
    """ Creates a new manufacturer. """
    updateManufacturer(id: ID!, name: String!): Manufacturer
  }
`;

module.exports = manufacturerSchema;