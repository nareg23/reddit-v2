import Head from "next/head";
import Image from "next/image";
import Header from "../components/Header";
import PostWindow from "../components/PostWindow";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className="my-7 max-w-5xl mx-auto">
      <Head>
        <title>Reddit-clone</title>
      </Head>
      {/* POST WINDOW */}
      <PostWindow />
    </div>
  );
}
