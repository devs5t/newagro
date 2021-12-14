import { Menu as MenuIcon } from "@mui/icons-material";
import Brightness3Icon from "@mui/icons-material/Brightness3";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import {
  AppBar as MuiAppBar,
  Box,
  Grid,
  Hidden,
  IconButton,
  Toolbar,
  Tooltip,
} from "@mui/material";
import { spacing } from "@mui/system";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { THEMES } from "src/constants";
import { ConnectWalletButton } from "src/features/App/ConnectWalletButton";
import useTheme from "src/hooks/useTheme";
import styled, { withTheme } from "styled-components";
import NavbarLanguagesDropdown from "./NavbarLanguagesDropdown";

const AppBar = styled(MuiAppBar)`
  background: ${(props) => props.theme.header.background};
  color: ${(props) => props.theme.header.color};
`;

const SpacingIconButton = styled(IconButton)(spacing);

const BrandIcon = styled(Box)`
  margin-right: ${(props) => props.theme.spacing(2)};
  color: ${(props) => props.theme.sidebar.header.brand.color};
  fill: ${(props) => props.theme.sidebar.header.brand.color};
  width: 32px;
  height: 32px;
  background-image: url("../../../favicon.png");
  background-size: contain;
`;

const Navbar = ({ onDrawerToggle }) => {
  const { t } = useTranslation();

  const { theme, setTheme } = useTheme();
  return (
    <React.Fragment>
      <AppBar position="sticky" elevation={0}>
        <Toolbar>
          <Grid container alignItems="center">
            <Hidden mdUp>
              <Grid item>
                <IconButton
                  color="inherit"
                  aria-label="Open drawer"
                  onClick={onDrawerToggle}
                  size="large"
                >
                  <MenuIcon />
                </IconButton>
              </Grid>
            </Hidden>
            <Grid item xs />
            <Grid item>
              <NavbarLanguagesDropdown />
              <Tooltip title={"Toggle theme"}>
                <SpacingIconButton
                  color="inherit"
                  onClick={() =>
                    setTheme(
                      theme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT
                    )
                  }
                  size="large"
                >
                  {theme === THEMES.LIGHT ? (
                    <Brightness3Icon size="large" />
                  ) : (
                    <WbSunnyIcon size="large" />
                  )}
                </SpacingIconButton>
              </Tooltip>
              <ConnectWalletButton />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default withTheme(Navbar);
