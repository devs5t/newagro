import { DAppProvider } from "@usedapp/core";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import { PriceContextProvider } from "src/contexts/PriceContext";
import { RefreshContextProvider } from "src/contexts/RefreshContext";
import { TokensContextProvider } from "src/contexts/TokensContext";
import store from "src/redux/store";
import { getConfig } from "src/utils/chainUtils";

interface AppProvidersProps {
  children: ReactNode;
}

export const AppProviders = ({ children }: AppProvidersProps) => (
  <DAppProvider config={getConfig()}>
    <Provider store={store}>
      <RefreshContextProvider>
        <PriceContextProvider>
          <TokensContextProvider>{children}</TokensContextProvider>
        </PriceContextProvider>
      </RefreshContextProvider>
    </Provider>
  </DAppProvider>
);

// const components = {
//   Toast,
//   ToastContainer,
// };
