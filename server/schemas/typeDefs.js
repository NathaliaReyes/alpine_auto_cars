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
    make: String!
    model: String!
    year: Int!
    price: Int!
    color: String!
    mileage: Int!
    description: String
    images: [String]
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
    allClients: [Client]
  }
    
  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    addCar(make: String!, model: String!, year: Int!, price: Int!, color: String!, mileage: Int!, created_at: Date, updated_at: Date, description: String, images: [String]): Car
    login(email: String!, password: String!): Auth
    updateCar(_id: ID!, make: String, model: String, year: Int, price: Int, color: String, mileage: Int, description: String,  images: [String]): Car
    deleteCar(_id: ID!): Car
    addClient(firstName: String!, lastName: String!, email: String!, phone: String!, inquiry: String!, message: String!): Client
    allClients: [Client]  
  }
`;

module.exports = typeDefs;