import gql from 'graphql-tag';

export const LOGIN = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      id
    }
  }
`;
