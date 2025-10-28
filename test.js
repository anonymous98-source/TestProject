 /* A vibrant, multi-colored background is essential for this effect to be visible. */
        body {
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            background: linear-gradient(135deg, #f3ec78, #af4261, #00c6ff, #0072ff);
            background-size: 400% 400%;
            animation: gradient-animation 15s ease infinite;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            margin: 0;
            padding: 20px;
        }

        /* The key CSS properties for the glassmorphism effect */
        .glass-element {
            /* 1. Semi-transparent background (Crucial for seeing the blur) */
            background: rgba(255, 255, 255, 0.15);

            /* 2. The Frosted Glass Effect (Key CSS Property) */
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px); /* For Safari support */

            /* 3. Optional Enhancements for Depth and Polish */
            border-radius: 16px;
            border: 1px solid rgba(255, 255, 255, 0.3);
            box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);

            /* Basic sizing and display */
            padding: 30px;
            color: #fff;
            max-width: 400px;
            text-align: center;
        }

        /* Animation for the background gradient */
        @keyframes gradient-animation {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }

        /* Additional text styling */
        h1 {
            margin-top: 0;
            font-size: 2em;
        }
        p {
            font-size: 1.1em;
            line-height: 1.5;
        }


import { useState, createContext } from "react"; // 1.5.1

// 1. Create the context
export const BackgroundContext = createContext();

// 2. Create the provider component
export const BackgroundProvider = ({ children }) => {
  const gradients = [
    // Original gradients
    "linear-gradient(135deg, #0d253f 0%, #0170a8 100%)",
    "linear-gradient(135deg, #000 0%, #252525ff 100%)",
    "linear-gradient(135deg, #2c3e50 0%, #4ca1af 100%)",
    "linear-gradient(135deg, #16222a 0%, #3a6073 100%)",
    "linear-gradient(135deg, #0f33d3ff 0%, #764ba2 100%)",
    "linear-gradient(to top, #30cfd0 0%, #330867 100%)", // Morpheus Den
    "linear-gradient(to left, #44048aff 0%, #001f55ff 100%)", // Deep Blue
    "linear-gradient(135deg, #c33764 0%, #3f4bb4ff 100%)", // Celestial
    "linear-gradient(135deg, #4b134f 0%, #c94b4b 100%)", // Bighead
    "linear-gradient(to right, #ca7687ff 0%, #fb8c6aff 100%)", // Sublime Light
    "linear-gradient(150deg, #13547a 0%, #80d0c7 100%)", // Aqua Splash
  ];

  const [currentGradientIndex, setCurrentGradientIndex] = useState(0);

  // Function to change the gradient
  const changeBackground = () => {
    setCurrentGradientIndex((prevIndex) => (prevIndex + 1) % gradients.length);
  };

  const currentBackground = gradients[currentGradientIndex];
  console.log(currentBackground);

  return (
    <BackgroundContext.Provider value={{ currentBackground, changeBackground }}>
      {children}
    </BackgroundContext.Provider>
  );
};
