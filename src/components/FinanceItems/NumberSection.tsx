import { Box, Grid, Typography } from "@mui/material";
import CountUp from "react-countup";
import styled, { css } from "styled-components";

const EmptyValue = styled(Box)`
  opacity: 0.4;
`;

const Title = styled(Typography)`
  font-family: "Maven Pro", sans-serif;
  font-size: 1.1rem;
  font-weight: 900;
`;

const Subtitle = styled(Typography)(
  ({ title }: { title: string }) => css`
  font-family: "Maven Pro", sans-serif;
  // font-family: ${(title === "APR" || title === "APY") && "Titan One"};
  font-size: 1rem;
  // font-size: ${(title === "APR" || title === "APY") && "1.05rem"};
  font-weight: 200;
  // font-weight: ${(title === "APR" || title === "APY") && "200"};
  color: ${(title === "APR" || title === "APY") && "green"};
`);

interface NumberSectionInterface {
  decimals?: number;
  duration?: number;
  overridenSx: any;
  prefix?: string;
  preserveValue?: boolean;
  preventNumberUp?: boolean;
  separator?: string;
  showZero?: boolean;
  start?: number;
  suffix?: string;
  title?: string;
  value?: number;
}

export const NumberSection = ({
  decimals = 5,
  duration = 1,
  overridenSx,
  prefix = "",
  preserveValue = true,
  preventNumberUp = false,
  separator = ",",
  showZero = false,
  start = 0,
  suffix = "",
  title,
  value,
}: NumberSectionInterface) => (
  <Grid item xs sx={overridenSx}>
    <Title>{title}</Title>
    <Subtitle title={title}>
      {(value && value > 0) || showZero ? (
        <span>
          <CountUp
            decimals={decimals}
            duration={duration}
            end={value || 0}
            prefix={prefix}
            preserveValue={preserveValue}
            separator={separator}
            suffix={suffix}
            start={preventNumberUp ? value : start}
          />
        </span>
      ) : (
        <EmptyValue>0</EmptyValue>
      )}
    </Subtitle>
  </Grid>
);
