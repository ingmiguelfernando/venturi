import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAppContext } from "../context";
import { SearchAppBar } from "../components/SearchAppBar";

const home = () => {
  const { user } = useAppContext();

  if (!user) return null;

  return (
    <>
      <SearchAppBar />
      <div>this is home</div>
    </>
  );
};

export default home;
