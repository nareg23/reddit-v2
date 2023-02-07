import { useRouter } from "next/router";
import React from "react";
import Avatar from "../../components/Avatar";
import Feed from "../../components/Feed";
import PostWindow from "../../components/PostWindow";

const Subreddit = () => {
  const {
    query: { topic },
  } = useRouter();
  return (
    <div className={`h-24 bg-red-400 p-8`}>
      <div className="-mx-8 mt-10 bg-white">
        <div className="flex mx-auto pb-3 space-x-4 items-center max-w-5xl">
          <div className="-mt-5">
            <Avatar seed={topic as string} large />
          </div>
          <div className="py-2">
            <h1 className="text-3xl font-semibold">
              Welcome to the r/{topic} subreddit
            </h1>
            <p className="text-sm text-gray-400">r/{topic}</p>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-5xl mt-5 pb-10">
        <PostWindow subreddit={topic as string} />
        <Feed topic={topic as string} />
      </div>
    </div>
  );
};

export default Subreddit;
