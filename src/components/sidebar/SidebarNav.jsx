import { Icon, List } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import React from "react";
import ReactPerfectScrollbar from "react-perfect-scrollbar";
import {
  SidebarNavItem,
  SidebarNavListItemTitle,
} from "src/components/sidebar/SidebarNavListItem";
import styled, { css } from "styled-components";
import "../../vendor/perfect-scrollbar.css";
import SidebarNavSection from "./SidebarNavSection";

const baseScrollbar = css`
  background-color: ${(props) => props.theme.sidebar.background};
  border-right: 1px solid rgba(0, 0, 0, 0.12);
`;

const Scrollbar = styled.div`
  ${baseScrollbar};
  height: 100%;
`;

const PerfectScrollbar = styled(ReactPerfectScrollbar)`
  ${baseScrollbar};
  height: 100%;
`;

const Items = styled.div`
  padding-top: ${(props) => props.theme.spacing(2.5)};
  padding-bottom: ${(props) => props.theme.spacing(2.5)};
`;

const SidebarNav = ({ items = [] }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const ScrollbarComponent = matches ? PerfectScrollbar : Scrollbar;
  return (
    <ScrollbarComponent>
      <List disablePadding>
        <Items>
          {items.map((item) =>
            !item.disabled ? (
              <SidebarNavSection
                component="div"
                key={item.title}
                pages={item.pages}
                title={item.title}
              />
            ) : (
              <SidebarNavItem disabled key={item.title}>
                <Icon component={item.icon} />
                <SidebarNavListItemTitle>{item.title}</SidebarNavListItemTitle>
              </SidebarNavItem>
            )
          )}
        </Items>
      </List>
    </ScrollbarComponent>
  );
};

export default SidebarNav;
