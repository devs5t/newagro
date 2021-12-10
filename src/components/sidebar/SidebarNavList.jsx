import { useBlockNumber } from "@usedapp/core";
import React from "react";
import { useLocation } from "react-router-dom";
import reduceChildRoutes from "./reduceChildRoutes";

const SidebarNavList = (props) => {
  const { pages, depth } = props;
  const router = useLocation();
  const currentRoute = router.pathname;
  const blockNumber = useBlockNumber();

  const childRoutes = pages.reduce(
    (items, page) =>
      reduceChildRoutes({ items, page, currentRoute, depth, blockNumber }),
    []
  );

  return <React.Fragment>{childRoutes}</React.Fragment>;
};

export default SidebarNavList;
