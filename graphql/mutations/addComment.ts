import { gql } from "@apollo/client";

const INSERT_COMMENT = gql`
  mutation insertComment($postId: ID!, $text: String!, $username: String!) {
    insertComment(post_id: $postId, text: $text, username: $username) {
      id
      text
      post_id
      username
    }
  }
`;

export default INSERT_COMMENT;
