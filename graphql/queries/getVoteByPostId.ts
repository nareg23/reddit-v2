import { gql } from "@apollo/client";

const GET_VOTES_BY_POST_ID = gql`
  query getVotesByPostId($postId: ID!) {
    getVotesByPostId(post_id: $postId) {
      upvote
      id
      username
    }
  }
`;

export default GET_VOTES_BY_POST_ID;
