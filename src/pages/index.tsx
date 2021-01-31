import Head from "next/head";
import { Login } from "../components/Login";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Venturi</title>
        <link rel="icon" href="/venturi_logo.svg" />
      </Head>
      <main className="h-screen bg-gradient-to-r from-black to-gray-500">
        <div className="bg-airplane bg-cover bg-right h-full bg-no-repeat "></div>
        <div
          id="logo"
          className="bg-venturi-logo bg-contain bg-no-repeat w-60 h-32 inset-16 sm:inset-36 absolute"
        ></div>
        <div className="absolute top-36 w-full sm:top-60 sm:right-48 sm:w-96 ">
          {<Login />}
        </div>
      </main>
    </div>
  );
}
