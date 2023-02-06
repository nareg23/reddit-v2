import { useQuery } from "@apollo/client";
import React from "react";
import GET_ALL_POSTS, { allPostTypes } from "../graphql/queries/getAllposts";
import Post from "./Post";

const Feed = () => {
  const { data, error, loading } = useQuery<allPostTypes>(GET_ALL_POSTS);
  const posts = data?.postList;

  return (
    <div className="mx-auto mt-5 space-y-4">
      {posts?.map((post) => {
        return <Post key={post.id} post={post} />;
      })}
    </div>
  );
};

export default Feed;
