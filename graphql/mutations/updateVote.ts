import { gql } from "@apollo/client";

const UPDATE_VOTE = gql`
  mutation updateVote($id: ID!, $upvote: Boolean!) {
    updateVote(id: $id, upvote: $upvote) {
      upvote
      id
      username
    }
  }
`;

export default UPDATE_VOTE;
