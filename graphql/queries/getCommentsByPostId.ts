import { gql } from "@apollo/client";

const GET_COMMENTS_BY_POST_ID = gql`
  query getCommentByPostId($postId: ID!) {
    getCommentByPostId(post_id: $postId) {
      id
      post_id
      text
      username
      created_at
    }
  }
`;

export default GET_COMMENTS_BY_POST_ID;
