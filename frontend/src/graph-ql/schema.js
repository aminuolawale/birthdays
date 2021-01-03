import { gql } from "@apollo/client";

export const SIGNUP = gql`
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

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    tokenAuth(email: $email, password: $password) {
      token
      ok
      result {
        id
        fullName
        email
        avatar
        verified
      }
    }
  }
`;

export const VERIFY_USER = gql`
  mutation verifyUser($token: String!) {
    verifyUser(token: $token) {
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

export const RESEND_VERIFICATION = gql`
  mutation resendVerification {
    resendVerification {
      ok
      errors {
        message
      }
    }
  }
`;
export const AUTH_USER = gql`
  query authUser {
    authUser @client {
      loggedIn
      userThumb
      verified
    }
  }
`;

export const ME = gql`
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

export const CREATE_BIRTHDAY = gql`
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

export const GET_BIRTHDAYS = gql`
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
