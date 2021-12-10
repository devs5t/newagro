import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AppProviders } from "./features/App/AppProviders";
import { SnackbarProvider } from "notistack";

ReactDOM.render(
  <BrowserRouter>
    <StrictMode>
      <AppProviders>
        <ThemeProvider>
          <SnackbarProvider
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            maxSnack={3}
          >
            <App />
          </SnackbarProvider>
        </ThemeProvider>
      </AppProviders>
    </StrictMode>
  </BrowserRouter>,
  document.getElementById("root")
);
