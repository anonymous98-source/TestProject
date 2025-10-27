import "./App.css";
import AppRouter from "./routes/AppRouter";
import { BrowserRouter } from "react-router-dom";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import liquidGlassTheme from "./theme/components";
import iosGlassTheme from "./theme/mui-ios-glass-theme";
import {
  BackgroundContext,
  BackgroundProvider,
} from "./context/BackgroundContext";
import { useContext } from "react";
import { AuthProvider } from "./context/AuthContext";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { SnackbarProviderComponent } from "./utils/SnackbarContext";

const AppContent = () => {
  const { currentBackground } = useContext(BackgroundContext);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: currentBackground,
        position: "relative",
        transition: "background 0.5s ease-in-out",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* <BrowserRouter> */}
      <AppRouter />
      {/* </BrowserRouter> */}
    </Box>
  );
};

function App() {
  return (
    <>
      <ThemeProvider theme={iosGlassTheme}>
        <CssBaseline />
        <Provider store={store}>
          <SnackbarProviderComponent>
            <AuthProvider>
              <BackgroundProvider>
                <AppContent />
              </BackgroundProvider>
            </AuthProvider>
          </SnackbarProviderComponent>
        </Provider>
      </ThemeProvider>
    </>
  );
}

export default App;
