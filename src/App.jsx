import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { StyledEngineProvider } from "@mui/styled-engine-sc";
import jssPreset from "@mui/styles/jssPreset";
import StylesProvider from "@mui/styles/StylesProvider";
import { shortenAddress, useEthers } from "@usedapp/core";
import { create } from "jss";
import { useSnackbar } from "notistack";
import { useEffect } from "react";
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

const jss = create({
  ...jssPreset(),
  insertionPoint: document.getElementById("jss-insertion-point"),
});

function App() {
  const content = useRoutes(routes);
  const { theme } = useTheme();
  const location = useLocation();
  const { account } = useEthers();
  const [referrerId, setReferrerId] = useLocalStorage("referrerId", null);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const navigate = useNavigate();

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
      <Helmet titleTemplate="New Agro" defaultTitle="New Agro" />
      <StylesProvider jss={jss}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <StyledEngineProvider injectFirst>
            <MuiThemeProvider theme={createTheme(theme)}>
              <ThemeProvider theme={createTheme(theme)}>
                <Layout>{content}</Layout>
              </ThemeProvider>
            </MuiThemeProvider>
          </StyledEngineProvider>
        </LocalizationProvider>
      </StylesProvider>
    </HelmetProvider>
  );
}

export default App;
