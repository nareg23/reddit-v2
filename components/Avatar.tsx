import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";

type Props = {
  seed?: string;
  large?: true;
};

const Avatar = ({ seed, large }: Props) => {
  const { data: session } = useSession();
  return (
    <div
      className={`relative h-10 w-10 rounded-full border border-gray-50 bg-white overflow-hidden${
        large && "h-20 w-20"
      }`}
    >
      <Image
        src={`https://api.dicebear.com/5.x/adventurer/svg?seed=${
          session?.user?.name || "placeholder"
        }.svg`}
        alt={"Avatar"}
        fill
        style={{ objectFit: "fill" }}
      />
    </div>
  );
};

export default Avatar;
