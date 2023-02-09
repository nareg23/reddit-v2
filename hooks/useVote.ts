import { useMutation, useQuery } from "@apollo/client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import INSERT_VOTE from "../graphql/mutations/addVote";
import UPDATE_VOTE from "../graphql/mutations/updateVote";
import GET_VOTES_BY_POST_ID from "../graphql/queries/getVoteByPostId";
import Vote from "../graphql/types/vote";

type Update = { id: string; upvote: boolean };
type Insert = { postId: string; username: string; upvote: boolean };

const useVote = (postId: string) => {
  const [loading, setLoading] = useState(false);
  const [userVote, setUserVote] = useState<Vote>();
  const { data: session } = useSession();

  const { data, loading: apolloLoading } = useQuery(GET_VOTES_BY_POST_ID, {
    variables: {
      postId: postId,
    },
  });

  const votes: Vote[] = data?.getVotesByPostId;
  const voteCount = votes?.reduce(
    (acc, next) => (next.upvote ? (acc = +1) : (acc -= 1)),
    0
  );

  const [updateVoteMutation] = useMutation(UPDATE_VOTE, {
    refetchQueries: [
      {
        query: GET_VOTES_BY_POST_ID,
        variables: {
          postId,
        },
      },
      "getVotesByPostId",
    ],
  });

  const [insertVoteMutation] = useMutation(INSERT_VOTE, {
    refetchQueries: [
      {
        query: GET_VOTES_BY_POST_ID,
        variables: {
          postId,
        },
      },
      "getVotesByPostId",
    ],
  });

  useEffect(() => {
    const _userVote = votes?.find(
      (vote) => vote.username === session?.user?.name
    );
    setUserVote(_userVote);
  }, [data, session, votes?.length]);

  const updateVote = async ({ id, upvote }: Update) => {
    setLoading(true);
    await updateVoteMutation({
      variables: {
        id,
        upvote,
      },
    });
    setLoading(false);
  };

  const insertVote = async ({ postId, upvote, username }: Insert) => {
    setLoading(true);
    await insertVoteMutation({
      variables: {
        postId,
        upvote,
        username,
      },
    });
    setLoading(false);
    toast.success("Thank you for voting!");
  };

  const handleUpvote = async (isUpvote: boolean) => {
    if (!session) {
      toast("Sign in to vote!");
      return;
    }
    if (userVote?.upvote === isUpvote) return;

    //  update
    if (userVote) {
      setLoading(true);
      await updateVote({ id: userVote.id, upvote: isUpvote });
      setLoading(false);
      return;
    }

    //  fallback create
    await insertVote({
      postId,
      upvote: isUpvote,
      username: session?.user?.name as string,
    });
  };

  return {
    handleUpvote,
    loading,
    voteCount: voteCount,
    userVote,
  };
};

export default useVote;
