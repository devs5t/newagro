import {
  Box as MuiBox,
  Drawer as MuiDrawer,
  ListItemButton,
} from "@mui/material";
import { spacing } from "@mui/system";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import Footer from "./SidebarFooter";
import SidebarNav from "./SidebarNav";

const Box = styled(MuiBox)(spacing);

const Drawer = styled(MuiDrawer)`
  border-right: 0;

  > div {
    border-right: 0;
  }
`;

const Brand = styled(ListItemButton)`
  font-size: ${(props) => props.theme.typography.h5.fontSize};
  font-weight: ${(props) => props.theme.typography.fontWeightMedium};
  color: ${(props) => props.theme.sidebar.header.color};
  background-color: ${(props) => props.theme.sidebar.header.background};
  font-family: ${(props) => props.theme.typography.fontFamily};
  min-height: 56px;
  padding-left: ${(props) => props.theme.spacing(6)};
  padding-right: ${(props) => props.theme.spacing(6)};
  cursor: pointer;
  flex-grow: 0;
  align-self: flex-start;
  width: 100%;

  ${(props) => props.theme.breakpoints.up("sm")} {
    min-height: 64px;
  }

  &:hover {
    background-color: ${(props) => props.theme.sidebar.header.background};
  }
`;

const BrandIcon = styled(Box)`
  margin-right: ${(props) => props.theme.spacing(2)};
  color: ${(props) => props.theme.sidebar.header.brand.color};
  fill: ${(props) => props.theme.sidebar.header.brand.color};
  width: 32px;
  height: 32px;
  background-image: url("../../../favicon.png");
  background-size: contain;
`;

const Sidebar = ({ items, showFooter = true, ...rest }) => {
  return (
    <Drawer variant="permanent" {...rest}>
      <Brand component={NavLink} to="/">
        {/*<BrandIcon />*/}The Boiler header
      </Brand>
      <SidebarNav items={items} />
      {!!showFooter && <Footer />}
    </Drawer>
  );
};

export default Sidebar;
