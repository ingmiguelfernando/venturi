import Head from "next/head";
import theme from "../theme";
import * as React from "react";
import "../styles/globals.css";
import PropTypes from "prop-types";
import { store } from "../app/store";
import { Provider } from "react-redux";
import firebase from "../firebase/clientApp";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { Notification } from "../components/Notification";
import { CacheProvider, EmotionCache } from "@emotion/react";
import createEmotionCache from "../theme/createEmotionCache";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();
firebase;
export default function MyApp(props: { Component: any; emotionCache?: EmotionCache | undefined; pageProps: any; }) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Provider store={store}>
          <Component {...pageProps} />
          <Notification />
        </Provider>
      </ThemeProvider>
    </CacheProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
