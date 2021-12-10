import ModalUnstyled from "@mui/core/ModalUnstyled";
import { Close } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  IconButton,
  InputBase,
  Slider,
  Stack,
  Typography
} from "@mui/material";
import { styled } from "@mui/system";
import BigNumber from "bignumber.js";
import { useSnackbar } from "notistack";
import { useState } from "react";
import CountUp from "react-countup";
import { SNACKBAR } from "src/constants";

const StyledModal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Backdrop = styled("div")`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const style = {
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 2,
  px: 3,
  pt: 5,
  pb: 5,
};

interface StakeUnstakeModalProps {
  balance?: number;
  isOpen: boolean;
  isStake?: boolean;
  onClose: (value: boolean) => void;
  onConfirm: (id: number, value: any) => void;
  confirmState: any;
  id: number;
}

export const StakeUnstakeModal = ({
  balance,
  isOpen,
  isStake,
  onClose,
  onConfirm,
  confirmState,
  id,
}: StakeUnstakeModalProps) => {
  const label = isStake ? "Stake" : "Unstake";
  const [value, setValue] = useState();
  const [progressValue, setProgressValue] = useState(0);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const isMining = confirmState?.status == "Mining";

  const onModalClose = (force?: boolean) => {
    if (isMining && !force) return;
    onClose(false);
    setValue();
    setProgressValue(0);
  };

  const onClickConfirm = () => {
    const formattedValue = new BigNumber(value)
      .multipliedBy(new BigNumber(10).exponentiatedBy(18))
      .toFixed(0);

    onConfirm(id, formattedValue)
      .then(() => {
        enqueueSnackbar(
          "Error confirming transaction" || error?.data?.message,
          {
            variant: SNACKBAR.SUCCESS,
          }
        );
        onModalClose(true);
      })
      .catch(() => {
        enqueueSnackbar(
          "Error confirming transaction" || error?.data?.message,
          {
            variant: SNACKBAR.ERROR,
          }
        );
      });
  };

  return (
    <StyledModal
      aria-labelledby="unstyled-modal-title"
      aria-describedby="unstyled-modal-description"
      BackdropComponent={Backdrop}
      open={isOpen}
      onClose={onModalClose}
    >
      <Box sx={style}>
        <Stack
          sx={{ marginBottom: "1rem" }}
          direction="row"
          justifyContent="space-between"
        >
          <Typography variant="h4">{label} tokens</Typography>
          <IconButton
            disabled={isMining}
            onClick={onModalClose}
            aria-label="close-button"
            size="small"
          >
            <Close fontSize="small" />
          </IconButton>
        </Stack>

        <Stack direction="row" justifyContent="space-between">
          <Typography variant="subtitle1">Amount</Typography>
          <Typography
            variant="inherit"
            sx={{
              textDecoration: "underline",
              color: "primary",
              cursor: "pointer",
            }}
            onClick={() => {
              setValue(balance);
              setProgressValue(100);
            }}
          >
            Max:{" "}
            <CountUp
              start={balance}
              end={balance}
              decimals={7}
              duration={1}
              separator=","
            />
          </Typography>
        </Stack>

        <StyledInput
          value={value}
          onChange={(event) => {
            const valueToSet = parseFloat(event.target.value);
            const maxBalance = parseFloat(balance);

            if (valueToSet > maxBalance) {
              setValue(balance);
              setProgressValue(100);
            } else {
              setValue(event.target.value);
              setProgressValue((valueToSet / maxBalance) * 100);
            }
          }}
          placeholder="0"
          type="number"
        />

        <Stack sx={{ padding: 3, paddingTop: 0, marginBottom: "1rem" }}>
          <Slider
            aria-label="Amount"
            defaultValue={0}
            value={progressValue}
            onChange={(e) => {
              setProgressValue(e.target.value);
              const newVal = parseFloat(balance) * (e.target.value / 100);
              setValue(newVal.toFixed(18));
            }}
            step={25}
            marks={[
              {
                value: 0,
                label: "0%",
              },
              {
                value: 25,
                label: "25%",
              },
              {
                value: 50,
                label: "50%",
              },
              {
                value: 75,
                label: "75%",
              },
              {
                value: 100,
                label: "100%",
              },
            ]}
            min={0}
            max={100}
          />
        </Stack>
        <Stack direction="row" justifyContent="flex-end">
          <LoadingButton
            loading={confirmState?.status == "Mining"}
            disabled={!value || value <= 0}
            onClick={onClickConfirm}
            variant="contained"
            color="info"
          >
            {label}
          </LoadingButton>
        </Stack>
      </Box>
    </StyledModal>
  );
};

const StyledInput = styled(InputBase)`
  & > input {
    border-radius: 0.25rem !important;
    padding: 0.5rem;
    border: solid 1px;
    border-color: rgba(255, 255, 255, 0.1);
  }

  width: 100% !important;

  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;
