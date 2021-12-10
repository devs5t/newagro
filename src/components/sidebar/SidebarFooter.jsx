import { Box, Typography } from "@mui/material";
import React from "react";
import CountUp from "react-countup";
import { useTokenPrice } from "src/hooks/useTokenPrice";
import styled from "styled-components";

const Footer = styled.div`
  background-color: ${(props) =>
    props.theme.sidebar.footer.background} !important;
  padding: ${(props) => props.theme.spacing(2)}
    ${(props) => props.theme.spacing(4)};
  border-right: 1px solid rgba(0, 0, 0, 0.12);
  max-height: 3.75rem;
`;


const SidebarFooter = ({ ...rest }) => {
  const price = useTokenPrice();
  return (
    <Footer {...rest}>
      <Box style={{ display: "flex" }}>
        <Box
          style={{
            display: "flex",
            alignSelf: "center",
          }}
        >
          Footer
        </Box>
      </Box>
    </Footer>
  );
};

export default SidebarFooter;
