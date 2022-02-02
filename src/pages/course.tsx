import React from "react";
import { Courses } from "../components/Courses";
import { SearchAppBar } from "../components/SearchAppBar";
import Head from "next/head";
import Container from "@mui/material/Container";

import { useRouter } from "next/router";

const course = () => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <>
      <SearchAppBar />
      <div className="bg-black relative h-screen">
        <Head>
          <title>Venturi</title>
          <link rel="icon" href="/venturi_logo.svg" />
        </Head>
        <Container className="flex w-11/12">
          <Courses courseId={id?.toString()} />
        </Container>
      </div>
    </>
  );
};

export default course;
