import { useEthers } from "@usedapp/core";
import { useEffect, useReducer, useRef } from "react";
import { useToasts } from "react-toast-notifications";
import Toasts from "src/template/components/bootstrap/Toasts";
import { useSnackbar } from "notistack";

type LoadingState = "idle" | "loading" | "success" | "fail";

type Action =
  | { type: "requires_approval" }
  | { type: "approve_sending" }
  | { type: "approve_receipt"; payload: any }
  | { type: "approve_error"; payload: any }
  | { type: "confirm_sending" }
  | { type: "confirm_receipt"; payload: any }
  | { type: "confirm_error"; payload: any };

interface State {
  approvalState: LoadingState;
  approvalReceipt: any;
  approvalError: any;
  confirmState: LoadingState;
  confirmReceipt: any;
  confirmError: any;
}

const initialState: State = {
  approvalState: "idle",
  approvalReceipt: null,
  approvalError: null,
  confirmState: "idle",
  confirmReceipt: null,
  confirmError: null,
};

const reducer = (state: State, actions: Action): State => {
  switch (actions.type) {
    case "requires_approval":
      return {
        ...state,
        approvalState: "idle",
      };
    case "approve_sending":
      return {
        ...state,
        approvalState: "loading",
      };
    case "approve_receipt":
      return {
        ...state,
        approvalState: "success",
        approvalReceipt: actions.payload,
      };
    case "approve_error":
      return {
        ...state,
        approvalState: "fail",
        approvalError: actions.payload,
      };
    case "confirm_sending":
      return {
        ...state,
        confirmState: "loading",
      };
    case "confirm_receipt":
      return {
        ...state,
        confirmState: "success",
        confirmReceipt: actions.payload,
      };
    case "confirm_error":
      return {
        ...state,
        confirmState: "fail",
        confirmError: actions.payload,
      };
    default:
      return state;
  }
};

interface ApproveConfirmTransaction {
  onConfirm: () => unknown;
  onRequiresApproval?: () => Promise<boolean>;
  onApprove: () => unknown;
  onSuccess: () => void;
}

export const useApproveConfirmTransaction = ({
  onConfirm,
  onRequiresApproval,
  onSuccess,
  onApprove,
}: ApproveConfirmTransaction) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { addToast } = useToasts();
  const { account } = useEthers();
  const [state, dispatch] = useReducer(reducer, initialState);
  const handlePreApprove = useRef(onRequiresApproval);

  useEffect(() => {
    if (account && handlePreApprove.current) {
      handlePreApprove.current().then((result) => {
        if (result) {
          dispatch({ type: "requires_approval" });
        } else {
          dispatch({ type: "approve_receipt", payload: {} });
        }
      });
    }
  }, [account]);

  return {
    isApproving: state.approvalState === "loading",
    isApproved: state.approvalState === "success",
    isConfirming: state.confirmState === "loading",
    isConfirmed: state.confirmState === "success",
    handleConfirm: async () => {
      const { fn, params } = onConfirm();
      dispatch({ type: "confirm_sending" });

      fn(params)
        .then(async (result) => {
          const receipt = await result.wait();
          dispatch({ type: "confirm_receipt", payload: receipt });
          onSuccess();
        })
        .catch((error) => {
          dispatch({ type: "confirm_error", payload: error });
          enqueueSnackbar(
            "Error confirming transaction" || error?.data?.message,
            {
              variant: "info",
            }
          );
        });
    },
    handleApprove: async () => {
      const { fn, params, state } = onApprove();
      dispatch({ type: "approve_sending" });

      fn(...params)
        .then(async (result) => {
          const receipt = await result.wait();
          dispatch({ type: "approve_receipt", payload: receipt });
        })
        .catch((error) => {
          dispatch({ type: "approve_error" });
          enqueueSnackbar(
            "Error confirming transaction" || error?.data?.message,
            {
              variant: "info",
            }
          );
        });
    },
  };
};
