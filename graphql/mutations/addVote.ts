import { gql } from "@apollo/client";

const INSERT_VOTE = gql`
  mutation insertVote($postId: ID!, $upvote: Boolean!, $username: String!) {
    insertVote(post_id: $postId, upvote: $upvote, username: $username) {
      id
      upvote
      username
      post_id
    }
  }
`;

export default INSERT_VOTE;
