// BackgroundContext.jsx
import { useState, useEffect, useMemo, createContext } from "react";

export const BackgroundContext = createContext({
  currentBackground: "",
  changeBackground: () => {},
});

export const BackgroundProvider = ({ children }) => {
  const gradients = useMemo(
    () => [
      "linear-gradient(135deg, #0d253f 0%, #0170a8 100%)",
      "linear-gradient(135deg, #000 0%, #252525ff 100%)",
      "linear-gradient(135deg, #2c3e50 0%, #4ca1af 100%)",
      "linear-gradient(135deg, #16222a 0%, #3a6073 100%)",
      "linear-gradient(135deg, #0f33d3ff 0%, #764ba2 100%)",
      "linear-gradient(to top, #30cfd0 0%, #330867 100%)",
      "linear-gradient(to left, #44048aff 0%, #001f55ff 100%)",
      "linear-gradient(135deg, #c33764 0%, #3f4bb4ff 100%)",
      "linear-gradient(135deg, #4b134f 0%, #c94b4b 100%)",
      "linear-gradient(to right, #ca7687ff 0%, #fb8c6aff 100%)",
      "linear-gradient(150deg, #13547a 0%, #80d0c7 100%)",
      // If you want the 4-stop demo:
      // "linear-gradient(135deg, #f3ec78, #af4261, #00c6ff, #0072ff)",
    ],
    []
  );

  const [currentGradientIndex, setCurrentGradientIndex] = useState(0);
  const currentBackground = gradients[currentGradientIndex];

  const changeBackground = () => {
    setCurrentGradientIndex((p) => (p + 1) % gradients.length);
  };

  // Inject minimal CSS once: body background + animation keyframes only
  useEffect(() => {
    const STYLE_ID = "bg-context-minimal";
    if (!document.getElementById(STYLE_ID)) {
      const styleEl = document.createElement("style");
      styleEl.id = STYLE_ID;
      styleEl.innerHTML = `
        body {
          background: var(--bg, linear-gradient(135deg, #f3ec78, #af4261, #00c6ff, #0072ff));
          background-size: 400% 400%;
          animation: gradient-animation 15s ease infinite;
        }
        @keyframes gradient-animation {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `;
      document.head.appendChild(styleEl);
    }
  }, []);

  // Keep the current gradient in sync
  useEffect(() => {
    document.body.style.setProperty("--bg", currentBackground);
  }, [currentBackground]);

  return (
    <BackgroundContext.Provider value={{ currentBackground, changeBackground }}>
      {children}
    </BackgroundContext.Provider>
  );
};