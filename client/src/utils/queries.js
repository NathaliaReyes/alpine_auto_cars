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