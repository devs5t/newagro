import { Box, Chip, Grid, Stack, Typography } from "@mui/material";
import { FarmPool } from "src/config/constants/types";
import styled, { css } from "styled-components";

const mobileCut = "@media (max-width: 712px)";
const DetailsBox = styled(Box)`
  align-items: center;
  display: flex;

  ${mobileCut} {
    align-items: start;
    max-width: 100%;
    margin-bottom: 15px;
  }
`;

const StyledStack = styled(Stack)`
  ${mobileCut} {
    margin-top: -5px;
  }
`;

const Name = styled(Typography)(
  ({ stakedvalue }: { stakedvalue: number }) => css`
    color: ${stakedvalue > 0 && "#819DD9"};
    font-family: "Maven Pro", sans-serif;
    font-size: 1.125rem;
    font-weight: 900;
    padding: 0;
  `
);

const Description = styled(Typography)`
  color: #b5b7bf;
  font-family: "Maven Pro", sans-serif;
  font-size: 0.95rem;
  font-weight: 300;
  margin-top: -5px;
`;

const Label = styled(Typography)`
  color: #aaa;
  font-family: "Maven Pro", sans-serif;
  font-size: 0.85rem;
  margin-top: -3px;
`;

const FarmImage = styled(Box)(
  ({ farmName = "lory-bnb lp", folder = "images/farms" }) => css`
    width: ${farmName.includes(" lp") ? "85" : "50"}px;
    height: 52px;
    background-image: url("../../../../${folder}/${farmName}.png");
    background-size: contain;
    background-repeat: no-repeat;
    margin-right: 1rem;
  `
);

const FloatingChip = styled(Chip)`
  border-bottom-left-radius: 0rem;
  border-bottom-right-radius: 1rem;
  border-top-left-radius: 1rem;
  border-top-right-radius: 0rem;
  margin-left: -1.25rem;
  margin-top: -1.25rem;
  padding: 0;
  padding: 0rem 1rem 0rem 1rem;
  position: absolute;
`;

export const IconNameSection = ({
  item,
  stakedValue,
}: {
  item: FarmPool;
  stakedValue: number;
}) => (
  <Grid item xs={12} lg={4.3} style={{ position: "relative" }}>
    {/* <FloatingChip label={`${item.multiplier}x`} color="primary" size="small" /> */}
    <DetailsBox>
      <FarmImage farmName={item.stakingToken.name.toLowerCase()} />
      <StyledStack>
        <Name stakedvalue={stakedValue}>{item.name}</Name>
        <Label>
          <a
            href={item.stakingToken.buyLink}
            target="_blank"
            rel="no-referrer"
            style={{
              color: "#2f65cb",
              textDecoration: "none",
              fontWeight: 500,
            }}
          >
            Get {item.name}
          </a>
        </Label>
        {/* <Description>{item.earnDescription}</Description> */}
        {item.isVault && <Label>Uses {item.stakingToken.uses}</Label>}
      </StyledStack>
    </DetailsBox>
  </Grid>
);
