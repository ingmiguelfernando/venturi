import { useAppContext } from "../context";
import { SearchAppBar } from "../components/SearchAppBar";
import styled from "styled-components";

const BackgroundImage = styled.div`
  background: url(/airplane-background.png) center center no-repeat;
  background-position: right -1000px bottom 0px;
  background-size: auto 100%;
  background-color: black;
  filter: sepia(200%) hue-rotate(199deg) saturate(209%);
`;

const home = () => {
  const { user } = useAppContext();

  if (!user) return null;

  return (
    <div className="bg-black">
      <SearchAppBar />
      <BackgroundImage className="h-screen w-screen overflow-hidden z-0">
        <div className="text-white">this is home</div>
      </BackgroundImage>
    </div>
  );
};

export default home;
