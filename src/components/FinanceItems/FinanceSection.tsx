import { LoadingButton } from "@mui/lab";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { useEthers } from "@usedapp/core";
import CountUp from "react-countup";
import styled, { css } from "styled-components";

const Container = styled(Stack)`
  border-radius: 1rem;
  box-shadow: rgb(139, 115, 197) 0px 0px 2px inset;
  margin-left: 1rem;
  min-height: 10.6rem;
  padding: 1rem 2.813rem 1.375rem 2.813rem;

  @media (max-width: 1300px) {
    margin: 0.5rem;
  }
`;

const Price = styled(Typography)`
  font-family: "Maven Pro", sans-serif;
  font-size: 2rem;
  font-weight: 900;
`;

const USDPrice = styled(Typography)`
  color: #b5b7bf;
  font-family: "Maven Pro", sans-serif;
  font-size: 1rem;
 
const mobileCut = "@media (max-width: 700px)"; font-weight: 500;
  margin-top: -0.55rem;
`;

const Label = styled(Typography)`
  color: #aaa;
  font-family: "Maven Pro", sans-serif;
  font-size: 1rem;
  font-weight: 100;
  margin-top: -0.2rem;
`;

const TokenName = styled(Typography)`
  margin-bottom: -0.5rem;
`;

const FarmImage = styled(Box)(
  ({ farmName = "lory-bnb lp" }) => css`
    width: ${farmName.includes(" lp") ? "85" : "50"}px;
    height: 52px;
    background-image: url("../../../../images/farms/${farmName}.png");
    background-size: contain;
    background-repeat: no-repeat;
    margin-right: 1rem;
  `
);

interface FinanceSectionProps {
  actionPrimaryClick?: unknown;
  actionPrimaryLabel?: string;
  actionPrimaryRender?: unknown;
  actionSecondaryClick?: unknown;
  actionSecondaryLabel?: string;
  actionSecondaryRender?: unknown;
  actionState: unknown;
  biggerOnMD?: boolean;
  buttonVariant?: string;
  disableMargin?: boolean;
  earningTokenName?: string;
  label?: string;
  primaryValue?: number;
  secondaryValue?: number;
}

export const FinanceSection = ({
  actionPrimaryClick,
  actionPrimaryLabel,
  actionPrimaryRender = true,
  actionSecondaryClick,
  actionSecondaryLabel,
  actionSecondaryRender = false,
  actionState,
  biggerOnMD,
  buttonVariant = "contained",
  disableMargin = false,
  earningTokenName,
  label,
  primaryValue,
  secondaryValue,
}: FinanceSectionProps) => {
  const { account } = useEthers();

  return (
    <Grid item xs={12} md={biggerOnMD ? 12 : 6} lg>
      <Container
        sx={disableMargin ? { marginLeft: "0px !important" } : {}}
        justifyContent="space-between"
      >
        <Stack direction="row" alignItems="center">
          {earningTokenName && (
            <FarmImage farmName={earningTokenName.toLowerCase()} />
          )}
          <Stack>
            {earningTokenName && (
              <TokenName>
                <span style={{ color: "sandybrown" }}>{earningTokenName}</span>{" "}
                EARNED
              </TokenName>
            )}
            <Price>
              <CountUp
                preserveValue
                start={0}
                end={primaryValue}
                decimals={7}
                duration={1}
                separator=","
              />
            </Price>
          </Stack>
        </Stack>
        {secondaryValue !== undefined && (
          <USDPrice>
            <CountUp
              preserveValue
              start={0}
              prefix={"$"}
              end={secondaryValue}
              decimals={2}
              duration={1}
              separator=","
            />
          </USDPrice>
        )}
        {label && <Label>{label}</Label>}
        {actionSecondaryRender && (
          <LoadingButton
            variant="contained"
            color="info"
            sx={{ marginTop: "0.5rem" }}
            onClick={actionSecondaryClick}
            loading={actionState?.status == "Mining"}
            disabled={!account}
          >
            {actionSecondaryLabel}
          </LoadingButton>
        )}
        {actionPrimaryRender && (
          <Button
            onClick={actionPrimaryClick}
            variant={buttonVariant}
            color="info"
            sx={{ marginTop: "0.5rem" }}
            disabled={primaryValue <= 0}
          >
            {actionPrimaryLabel}
          </Button>
        )}
      </Container>
    </Grid>
  );
};
