const { gql } = require('apollo-server');

const materialSchema = gql`
  type Material {
    id: ID!
    name: String!
    description: String
    long_description: String
    customer_part_id: String
    category: String
    manufacturer: Manufacturer
  }

  extend type Query {
    getAllMaterials: [Material]
    getMaterialsByManufacturer(name: String!, limit: Int, offset: Int): [Material]
  }
`;

module.exports = materialSchema;