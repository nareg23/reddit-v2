import { gql } from "@apollo/client";
import Post from "../types/post";
import POST_FRAGMENT from "../fragments/postFrag";

export type AllPostTypes = {
  postList: Post[];
};

const GET_ALL_POSTS = gql`
  query getAllPosts {
    postList {
      ...PostFrag
    }
  }
  ${POST_FRAGMENT}
`;

export default GET_ALL_POSTS;
