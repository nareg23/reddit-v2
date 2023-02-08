import { gql } from "@apollo/client";
import POST_FRAGMENT from "../fragments/postFrag";

const GET_POST_BY_ID = gql`
  query getPostById($id: ID!) {
    getPostById(id: $id) {
      ...PostFrag
    }
  }
  ${POST_FRAGMENT}
`;

export default GET_POST_BY_ID;
