require('dotenv').config();
const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const typeDefs = require('../src/schemas');
const resolvers = require('../src/resolvers');
const request = require('supertest');

let server, url;

beforeAll(async () => {
  server = new ApolloServer({ typeDefs, resolvers });
  const { url: serverUrl } = await startStandaloneServer(server, { listen: { port: 4000 } });
  url = serverUrl;
});

afterAll(async () => {
  await server.stop();
});

describe('GraphQL Materials API', () => {
  it('should fetch all materials', async () => {
    const query = `
      query {
        getAllMaterials {
          id
          name
          description
          manufacturer {
            id
            name
          }
        }
      }
    `;

    const response = await request(url)
      .post('/')
      .send({ query });

    expect(response.status).toBe(200);
    expect(response.body.data.getAllMaterials).toBeInstanceOf(Array);
  });

  it('should fetch materials by manufacturer', async () => {
    const query = `
      query getMaterialsByManufacturer($name: String!) {
        getMaterialsByManufacturer(name: $name) {
          id
          name
          manufacturer {
            id
            name
          }
        }
      }
    `;

    const variables = { name: "OAG" };

    const response = await request(url)
      .post('/')
      .send({ query, variables });

    expect(response.status).toBe(200);
    expect(response.body.data.getMaterialsByManufacturer).toBeInstanceOf(Array);
  });
});