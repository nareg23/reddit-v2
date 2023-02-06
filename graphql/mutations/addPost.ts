import { gql } from "@apollo/client";

export const INSERT_POST = gql`
  mutation addPost(
    $title: String!
    $image: String
    $body: String
    $subreddit: ID!
    $username: String!
  ) {
    insertPost(
      subreddit_id: $subreddit
      image: $image
      body: $body
      title: $title
      username: $username
    ) {
      id
      title
      body
      image
      subreddit_id
      username
      created_at
    }
  }
`;
