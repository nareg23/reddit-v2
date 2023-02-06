import { gql } from "@apollo/client";
import Post from "./types/post";

export type allPostTypes = {
  postList: Post[];
};

const GET_ALL_POSTS = gql`
  query getAllPosts {
    postList {
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
  }
`;

export default GET_ALL_POSTS;
