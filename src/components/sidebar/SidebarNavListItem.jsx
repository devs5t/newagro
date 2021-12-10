import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Chip, Collapse, ListItemButton, ListItemText } from "@mui/material";
import { darken, rgba } from "polished";
import React, { forwardRef } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const CustomRouterLink = forwardRef((props, ref) => (
  <div ref={ref}>
    <NavLink {...props} />
  </div>
));

export const SidebarNavItem = styled(ListItemButton)`
  padding-top: ${(props) =>
    props.theme.spacing(props.depth && props.depth > 0 ? 2 : 3)};
  padding-bottom: ${(props) =>
    props.theme.spacing(props.depth && props.depth > 0 ? 2 : 3)};
  padding-left: ${(props) =>
    props.theme.spacing(props.depth && props.depth > 0 ? 14 : 8)};
  padding-right: ${(props) =>
    props.theme.spacing(props.depth && props.depth > 0 ? 4 : 7)};
  font-weight: ${(props) => props.theme.typography.fontWeightRegular};
  ${(props) =>
    props.disabled &&
    `
    cursor: not-allowed;
    opacity: 0.5;
    padding-top: 12px;
    padding-bottom: 12px;
    padding-left: 32px;
    padding-right: 28px;
    font-weight: 400;
  `};
  svg {
    color: ${(props) => props.theme.sidebar.color};
    font-size: 20px;
    width: 20px;
    height: 20px;
    opacity: 0.5;
  }
  &:hover {
    background: rgba(0, 0, 0, 0.08);
    color: ${(props) => props.theme.sidebar.color};
  }
  &.${(props) => props.activeclassname} {
    svg {
      color: ${(props) =>
        props.theme.name === "DARK"
          ? props.theme.sidebar.color
          : props.theme.header.background};
      fill: ${(props) =>
        props.theme.name === "DARK"
          ? props.theme.sidebar.color
          : props.theme.header.background};
      opacity: 1;
    }
    background-color: ${(props) =>
      darken(0.03, props.theme.sidebar.background)};
    span {
      color: ${(props) =>
        props.theme.name === "DARK"
          ? props.theme.sidebar.color
          : props.theme.header.background};
      font-size: 0.9rem;
    }
  }
`;

export const SidebarNavListItemTitle = styled(ListItemText)`
  margin: 0;
  span {
    color: ${(props) =>
      rgba(
        props.theme.sidebar.color,
        props.depth && props.depth > 0 ? 0.7 : 1
      )};
    font-size: ${(props) => props.theme.typography.body1.fontSize}px;
    padding: 0 ${(props) => props.theme.spacing(4)};
  }
`;

const Badge = styled(Chip)`
  font-weight: ${(props) => props.theme.typography.fontWeightBold};
  height: 20px;
  position: absolute;
  right: 26px;
  top: 12px;
  background: ${(props) => props.theme.sidebar.badge.background};
  z-index: 1;
  span.MuiChip-label,
  span.MuiChip-label:hover {
    font-size: 11px;
    cursor: pointer;
    color: ${(props) => props.theme.sidebar.badge.color};
    padding-left: ${(props) => props.theme.spacing(2)};
    padding-right: ${(props) => props.theme.spacing(2)};
  }
`;

const ExpandLessIcon = styled(ExpandLess)`
  color: ${(props) => rgba(props.theme.sidebar.color, 0.5)};
`;

const ExpandMoreIcon = styled(ExpandMore)`
  color: ${(props) => rgba(props.theme.sidebar.color, 0.5)};
`;

const SidebarNavListItem = (props) => {
  const {
    title,
    href,
    depth = 0,
    children,
    icon: Icon,
    badge,
    open: openProp = false,
    disabled,
  } = props;

  const [open, setOpen] = React.useState(openProp);

  const handleToggle = () => {
    setOpen((state) => !state);
  };

  if (children) {
    return (
      <React.Fragment>
        <SidebarNavItem depth={depth} onClick={handleToggle}>
          {Icon && <Icon />}
          <SidebarNavListItemTitle depth={depth}>
            {title}
            {badge && <Badge label={badge} />}
          </SidebarNavListItemTitle>
          {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </SidebarNavItem>
        <Collapse in={open}>{children}</Collapse>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <SidebarNavItem
        depth={depth}
        component={CustomRouterLink}
        to={href}
        activeclassname="active"
        disabled={disabled}
      >
        {Icon && <Icon />}
        <SidebarNavListItemTitle depth={depth}>
          {title}
          {badge && <Badge label={badge} />}
        </SidebarNavListItemTitle>
      </SidebarNavItem>
    </React.Fragment>
  );
};

export default SidebarNavListItem;
