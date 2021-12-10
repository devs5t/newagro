import { configureStore } from "@reduxjs/toolkit";
import vaultReducer from "./vault/vaultReducer";

export default configureStore({
  devTools: import.meta.env.NODE_ENV !== "production",
  reducer: {
    vault: vaultReducer,
  },
});
