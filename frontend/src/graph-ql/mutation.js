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

export { CREATE_BIRTHDAY };
