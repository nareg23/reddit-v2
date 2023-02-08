import React, { useEffect, useState } from "react";
import PostTypes from "../graphql/types/post";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  BookmarkIcon,
  ChatBubbleLeftEllipsisIcon,
  GiftIcon,
  ShareIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/outline";
import Avatar from "./Avatar";
import TimeAgo from "react-timeago";
import Link from "next/link";
import { useQuery } from "@apollo/client";
import GET_VOTES_BY_POST_ID from "../graphql/queries/getVoteByPostId";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";

type Props = {
  post: PostTypes;
};

const Post = ({ post }: Props) => {
  const [isClient, setIsClient] = useState(false);
  const [vote, setVote] = useState<boolean>();
  const { data: session } = useSession();

  const { data } = useQuery(GET_VOTES_BY_POST_ID, {
    variables: {
      postId: post.id,
    },
  });

  const upvote = async (upvote) => {
    if (!session) {
      toast("Sign in to vote!");
      return;
    }
  };

  useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    <Link className="block" href={`/post/${post?.id}`}>
      <div className="flex cursor-pointer rounded-md border  border-gray-300 bg-white shadow-sm hover:border-gray-600">
        {/* votes */}
        <div className="flex flex-col items-center justify-start space-y-1 rounded-l-md bg-gray-50 p-4 text-gray-400">
          <ArrowUpIcon
            onClick={() => {
              upvote(true);
            }}
            className="voteButtons hover:text-blue-400"
          />
          <p className="text-black font-bold text-xs">0</p>
          <ArrowDownIcon
            onClick={() => {
              upvote(false);
            }}
            className="voteButtons hover:text-red-400"
          />
        </div>
        {/* End Votes */}
        <div className="p-3 pb-1">
          {/* header */}
          <div className="flex items-center space-x-2">
            <Avatar seed={post?.subreddit[0]?.topic} />
            <p className="text-xs text-gray-400">
              {isClient && (
                <Link href={`/subreddit/${post?.subreddit[0]?.topic}`}>
                  <span className="font-bold text-black  hover:text-blue-400">
                    r/{post?.subreddit[0]?.topic}
                  </span>
                </Link>
              )}{" "}
              . Posted by u/{post.username} <TimeAgo date={post.created_at} />
            </p>
          </div>
          {/* body */}
          <div className="py-4">
            <h2
              className="text-xl font-semibold
            "
            >
              {post?.title}
            </h2>
            <p className="mt-2 text-sm font-light"></p>
          </div>
          {/* img */}
          {post.image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img className="w-full" src={post.image} alt={post.title} />
          )}
          {/* footer */}
          <div className="flex space-x-4 text-gray-400">
            <div className="postButtons">
              <ChatBubbleLeftEllipsisIcon className="h-6 w-6" />
              <p className="">{post.comments.length} Comments</p>
            </div>
            <div className="postButtons">
              <GiftIcon className="h-6 w-6" />
              <p className="hidden sm:inline">Award</p>
            </div>
            <div className="postButtons">
              <ShareIcon className="h-6 w-6" />
              <p className="hidden sm:inline">Share</p>
            </div>
            <div className="postButtons">
              <BookmarkIcon className="h-6 w-6" />
              <p className="hidden sm:inline">Save</p>
            </div>
            <div className="postButtons">
              <EllipsisHorizontalIcon className="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Post;
