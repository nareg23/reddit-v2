import { useQuery } from "@apollo/client";
import Head from "next/head";
import Feed from "../components/Feed";
import GET_SUBREDDITS from "../graphql/queries/getSubreddits";
import Subreddit from "../graphql/types/subreddit";
import PostWindow from "../components/PostWindow";
import SubredditRow from "../components/SubredditRow";

export default function Home() {
  const { data, loading } = useQuery(GET_SUBREDDITS);

  const subreddits: Subreddit[] = data?.getSubReddits;
  return (
    <div className="my-7 max-w-5xl mx-auto">
      <Head>
        <title>Reddit-clone</title>
      </Head>
      {/* POST WINDOW */}
      <PostWindow />
      {/* Feed */}
      <div className="flex">
        <Feed />
        <div className="sticky top-36 mx-5 mt-5 hidden h-fit min-w-[300px] rounded-md border border-gray-300 bg-white lg:inline ">
          <p className=" text-md mb-1 p-4 pb-3 font-bold">Top Communities</p>
          <div>
            {subreddits?.map((subreddit, i) => (
              <SubredditRow
                key={subreddit.id}
                topic={subreddit.topic}
                index={i}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
