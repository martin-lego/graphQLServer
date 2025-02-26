const { gql } = require('apollo-server');

const materialSchema = gql`
  """ Manufacturer of a material. """
  type Material {
    """ The ID of the material. """
    id: ID!

    """ The name of the material. """
    name: String!

    """ The description of the material. """
    description: String

    """ The long description of the material. """
    long_description: String

    """ The customer part ID of the material. """
    customer_part_id: String

    """ The category of the material. """
    category: String

    """ The manufacturer of the material. """
    manufacturer: Manufacturer
  }

  extend type Query {
    """ Fetches all materials. """
    getAllMaterials: [Material]
    
    """ Fetches materials by manufacturer. """
    getMaterialsByManufacturer(name: String!, limit: Int, offset: Int): [Material]
  }
`;

module.exports = materialSchema;