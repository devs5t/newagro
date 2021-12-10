import { Box, Grid, Stack, Typography } from "@mui/material";
import CountUp from "react-countup";
import styled from "styled-components";

const PropertiesBox = styled(Box)`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: start;
  padding: 1rem;
`;

const Label = styled(Typography)`
  font-family: "Maven Pro", sans-serif;
  font-size: 1rem;
  font-weight: 900;
`;

const Value = styled(Typography)`
  font-family: "Maven Pro", sans-serif;
  font-size: 1rem;
  font-weight: 500;
`;

interface FinanceInformationProps {
  liquidity: number;
  depositFee: number;
}

export const FinanceInformation = ({
  liquidity,
  depositFee,
}: FinanceInformationProps) => (
  <Grid item xs={12} sx={{ display: { xs: "block", lg: "none" } }}>
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="flex-start"
      spacing={2}
    >
      <PropertiesBox>
        <Stack direction="row">
          <Label>Liquidity:&nbsp;</Label>
          <Value>
            <CountUp
              decimals={2}
              duration={1}
              end={liquidity}
              prefix={"$"}
              preserveValue
              separator=","
              start={0}
            />
          </Value>
        </Stack>
        <Stack direction="row">
          <Label>Deposit Fee:&nbsp;</Label>
          <Value>
            <CountUp
              decimals={2}
              duration={1}
              end={depositFee}
              preserveValue
              separator=","
              start={0}
              suffix="%"
            />
          </Value>
        </Stack>
      </PropertiesBox>
    </Stack>
  </Grid>
);
