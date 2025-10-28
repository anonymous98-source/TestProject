// BackgroundContext.jsx
import { useState, useEffect, createContext, useMemo } from "react";

// 1) Create the context
export const BackgroundContext = createContext({
  currentBackground: "",
  changeBackground: () => {},
});

// 2) Provider that applies the animated gradient to the <body>
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
      // keep your original multi-stop demo as a first impression if you like:
      // "linear-gradient(135deg, #f3ec78, #af4261, #00c6ff, #0072ff)",
    ],
    []
  );

  const [currentGradientIndex, setCurrentGradientIndex] = useState(0);
  const currentBackground = gradients[currentGradientIndex];

  const changeBackground = () => {
    setCurrentGradientIndex((prev) => (prev + 1) % gradients.length);
  };

  // 3) Inject keyframes + classes once, and keep body styles in sync
  useEffect(() => {
    // Create (or reuse) a singleton <style> tag for our CSS
    const STYLE_ID = "bg-context-styles";
    let styleEl = document.getElementById(STYLE_ID);
    if (!styleEl) {
      styleEl = document.createElement("style");
      styleEl.id = STYLE_ID;
      styleEl.innerHTML = `
        /* ===== Animated background setup ===== */
        .__bg-animated {
          /* Full-viewport canvas */
          min-height: 100vh;
          background: var(--bg, linear-gradient(135deg, #f3ec78, #af4261, #00c6ff, #0072ff));
          background-size: 400% 400%;
          animation: gradient-animation 15s ease infinite;

          /* Nice base typography & centering like your CSS */
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          margin: 0;
        }

        /* Frosted glass effect for any card-like element */
        .glass-element {
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.3);
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
          padding: 30px;
          color: #fff;
          max-width: 400px;
          text-align: center;
        }

        /* Headings & text like your sample */
        .glass-element h1 { margin-top: 0; font-size: 2em; }
        .glass-element p { font-size: 1.1em; line-height: 1.5; }

        /* Animate the gradient's position */
        @keyframes gradient-animation {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `;
      document.head.appendChild(styleEl);
    }

    // Apply / update the body class & CSS variable
    const body = document.body;
    body.classList.add("__bg-animated");
    body.style.setProperty("--bg", currentBackground);

    // Ensure body padding matches your snippet (keep margin reset in CSS)
    if (!body.style.padding) body.style.padding = "20px";

    // Cleanup on unmount (keeps class if you prefer — remove if you want persistence)
    return () => {
      // Comment the next two lines if you want the background to persist after unmount
      body.classList.remove("__bg-animated");
      body.style.removeProperty("--bg");
    };
  }, [currentBackground]);

  return (
    <BackgroundContext.Provider value={{ currentBackground, changeBackground }}>
      {/* We still render children normally; body handles the backdrop */}
      {children}
    </BackgroundContext.Provider>
  );
};