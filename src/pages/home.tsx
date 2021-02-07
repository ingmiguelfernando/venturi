import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAppContext } from "../context";

const home = () => {
  const router = useRouter();
  const { user } = useAppContext();

  return user ? <div>this is home</div> : <div>loading</div>;
};

export default home;
