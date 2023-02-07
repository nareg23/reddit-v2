import { useQuery } from "@apollo/client";
import React from "react";
import GET_ALL_POSTS, { AllPostTypes } from "../graphql/queries/getAllposts";
import GET_POSTS_BY_TOPIC, {
  TopicPostsTypes,
} from "../graphql/queries/getPostsbyTopic";
import Post from "./Post";
import PostTypes from "../graphql/types/post";

type Props = {
  topic?: string;
};

const Feed = ({ topic }: Props) => {
  const { data, error } = useQuery(
    !topic ? GET_ALL_POSTS : GET_POSTS_BY_TOPIC,
    {
      variables: {
        topic,
      },
    }
  );

  console.log("posts", data);
  const posts: PostTypes[] = topic ? data?.getPostsByTopic : data?.postList;
  return (
    <div className="mx-auto mt-5 space-y-4">
      {posts?.map((post) => {
        return <Post key={post.id} post={post} />;
      })}
    </div>
  );
};

export default Feed;
