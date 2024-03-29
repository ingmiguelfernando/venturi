import React from "react";
import type { AppProps } from "next/app";
import "../styles/globals.css";
import { ThemeProvider, Theme, StyledEngineProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { AppContextProvider } from "../context";
import theme from "../theme";
import { Notification } from "../components/Notification";

import Head from "next/head";
import Container from "@mui/material/Container";
import { SearchAppBar } from "../components/SearchAppBar";

declare module "@mui/styles/defaultTheme" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

export default function MyApp({ Component, pageProps }: AppProps) {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles && jssStyles.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <AppContextProvider>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <SearchAppBar />
          <div className="bg-black relative h-screen">
            <Head>
              <title>Venturi</title>
              <link rel="icon" href="/venturi_logo.svg" />
            </Head>
            <Container className="flex w-11/12">
              <Component {...pageProps}></Component>
            </Container>
          </div>
          <Notification />
        </ThemeProvider>
      </StyledEngineProvider>
    </AppContextProvider>
  );
}
