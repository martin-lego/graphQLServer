const { Manufacturer } = require('../models');

const manufacturerResolvers = {
  Query: {
    getManufacturer: async (_, { id }) => {
      return await Manufacturer.findByPk(id);
    },
    getManufacturers: async () => {
      return await Manufacturer.findAll();
    },
  },
  Mutation: {
    updateManufacturer: async (_, { id, name }) => {
      const manufacturer = await Manufacturer.findByPk(id);
      if (!manufacturer) throw new Error('Manufacturer not found');
      manufacturer.name = name;
      await manufacturer.save();
      return manufacturer;
    },
  },
};

module.exports = manufacturerResolvers;