import { ChevronUpIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Avatar from "./Avatar";

type Props = {
  topic: string;
  index: number;
};

const SubredditRow = ({ topic, index }: Props) => {
  return (
    <div
      className="flex items-center bg-white
   space-x-2 border-t px-4 py-2 last:rounded-b"
    >
      <ChevronUpIcon className="h-4 w-4 shrink-0 text-green-400" />
      <Avatar seed={`subreddit/${topic}`} />
      <p className="flex-1 truncate">{topic}</p>
      <Link href={`/subreddit/${topic}`}>
        <div className="cursor-pointer rounded-full bg-blue-500 px-3 text-white">
          view
        </div>
      </Link>
    </div>
  );
};

export default SubredditRow;
