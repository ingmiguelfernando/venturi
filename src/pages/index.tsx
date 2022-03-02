import Head from "next/head";
import Image from "next/image";
import React from "react";
import Box from '@mui/material/Box';
import SignIn from "../components/SignIn";
import Grid from '@mui/material/Grid'

export default function Index() {

  return (
    <Grid
      container
      spacing={0}
      direction="row"
      justifyContent="flex-start"
      alignItems="flex-start"
      alignContent="stretch"
      height="100vh"
      wrap="wrap"
      style={{
        backgroundImage: `url('/airplane-background.png')`,
        backgroundSize: 'cover', backgroundPosition: 'left', backgroundRepeat: 'no-repeat'
      }}>
      <Head>
        <title>Venturi</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Grid item xs={0} sm={6}>
        <Box sx={{ p: 2 }}>
          <Image src="/venturi_logo.png" alt="me" width={320} height={70} />
        </Box>
      </Grid>
      <Grid item xs={12} sm={6}>
        <SignIn />
      </Grid>
    </Grid>
  );
}
