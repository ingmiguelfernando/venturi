import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Login } from "../components/organisms/Login";
export default function Home() {
  return (
    <div>
      <Head>
        <title>Venturi</title>
        <link rel="icon" href="/venturi_logo.svg" />
      </Head>
      <main className="bg-black">
        <div
          id="background"
          className="bg-airplane bg-cover h-screen bg-center bg-no-repeat w-3/4"
        >
          <div
            id="logo"
            className="bg-venturi-logo bg-contain bg-no-repeat w-60 h-32 inset-36 absolute"
          ></div>
          <Login />
        </div>
      </main>
    </div>
  );
}
