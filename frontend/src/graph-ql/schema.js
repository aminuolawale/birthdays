import { gql } from "@apollo/client";

const SIGNUP = gql`
  mutation createUser(
    $email: String!
    $firstName: String!
    $lastName: String!
    $password: String!
  ) {
    createUser(
      email: $email
      firstName: $firstName
      lastName: $lastName
      password: $password
    ) {
      ok
      errors {
        message
      }
      result {
        fullName
        email
      }
    }
  }
`;

const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    tokenAuth(email: $email, password: $password) {
      token
    }
  }
`;

const ME = gql`
  query me {
    me {
      ok
      errors {
        message
      }
      result {
        id
        email
        firstName
        lastName
        fullName
      }
    }
  }
`;

const CREATE_BIRTHDAY = gql`
  mutation createBirthday(
    $firstName: String!
    $lastName: String!
    $nickname: String!
    $coverImage: ImageRequestType!
    $date: String!
    $extraImages: [ImageRequestType]
    $dateOfBirth: String
  ) {
    createBirthday(
      firstName: $firstName
      lastName: $lastName
      nickname: $nickname
      coverImage: $coverImage
      date: $date
      extraImages: $extraImages
      dateOfBirth: $dateOfBirth
    ) {
      birthday {
        celebrant {
          firstName
          lastName
          nickname
        }
      }
    }
  }
`;

const GET_BIRTHDAYS = gql`
  query getBirthdays {
    allBirthdays {
      id
      celebrant {
        dateOfBirth
        firstName
        lastName
        nickname
      }
      date
      images {
        file
        isCover
        lastUpdated
      }
    }
  }
`;

export { SIGNUP, LOGIN, ME, CREATE_BIRTHDAY, GET_BIRTHDAYS };
