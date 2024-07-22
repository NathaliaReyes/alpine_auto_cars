const typeDefs = `
  scalar Date

  type User {
    _id: ID
    username: String!
    password: String!
    email: String!
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
  }
    
  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    addCar(make: String!, model: String!, year: Int!, price: Int!, color: String!, mileage: Int!, created_at: Date, updated_at: Date, description: String, images: [String]): Car
    login(email: String!, password: String!): Auth
    updateCar(_id: ID!, make: String, model: String, year: Int, price: Int, color: String, mileage: Int, description: String,  images: [String]): Car
    deleteCar(_id: ID!): Car
  }
`;

module.exports = typeDefs;