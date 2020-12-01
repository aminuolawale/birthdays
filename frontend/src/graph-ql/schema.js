import { gql } from "@apollo/client";

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

export { CREATE_BIRTHDAY, GET_BIRTHDAYS };
