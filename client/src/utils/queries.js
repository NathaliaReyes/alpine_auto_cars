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