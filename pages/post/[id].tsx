import { useMutation, useQuery } from "@apollo/client";
import { GetStaticPaths, GetStaticProps } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import Avatar from "../../components/Avatar";
import Post from "../../components/Post";
import INSERT_COMMENT from "../../graphql/mutations/addComment";
import GET_COMMENTS_BY_POST_ID from "../../graphql/queries/getCommentsByPostId";
import GET_POST_BY_ID from "../../graphql/queries/getPostById";
import PostType from "../../graphql/types/post";
import apolloClient from "../../lib/apollo-client";
import TimeAgo from "react-timeago";
import dynamic from "next/dynamic";
import Comment from "../../graphql/types/comment";
import { Pulsar } from "@uiball/loaders";

type FormData = {
  comment: string;
};

const PostPage = () => {
  const DynamicTimeAgo = dynamic(() => import("react-timeago"));
  const { query } = useRouter();
  const { data: session } = useSession();

  const { data: postData } = useQuery(GET_POST_BY_ID, {
    variables: {
      id: query?.id,
    },
  });

  const post = postData?.getPostById;

  const { data, loading } = useQuery(GET_COMMENTS_BY_POST_ID, {
    variables: {
      postId: query?.id,
    },
  });
  const comments: Comment[] = data?.getCommentByPostId;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();
  const [insertComment] = useMutation(INSERT_COMMENT, {
    refetchQueries: [
      { query: GET_COMMENTS_BY_POST_ID },
      "getCommentByPostId",
      { query: GET_POST_BY_ID },
      "getPostById",
    ],
  });

  const onSubmit: SubmitHandler<FormData> = async ({ comment }) => {
    const notify = toast.loading("Posting your comment...");

    if (!session) {
      toast("Please sign in to comment");
      return;
    }
    await insertComment({
      variables: {
        postId: post?.id,
        text: comment,
        username: session?.user?.name,
      },
    });
    setValue("comment", "");
    toast.success("Comment created!", {
      id: notify,
    });
  };

  return (
    <div className="mx-auto my-7 max-w-5xl">
      <Post post={post} />
      <div
        className="rounded-b-md border border-t-0 border-gray-300 bg-white
       p-5 px-16 -mt-1 "
      >
        <p className="text-sm">
          Comment as <span className="text-red-500">{session?.user?.name}</span>
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex max-w-5xl flex-col space-y-2"
        >
          <textarea
            {...register("comment", { required: true })}
            disabled={!session}
            className="h-24 rounded-md border border-gray-200 p-2 pl-4 outline-none disabled:bg-gray-50"
            placeholder={
              session ? "What are you thoughts?" : "Please sign in to comment"
            }
          ></textarea>
          <button
            disabled={!session}
            className="rounded-full p-3 bg-red-500 font-semibold text-white disabled:bg-gray-200"
            type="submit"
          >
            Comment
          </button>
        </form>
      </div>
      {/* comments */}
      <div
        className="-my-5 rounded-b-md border border-t-0 border-gray-300 bg-white py-5 px-10
      "
      >
        <hr className="py-2" />

        {loading ? (
          <div className="flex justify-center mt-20">
            <Pulsar size={70} speed={1.75} color="rgb(250 69 2)" />
          </div>
        ) : (
          comments?.map((comment) => (
            <div
              className="relative flex items-center space-x-2 space-y-5"
              key={comment?.id}
            >
              <hr className="absolute top-10 h-16 border z-0 left-7" />
              <div className="z-50">
                <Avatar seed={comment.username} />
              </div>
              <div className="flex flex-col">
                <p className="py-2 text-xs text-gray-400">
                  <span className=" font-semibold text-gray-600">
                    {comment.username}{" "}
                  </span>
                  <DynamicTimeAgo date={comment.created_at} />
                </p>
                <p>{comment.text}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PostPage;
