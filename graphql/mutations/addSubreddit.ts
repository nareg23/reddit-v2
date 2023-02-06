import { gql } from "@apollo/client";

export type InsertSubredditTypes = {
  insertSubreddit: {
    id: string;
    topic: string;
  };
};

const INSERT_SUBREDDIT = gql`
  mutation insertSubreddit($topic: String!) {
    insertSubreddit(topic: $topic) {
      id
      topic
    }
  }
`;

export default INSERT_SUBREDDIT;
