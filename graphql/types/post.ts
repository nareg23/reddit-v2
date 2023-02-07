import Comment from "./comment";
import Subreddit from "./subreddit";
import Vote from "./vote";

type Post = {
  id: string;
  title: string;
  subreddit_id: string;
  username: string;
  created_at: string;
  image: string;
  comments: [Comment];
  votes: [Vote];
  subreddit: [Subreddit];
};

export default Post;
