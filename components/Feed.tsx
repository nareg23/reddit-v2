import { useQuery } from "@apollo/client";
import React from "react";
import GET_ALL_POSTS, { AllPostTypes } from "../graphql/queries/getAllposts";
import GET_POSTS_BY_TOPIC, {
  TopicPostsTypes,
} from "../graphql/queries/getPostsbyTopic";
import Post from "./Post";
import PostTypes from "../graphql/types/post";
import { Pulsar } from "@uiball/loaders";

type Props = {
  topic?: string;
};

const Feed = ({ topic }: Props) => {
  const { data, loading } = useQuery(
    !topic ? GET_ALL_POSTS : GET_POSTS_BY_TOPIC,
    {
      variables: {
        topic,
      },
    }
  );

  const posts: PostTypes[] = topic ? data?.getPostsByTopic : data?.postList;
  return (
    <div className="mx-auto lg:min-w-full mt-5 space-y-4">
      {loading && (
        <div className="flex justify-center mt-20">
          <Pulsar size={70} speed={1.75} color="rgb(250 69 2)" />
        </div>
      )}
      {posts?.map((post) => {
        return <Post key={post.id} post={post} />;
      })}
    </div>
  );
};

export default Feed;
