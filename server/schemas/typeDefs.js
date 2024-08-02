const typeDefs = `
  scalar Date

  type User {
    _id: ID
    username: String!
    password: String!
    email: String!
    created_at: Date
  }
  
  type Client {
    _id: ID
    firstName: String!
    lastName: String!
    email: String!
    phone: String!
    inquiry: String!
    message: String!
    created_at: Date
  }

  type Car {
    _id: ID
    make: String
    model: String
    year: Int
    stock: Int
    mileage: Int
    retail_price: Int
    asking_price: Int
    color: String
    trim: String
    engine: String
    vin: String
    transmission: String
    description: String
    engineType: String
    driveTrain: String
    vehicleType: String
    fuelType: String
    images: [String]
    created_at: Date
    updated_at: Date
  }

  input CarInput {
    carId: ID!
    make: String!
    model: String!
    year: Int!
    stock: Int
    mileage: Int
    retail_price: Int
    asking_price: Int
    color: String
    trim: String
    engine: String
    vin: String
    transmission: String
    description: String
    engineType: String
    driveTrain: String
    vehicleType: String
    images: [String]
    fuelType: String
    created_at: Date
    updated_at: Date
  }

  type Auth {
    token: ID!
    user: User
  }
  
  type Query {
    me: User
    client(_id: ID!): Client
    cars: [Car]
    allClients: [Client]
  }
    
  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    addCar(make: String, model: String, year: Int, stock: Int, mileage: Int, retail_price: Int, asking_price: Int, color: String, trim: String, engine: String, vin: String, transmission: String, description: String, engineType: String, driveTrain: String, fuelType: String, vehicleType: String, images: [String]): Car
    login(email: String!, password: String!): Auth
    updateCar(carData: CarInput!): Car
    deleteCar(_id: ID!): Car
    addClient(firstName: String!, lastName: String!, email: String!, phone: String!, inquiry: String!, message: String!): Client
    allClients: [Client]  
  }
`;

module.exports = typeDefs;