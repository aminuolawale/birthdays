import { gql } from "@apollo/client";

const CREATE_BIRTHDAY = gql`
  mutation createBirthday(
    $celebrant: String!
    $coverImage: ImageRequestType!
    $date: String!
  ) {
    createBirthday(
      celebrant: $celebrant
      coverImage: $coverImage
      date: $date
    ) {
      birthday {
        celebrant
      }
    }
  }
`;

const GET_BIRTHDAYS = gql`
  query getBirthdays {
    allBirthdays {
      id
      celebrant
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
