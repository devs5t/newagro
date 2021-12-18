import { CssBaseline, Paper as MuiPaper } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { spacing } from "@mui/system";
import { useState } from "react";
import { useLocation } from "react-router";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import GlobalStyle from "../../components/GlobalStyle";
import Navbar from "../../components/navbar/Navbar";
import Settings from "src/components/Settings";

const Root = styled.div`
  display: flex;
  min-height: 100vh;
`;

const AppContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  max-width: 100%;
`;

const Paper = styled(MuiPaper)(spacing);

const MainContent = styled(Paper)`
  background: ${(props) =>
    `url("../images/backgrounds/beach-${
      props.theme.name === "DARK" ? "night" : "day"
    }.png");`};
  background-size: 1024px;
  background-repeat: repeat-x;
  flex: 1;

  background: ${(props) =>
    !props.$useBackground && props.theme.palette.background.default};

  @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
    flex: none;
  }

  .MuiPaper-root .MuiPaper-root {
    box-shadow: none;
  }
`;

const Layout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const theme = useTheme();
  const isLgUp = useMediaQuery(theme.breakpoints.up("lg"));
  const location = useLocation();

  const useBackground = (path) => {
    if (!path) return false;

    if (
      path.includes("vaults") ||
      path.includes("beach") ||
      path.includes("farms")
    ) {
      return true;
    }
    return false;
  };

  return (
    <Root>
      <CssBaseline />
      <GlobalStyle />
      <AppContent>
        <Navbar onDrawerToggle={handleDrawerToggle} />
        <MainContent
          p={isLgUp ? 12 : 5}
          $useBackground={useBackground(location.pathname)}
        >
          {children}
          <Outlet />
        </MainContent>
      </AppContent>
      <Settings />
    </Root>
  );
};

export default Layout;
