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
mutation AddCar($make: String, $model: String, $year: Int, $stock: Int, $mileage: Int, $retailPrice: Int, $askingPrice: Int, $color: String, $trim: String, $engine: String, $vin: String, $transmission: String, $description: String, $engineType: String, $driveTrain: String, $doors: Int, $cabType: String, $images: [String]) {
  addCar(make: $make, model: $model, year: $year, stock: $stock, mileage: $mileage, retail_price: $retailPrice, asking_price: $askingPrice, color: $color, trim: $trim, engine: $engine, vin: $vin, transmission: $transmission, description: $description, engineType: $engineType, driveTrain: $driveTrain, doors: $doors, cabType: $cabType, images: $images) {
    _id
    asking_price
    cabType
    color
    created_at
    description
    doors
    driveTrain
    engine
    engineType
    images
    make
    mileage
    model
    retail_price
    stock
    transmission
    trim
    updated_at
    vin
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
    price
    updated_at
    year
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
    price
    updated_at
    year
  }
}`;