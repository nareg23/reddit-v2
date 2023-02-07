import { gql } from "@apollo/client";

const POST_FRAGMENT = gql`
  fragment PostFrag on post {
    id
    body
    created_at
    image
    subreddit_id
    title
    username
    subreddit {
      id
      created_at
      topic
    }
    comments {
      id
      post_id
      created_at
      text
      username
    }
    votes {
      id
      post_id
      created_at
      upvote
      username
    }
  }
`;

export default POST_FRAGMENT;
