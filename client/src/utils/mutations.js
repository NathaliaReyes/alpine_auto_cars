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
