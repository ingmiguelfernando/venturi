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
          className="bg-venturi-logo bg-contain bg-no-repeat w-60 h-32 inset-44 absolute"
        ></div>
        <div className="absolute top-60 right-80 w-60">{<Login />}</div>
      </main>
    </div>
  );
}
