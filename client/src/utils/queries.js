import { gql } from '@apollo/client';

export const GET_ME = gql`
query Me {
  me {
    _id
    created_at
    email
    password
    username
  }
}
`;

export const GET_CARS = gql`
query Cars {
  cars {
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
}`;

export const ALL_CLIENTS = gql`
query All_CLIENTS {
  allClients {
    _id
    firstName
    lastName
    email
    phone
    inquiry
    message
    created_at
  }
}
`;