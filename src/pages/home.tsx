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

const Title = styled.div`
  font-weight: 700;
  background: -webkit-linear-gradient(#ffffff, #d3d1d1, #464545);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const SubTitle = styled.div`
  font-weight: 800;
  background: -webkit-linear-gradient(#ffffff, #d3d1d1, #464545);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const home = () => {
  const { user } = useAppContext();

  if (!user) return null;

  return (
    <div className="bg-black relative">
      <SearchAppBar />
      <BackgroundImage className="h-screen w-screen overflow-hidden z-0" />
      <Title className="text-white absolute top-20 left-9 sm:top-60 sm:left-16 text-7xl sm:text-9xl">
        Welcome
      </Title>
      <SubTitle className="text-white absolute top-40 sm:top-96 left-9 sm:left-16 text-3xl sm:text-4xl">
        To the next generation of training.
      </SubTitle>
    </div>
  );
};

export default home;
