Nice — below is a ready-to-drop-in App.js that shows how to use the createMyTheme function from your mui-ios-glass-theme file, set up theme mode (light / dark / highContrast), memoize the theme for perf, and add a tiny toggle UI. I also show how to validate a user-supplied accent color using the theme.glass.utils.pickReadableTextColor helper exposed by the theme.

> Note: your theme file exports a factory function (export default function createMyTheme(mode = 'light') { ... }). So you must call that function to get the theme object before passing it to <ThemeProvider>.



// App.js
import "./App.css";
import AppRouter from "./routes/AppRouter";
import { BrowserRouter } from "react-router-dom";
import {
  Box,
  CssBaseline,
  ThemeProvider,
  IconButton,
  useMediaQuery,
  Tooltip,
} from "@mui/material";
import createMyTheme from "./theme/mui-ios-glass-theme"; // <-- factory function
// import liquidGlassTheme from "./theme/components"; // keep if you need it elsewhere
import {
  BackgroundContext,
  BackgroundProvider,
} from "./context/BackgroundContext";
import { useContext, useMemo, useState, useEffect } from "react";
import { AuthProvider } from "./context/AuthContext";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { SnackbarProviderComponent } from "./utils/SnackbarContext";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import HighQualityIcon from "@mui/icons-material/HighQuality";

const ThemeToggle = ({ mode, setMode }) => {
  return (
    <Box sx={{ display: "flex", gap: 1, alignItems: "center", p: 1 }}>
      <Tooltip title="Light">
        <IconButton
          size="small"
          onClick={() => setMode("light")}
          aria-label="Light mode"
        >
          <Brightness7Icon />
        </IconButton>
      </Tooltip>

      <Tooltip title="Dark">
        <IconButton
          size="small"
          onClick={() => setMode("dark")}
          aria-label="Dark mode"
        >
          <Brightness4Icon />
        </IconButton>
      </Tooltip>

      <Tooltip title="High contrast">
        <IconButton
          size="small"
          onClick={() => setMode("highContrast")}
          aria-label="High contrast mode"
        >
          <HighQualityIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

const AppContent = ({ setMode, mode }) => {
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
      {/* place the small theme toggle top-right or wherever you want */}
      <Box sx={{ position: "fixed", top: 12, right: 12, zIndex: 1400 }}>
        <ThemeToggle mode={mode} setMode={setMode} />
      </Box>

      {/* Router */}
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </Box>
  );
};

function App() {
  // prefer user's system preference on first load
  const prefersDark = useMediaQuery("(prefers-color-scheme: dark)");

  // load saved mode or fallback to prefersDark
  const [mode, setMode] = useState(() => {
    try {
      const saved = localStorage.getItem("appThemeMode");
      if (saved) return saved;
    } catch (e) {}
    return prefersDark ? "dark" : "light";
  });

  // persist selection
  useEffect(() => {
    try {
      localStorage.setItem("appThemeMode", mode);
    } catch (e) {}
  }, [mode]);

  // memoize the MUI theme object for performance
  const theme = useMemo(() => createMyTheme(mode), [mode]);

  // example: validate/adjust an accent color before using (optional)
  // const userAccent = "#FF5A5F"; // example value from settings
  // const readable = theme.glass.utils.pickReadableTextColor(userAccent);
  // if you apply userAccent to a component background, use `readable` as text color.

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
        <SnackbarProviderComponent>
          <AuthProvider>
            <BackgroundProvider>
              <AppContent setMode={setMode} mode={mode} />
            </BackgroundProvider>
          </AuthProvider>
        </SnackbarProviderComponent>
      </Provider>
    </ThemeProvider>
  );
}

export default App;

Key things done in the example

createMyTheme(mode) is called inside useMemo so the theme is recreated only when mode changes.

ThemeProvider receives the theme object returned by createMyTheme(...).

The small ThemeToggle component shows how to switch between light, dark, and highContrast.

Mode is persisted to localStorage so the user's selection survives reloads.

Example comment shows how to use theme.glass.utils.pickReadableTextColor() to compute readable text color for any arbitrary accent/background color a user might pick.


Accessibility reminders

Use the highContrast mode if users need stronger contrast. You already included it in the theme factory.

When letting users select custom accent colors, always compute contrast (via theme.glass.utils.contrastRatio() or pickReadableTextColor) and adjust the color or swap the text color to meet at least 4.5:1 for normal text.

Run axe / Lighthouse and manual keyboard tests (focus-visible outlines are already added in the theme).


If you want, I can:

Add a tiny settings panel component that demonstrates live-editing the primary color and automatically enforces contrast.

Or modify your BackgroundContext to optionally switch theme mode depending on background selection (e.g., if a very dark background is chosen, auto-switch to dark mode). Which would you prefer?


