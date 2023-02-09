import { gql } from "@apollo/client";

const GET_SUBREDDITS = gql`
  query getSubreddits($limit: Int = 10) {
    getSubReddits(limit: $limit) {
      id
      topic
      created_at
    }
  }
`;

export default GET_SUBREDDITS;
