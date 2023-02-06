import { gql } from "@apollo/client";

export type SubredditByTopicTypes = {
  getSubredditListByTopic: [
    {
      id: string;
      created_at: string;
      topic: string;
    }
  ];
};

const GET_SUBREDDIT_BY_TOPIC = gql`
  query getSubredditByTopic($topic: String!) {
    getSubredditListByTopic(topic: $topic) {
      id
      created_at
      topic
    }
  }
`;

export default GET_SUBREDDIT_BY_TOPIC;
