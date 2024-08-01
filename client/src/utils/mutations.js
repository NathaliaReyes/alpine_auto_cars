import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        password
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        email
      }
    }
  }
`;

export const ADD_CLIENT = gql`
  mutation addClient($firstName: String!, $lastName: String!, $email: String!, $phone: String!, $inquiry: String!, $message: String!) {
    addClient(firstName: $firstName, lastName: $lastName, email: $email, phone: $phone, inquiry: $inquiry, message: $message) {
      _id
      firstName
      lastName
      email
      phone
      inquiry
      message
    }
  }
`;

export const ADD_CAR = gql`
mutation AddCar($make: String!, $model: String!, $year: Int!, $price: Int!, $color: String!, $mileage: Int!, $description: String, $images: [String]) {
  addCar(make: $make, model: $model, year: $year, price: $price, color: $color, mileage: $mileage, description: $description, images: $images) {
    _id
    color
    created_at
    description
    images
    make
    mileage
    model
    price
    updated_at
    year
  }
}
`;

export const UPDATE_CAR = gql`
mutation UpdateCar($carData: CarInput!) {
  updateCar(carData: $carData) {
    _id
    color
    created_at
    description
    images
    make
    mileage
    model
    updated_at
    year
    asking_price
    cabType
    doors
    driveTrain
    engine
    engineType
    retail_price
    stock
    transmission
    trim
    vin
  }
}
`;

export const DELETE_CAR = gql`
mutation DeleteCar($id: ID!) {
  deleteCar(_id: $id) {
    _id
    color
    created_at
    description
    images
    make
    mileage
    model
    updated_at
    year
    asking_price
    cabType
    doors
    driveTrain
    engine
    engineType
    retail_price
    stock
    transmission
    trim
    vin
  }
}`;