import { useSession } from "next-auth/react";
import Avatar from "./Avatar";
import { LinkIcon, PhotoIcon } from "@heroicons/react/24/outline";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { INSERT_POST } from "../graphql/mutations/addPost";
import GET_SUBREDDIT_BY_TOPIC, {
  SubredditByTopicTypes,
} from "../graphql/queries/getSubredditByTopic";
import client from "../lib/apollo-client";
import INSERT_SUBREDDIT, {
  InsertSubredditTypes,
} from "../graphql/mutations/addSubreddit";
import toast from "react-hot-toast";

type FormData = {
  postTitle: string;
  postBody: string;
  postImage: string;
  subreddit: string;
};

const PostWindow = () => {
  const { data: session } = useSession();
  const [isImageBoxOpen, setIsImageBoxOpen] = useState(false);
  const [inserPost] = useMutation(INSERT_POST);
  const [insertSubreddit] = useMutation<InsertSubredditTypes>(INSERT_SUBREDDIT);

  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = handleSubmit(
    async ({ postBody, postImage, postTitle, subreddit }) => {
      let _subredditId = undefined;
      const notify = toast.loading("Creating a new post...");
      try {
        const {
          data: { getSubredditListByTopic },
        } = await client.query<SubredditByTopicTypes>({
          query: GET_SUBREDDIT_BY_TOPIC,
          variables: {
            topic: subreddit,
          },
        });

        //  subreddit check
        const subredditExists = getSubredditListByTopic.length;

        // create if doesnt exist
        if (!subredditExists) {
          console.log("creating a new subreddit.");
          const { data } = await insertSubreddit({
            variables: {
              topic: subreddit,
            },
          });
          _subredditId = data?.insertSubreddit.id;
        } else {
          console.log("Subreddit already exists");
          _subredditId = getSubredditListByTopic[0]?.id;
        }

        if (_subredditId === "undefined")
          throw new Error("Unable to find the ID.");

        await inserPost({
          variables: {
            title: postTitle,
            image: postImage || "",
            body: postBody,
            subreddit: _subredditId,
            username: session?.user?.name,
          },
        });

        // after post
        setValue("postBody", "");
        setValue("postImage", "");
        setValue("postTitle", "");
        setValue("subreddit", "");

        // toast
        toast.success("Post created!", {
          id: notify,
        });
      } catch (error: any) {
        console.log(error.message);

        // toast
        toast.error("Oops something went wrong, please try again later.", {
          id: notify,
        });
      }
    }
  );
  return (
    <form
      autoComplete="off"
      onSubmit={onSubmit}
      className="sticky bg-white rounded-md top-16 p-2 border border-gray-300"
    >
      <div className="flex items-center space-x-3">
        <Avatar />
        <input
          {...register("postTitle", { required: true })}
          className="flex-1 bg-gray-50 p-2 pl-5 outline-none rounded-md"
          disabled={!session}
          type="text"
          placeholder={session ? "Create a post!" : "Sign in to post"}
        />
        <PhotoIcon
          onClick={() => setIsImageBoxOpen(!isImageBoxOpen)}
          className={`h-6 text-gray-300 cursor-pointer ${
            isImageBoxOpen && "text-blue-300"
          }`}
        />
        <LinkIcon className={`h-6 text-gray-300 cursor-pointer`} />
      </div>
      {watch("postTitle") && (
        <div className="flex flex-col py-2">
          <div className="flex items-center px-2">
            <p className="min-w-[90px]">Body:</p>
            <input
              {...register("postBody")}
              className={"m-2 flex-1 bg-blue-50 p-2 outline-none"}
              type="text"
              placeholder="Text (optional)"
            />
          </div>

          <div className="flex items-center px-2">
            <p className="min-w-[90px]">Subreddit:</p>
            <input
              {...register("subreddit", { required: true })}
              className={"m-2 flex-1 bg-blue-50 p-2 outline-none"}
              type="text"
              placeholder="i.e mildlyinteresting"
            />
          </div>

          {isImageBoxOpen && (
            <div className="flex items-center px-2">
              <p className="min-w-[90px]">Image URL:</p>
              <input
                {...register("postImage")}
                className={"m-2 flex-1 bg-blue-50 p-2 outline-none"}
                type="text"
                placeholder="optional"
              />
            </div>
          )}
          {/* Errors */}
          {Object.keys(errors).length > 0 && (
            <div className="space-y-2 p-2 text-red-500">
              {errors.subreddit?.type === "required" && (
                <p>- A subreddit Title is required</p>
              )}
              {errors.postTitle?.type === "required" && (
                <p>- A Post Title is required</p>
              )}
            </div>
          )}
          {watch("postTitle") && (
            <button
              type="submit"
              className="w-full rounded-full bg-blue-400 p-2 text-white hover:bg-blue-700"
            >
              Create Post
            </button>
          )}
        </div>
      )}
    </form>
  );
};

export default PostWindow;
