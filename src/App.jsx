import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { StyledEngineProvider } from "@mui/styled-engine-sc";
import jssPreset from "@mui/styles/jssPreset";
import StylesProvider from "@mui/styles/StylesProvider";
import { shortenAddress } from "@usedapp/core";
import { create } from "jss";
import { useSnackbar } from "notistack";
import React, { useEffect } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useLocation } from "react-router";
import { useNavigate, useRoutes } from "react-router-dom";
import { useLocalStorage } from "react-use";
import { ThemeProvider } from "styled-components";
import useTheme from "./hooks/useTheme";
import "./i18n";
import routes from "./routes";
import createTheme from "./theme";
import Layout from "src/features/layouts/Layout";
import "./index.css";
import { ModalProvider } from "src/contexts/ModalContext";
import Modal from "src/components/Modal";
import {PriceContextProvider} from "src/contexts/PriceContext";
import {NmilkContextProvider} from "src/contexts/NmilkContext";
import {NlandContextProvider} from "src/contexts/NlandContext";
import {NbeefContextProvider} from "src/contexts/NbeefContext";
import { GoogleApiProvider } from "react-gapi";
import {SplashScreen} from '@capacitor/splash-screen';

const jss = create({
  ...jssPreset(),
  insertionPoint: document.getElementById("jss-insertion-point"),
});

function App() {
  const content = useRoutes(routes);
  const { theme } = useTheme();
  const location = useLocation();
  const [referrerId, setReferrerId] = useLocalStorage("referrerId", null);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const envGoogleDriveApiKey = import.meta.env.VITE_APP_GOOGLE_DRIVE_API_KEY;

  setTimeout(() => {
    SplashScreen.hide();
  }, 2000);


  useEffect(() => {
    const { pathname, search } = location;
    if (pathname === "/" || pathname === "/home") {
      const refId = new URLSearchParams(search).get("r");
      if (refId) {
        setReferrerId(refId);
        const abbr = shortenAddress(refId);
        enqueueSnackbar(`Your referrer is: ${abbr}`, {
          variant: "success",
        });
      }
    }
  }, [location, referrerId, setReferrerId]);

  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/home", { replace: true });
    }
  }, [location]);

  return (
    <HelmetProvider>
      <Helmet defer={false}>
        <title>New Agro</title>
      </Helmet>
      <StylesProvider jss={jss}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <StyledEngineProvider injectFirst>
            <MuiThemeProvider theme={createTheme(theme)}>
              <ThemeProvider theme={createTheme(theme)}>
                <PriceContextProvider>
                  <NmilkContextProvider>
                    <NlandContextProvider>
                      <NbeefContextProvider>
                        <ModalProvider>
                          <GoogleApiProvider clientId={envGoogleDriveApiKey}>
                            <Layout>{content}</Layout>
                          </GoogleApiProvider>
                          <Modal />
                        </ModalProvider>
                      </NbeefContextProvider>
                    </NlandContextProvider>
                  </NmilkContextProvider>
                </PriceContextProvider>
              </ThemeProvider>
            </MuiThemeProvider>
          </StyledEngineProvider>
        </LocalizationProvider>
      </StylesProvider>
    </HelmetProvider>
  );
}

export default App;