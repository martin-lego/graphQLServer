# 🚀 GraphQL API with PostgreSQL and Sequelize

This project is a GraphQL API built with Node.js, Apollo Server, Sequelize, and PostgreSQL. The API provides queries and mutations to manage materials, manufacturers, competitors, prices, and units. It also includes a Dockerized PostgreSQL database and a script to load data from `materials.csv`.

## 📌 Features
- **GraphQL API** using Apollo Server
- **PostgreSQL** as the database, managed with Sequelize ORM
- **Docker Compose** setup for easy deployment
- **CSV Data Ingestion** to populate the database
- **Pagination and filtering** for efficient querying

## 🛠️ Setup Instructions

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/martin-lego/graphQLServer.git
cd graphQleServer
```

### 2️⃣ Start PostgreSQL with Docker
Ensure you have Docker installed, then run:
```sh
docker-compose up -d
```
This will start a PostgreSQL container with the database ready.

### 3️⃣ Install Dependencies
```sh
npm install
```

### 4️⃣ Set Up Environment Variables
Create a `.env` file in the root directory and configure:
```
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgress
DB_NAME=verusen
```

### 5️⃣ Load Data from CSV
Copy the `materials.csv` file to the `scripts` folder and run:
```sh
node scripts/load_data.js
```

### 6️⃣ Start the GraphQL Server
```sh
npm start
```

### 7️⃣ Access GraphQL Playground
Once the server is running, open [http://localhost:4000](http://localhost:4000) in your browser.

## 🗃️ Database Schema
The PostgreSQL schema consists of the following tables:
- **manufacturers**: Stores manufacturer details.
- **materials**: Contains materials with descriptions and categories.
- **competitors**: Holds competitor part information.
- **prices**: Stores requested unit prices.
- **units**: Manages units of measure and requested quantities.

## 📊 Example GraphQL Queries

### Get All Materials with Manufacturer
```graphql
query {
  getAllMaterials {
    id,
    description,
    name,
    category,
    customer_part_id,
    long_description,
    manufacturer {
      id,
      name
    }
  }  
}
```

### Get Materials by Manufacturer with Pagination
```graphql
query {
  getMaterialsByManufacturer(name: "Acme", limit: 10, offset: 0) {
    id,
    category,
    description,
    name,
    customer_part_id,
    long_description,
    manufacturer {
      id,
      name
    }
  }
}
```

### Get Price Statistics by Category
```graphql
query {
  getPriceStatsByCategory(category: "Electronics") {
    itemCount
    avgPrice
    minPrice
    maxPrice
  }
}
```

## 📜 API Documentation
- Open GraphQL Playground at [http://localhost:4000/graphql](http://localhost:4000/graphql)
- The `Docs` tab provides auto-generated API documentation
- To visualize the schema, install `graphql-voyager` and navigate to `/voyager`

## 🏗️ Project Structure
```
.
├── models/          # Sequelize models
├── resolvers/       # GraphQL resolvers
├── schemas/         # GraphQL type definitions
├── scripts/         # Scripts (CSV loading, migrations)
├── docker-compose.yml # Docker setup for PostgreSQL
├── .env             # Environment variables
├── server.js        # Apollo Server entry point
└── README.md        # Documentation
```

## 🛠️ Built With
- **Node.js** & **Express.js**
- **GraphQL & Apollo Server**
- **PostgreSQL & Sequelize**
- **Docker** for database containerization

## 👤 Author
**Martín LeGo**
GitHub: [@martin-lego](https://github.com/martin-lego)

## 📄 License
This project is licensed under the MIT License.
