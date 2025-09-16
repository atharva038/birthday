import React, {useState, useEffect} from "react";
import {motion} from "framer-motion";
import "../styles/FloatingHearts.css";

const FloatingHearts = () => {
  const hearts = ["💖", "💕", "💗", "💝", "💘", "🌹", "💌", "✨", "🦋", "🌸"];
  const [dimensions, setDimensions] = useState({width: 1200, height: 800});

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const generateRandomHearts = () => {
    return [...Array(12)].map((_, index) => ({
      id: index,
      emoji: hearts[Math.floor(Math.random() * hearts.length)],
      initialX: Math.random() * dimensions.width,
      size: Math.random() * 1.5 + 1.2,
      duration: Math.random() * 6 + 8,
      delay: Math.random() * 8,
      swayAmount: Math.random() * 80 + 40,
    }));
  };

  const [heartElements] = useState(generateRandomHearts);

  return (
    <div className="floating-hearts">
      {/* Main floating hearts */}
      {heartElements.map((heart) => (
        <motion.div
          key={heart.id}
          className="heart"
          style={{
            fontSize: `${heart.size}rem`,
            left: heart.initialX,
            filter: "drop-shadow(0 0 8px rgba(255, 182, 193, 0.6))",
            zIndex: 1,
          }}
          initial={{
            y: dimensions.height + 100,
            opacity: 0,
            x: 0,
            scale: 0,
            rotate: 0,
          }}
          animate={{
            y: -150, // Fixed endpoint regardless of scroll
            opacity: [0, 0.8, 0.9, 0.7, 0],
            x: [
              0,
              Math.sin(1) * heart.swayAmount,
              Math.sin(2) * -heart.swayAmount * 0.7,
              Math.sin(3) * heart.swayAmount * 0.5,
              0,
            ],
            scale: [0, 0.6, 1, 1.1, 0.8, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: heart.duration,
            repeat: Infinity,
            delay: heart.delay,
            ease: "linear", // Linear for consistent speed
            times: [0, 0.15, 0.4, 0.8, 1],
          }}
        >
          {heart.emoji}
        </motion.div>
      ))}

      {/* Sparkle effects - smaller and more subtle */}
      {[...Array(6)].map((_, index) => (
        <motion.div
          key={`sparkle-${index}`}
          className="sparkle"
          style={{
            fontSize: "0.8rem",
            color: "#fff",
            textShadow: "0 0 10px rgba(255, 255, 255, 0.8)",
            left: Math.random() * dimensions.width,
            top: Math.random() * dimensions.height,
            zIndex: 1,
          }}
          initial={{
            opacity: 0,
            scale: 0,
            rotate: 0,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut",
          }}
        >
          ✨
        </motion.div>
      ))}

      {/* Floating rose petals - slower and more graceful */}
      {[...Array(4)].map((_, index) => (
        <motion.div
          key={`petal-${index}`}
          className="petal"
          style={{
            fontSize: "1.2rem",
            color: "#ffb6c1",
            filter: "drop-shadow(0 0 5px rgba(255, 182, 193, 0.5))",
            left: Math.random() * dimensions.width,
            zIndex: 1,
          }}
          initial={{
            y: -100,
            opacity: 0,
            rotate: 0,
            x: 0,
          }}
          animate={{
            y: dimensions.height + 100,
            opacity: [0, 0.7, 0.5, 0],
            rotate: [0, 180, 360],
            x: [
              0,
              Math.sin(0.5) * 60,
              Math.sin(1) * -40,
              Math.sin(1.5) * 30,
              0,
            ],
          }}
          transition={{
            duration: Math.random() * 8 + 12, // Slower fall
            repeat: Infinity,
            delay: Math.random() * 6,
            ease: "linear",
          }}
        >
          🌸
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingHearts;
