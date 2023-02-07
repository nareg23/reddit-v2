import { gql } from "@apollo/client";
import POST_FRAGMENT from "../fragments/postFrag";
import Post from "../types/post";

export type TopicPostsTypes = {
  getPostsByTopic: Post[];
};

const GET_POSTS_BY_TOPIC = gql`
  query getPostsByTopic($topic: String!) {
    getPostsByTopic(topic: $topic) {
      ...PostFrag
    }
  }
  ${POST_FRAGMENT}
`;

export default GET_POSTS_BY_TOPIC;
