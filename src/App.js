import React, {useState, useEffect, useRef} from "react";
import {motion, AnimatePresence} from "framer-motion";
import Message from "./components/Message";
import FloatingHearts from "./components/FloatingHearts"; // Import the component
import "./styles/App.css";

const App = () => {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [showWelcome, setShowWelcome] = useState(true);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [allMessagesComplete, setAllMessagesComplete] = useState(false);
  const [heartClicks, setHeartClicks] = useState(0);
  const containerRef = useRef(null);

  // Custom scroll tracking with throttling
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, {passive: true});
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Updated 10-chapter love story messages for Mansi with chapter headers and conditional promise
  const messages = [
    "Two years ago, our story began… from strangers ➝ best friends ➝ soulmates ❤️. Every smile 😊, every silly fight 😅, and every late-night talk 🌙 has written a page in our book of love.",

    "Today is not just another day — it's the day my queen 👑 was born. Happy Birthday, my love! 💕 You deserve cakes as sweet as your smile 🍰, surprises as big as your dreams 🌟, and happiness that never ends 🥰.",

    "I know you often talk about marriage 💍, and I love that you see me as your forever. But right now, I want to focus on my studies 📚, so I can build a future where we live with peace and comfort together 🏡. Trust me, my love, I'm working today for our tomorrow 🤝.",

    "I know I've hurt you sometimes 😞, and for that I'm truly sorry 🙏. I never want to be the reason for your tears 😢. You deserve smiles, care, and pure love always ❤️.",

    "You don't like it when I talk to other girls 👩‍🦰, and I understand it's because you love me so much 💞. But please know — no one can ever take your place 👩‍❤️‍👨. In my heart, there's only you… always and forever 💍.",

    "If I could, I'd steal all the stars ✨ from the sky just to make your nights brighter 🌌. And if I could, I'd press pause ⏸️ on every moment with you so our story never ends… Because baby, you are my favorite chapter 📖💘.",

    "Thank you for your love 💕, your care 🤗, your scoldings 😆, and your madness 🙈. Without you, I wouldn't be who I am today 🙌. You are the magic ✨ that makes my world brighter 🌍.",

    "Two years is just the beginning 📖. I want thousands of chapters with you 👫 — full of laughter, adventures, and dreams. Our story is endless, and you are my forever 🥂.",

    "If you accept me the way I am — my dreams, my focus, my mistakes, and my love ❤️ — then I promise you this: I will stand by you, fight for us, and never let go of your hand 🤝. Together, we will write an endless love story ✍️✨.",

    "At the end of every fight 😢, every dream 🌈, every tomorrow 🌞… one truth always remains the same — ✨ I Love You ❤️ ✨",
  ];

  // Welcome screen timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
      setIsLoaded(true);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  // Heart click handler
  const handleHeartClick = (event) => {
    setHeartClicks((prev) => prev + 1);

    // Create floating heart animation
    const heart = document.createElement("div");
    heart.innerHTML = "💖";
    heart.className = "floating-click-heart";
    heart.style.position = "fixed";
    heart.style.left = event.clientX + "px";
    heart.style.top = event.clientY + "px";
    heart.style.fontSize = "2rem";
    heart.style.pointerEvents = "none";
    heart.style.zIndex = "1000";
    heart.style.userSelect = "none";

    document.body.appendChild(heart);

    setTimeout(() => {
      document.body.removeChild(heart);
    }, 2000);
  };

  // Music toggle handler
  const toggleMusic = () => {
    setMusicPlaying(!musicPlaying);
  };

  // Calculate scroll progress
  const scrollProgress = Math.min(
    scrollY / (document.body.scrollHeight - window.innerHeight),
    1
  );

  // Animation variants
  const containerVariants = {
    hidden: {opacity: 0},
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.5,
        delayChildren: 0.2,
      },
    },
  };

  const titleVariants = {
    hidden: {
      opacity: 0,
      y: -50,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 1.2,
        ease: [0.25, 0.46, 0.45, 0.94],
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <>
      {/* Welcome Screen */}
      <AnimatePresence>
        {showWelcome && (
          <motion.div
            className="welcome-screen"
            initial={{opacity: 0, scale: 0.8}}
            animate={{opacity: 1, scale: 1}}
            exit={{opacity: 0, scale: 1.1}}
            transition={{duration: 0.8, ease: "easeInOut"}}
          >
            <div className="welcome-content">
              <motion.div
                className="welcome-title"
                initial={{scale: 0, rotate: -180}}
                animate={{scale: 1, rotate: 0}}
                transition={{
                  delay: 0.5,
                  duration: 1,
                  type: "spring",
                  stiffness: 200,
                }}
              >
                🎂
              </motion.div>
              <motion.h1
                className="welcome-subtitle"
                initial={{opacity: 0, y: 30}}
                animate={{opacity: 1, y: 0}}
                transition={{delay: 1, duration: 0.8}}
              >
                Happy Birthday Mansi!
              </motion.h1>
              <motion.div
                className="welcome-hearts"
                initial={{opacity: 0, scale: 0}}
                animate={{opacity: 1, scale: 1}}
                transition={{delay: 1.5, duration: 0.6}}
              >
                💕💖💕
              </motion.div>
              <motion.p
                className="welcome-from"
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{delay: 2, duration: 0.8}}
              >
                With all my love, Atharva 💝
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FLOATING HEARTS COMPONENT - SCROLL INDEPENDENT */}
      <FloatingHearts />

      {/* Main App */}
      <div className="app">
        {/* Background Decorations */}
        <div className="bg-decoration bg-decoration-1"></div>
        <div className="bg-decoration bg-decoration-2"></div>
        <div className="bg-decoration bg-decoration-3"></div>
        <div className="bg-decoration bg-decoration-4"></div>

        {/* Heart Counter */}
        <motion.div
          className="heart-counter"
          initial={{opacity: 0, x: -100}}
          animate={{opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : -100}}
          transition={{delay: 1, duration: 0.8}}
        >
          <motion.div
            className="clickable-heart"
            onClick={handleHeartClick}
            whileHover={{scale: 1.2, rotate: 15}}
            whileTap={{scale: 0.9}}
          >
            💖
          </motion.div>
          <span className="heart-count">{heartClicks}</span>
        </motion.div>

        {/* Music Toggle */}
        <motion.button
          className="music-toggle"
          onClick={toggleMusic}
          initial={{opacity: 0, x: 100}}
          animate={{opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : 100}}
          transition={{delay: 1.2, duration: 0.8}}
          whileHover={{scale: 1.1}}
          whileTap={{scale: 0.95}}
          aria-label={musicPlaying ? "Pause music" : "Play music"}
        >
          {musicPlaying ? "⏸️" : "🎵"}
        </motion.button>

        {/* Main Container */}
        <motion.div
          ref={containerRef}
          className="container"
          variants={containerVariants}
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
        >
          {/* Title with parallax effect */}
          <motion.h1
            className="main-title"
            variants={titleVariants}
            style={{
              transform: `translateY(${scrollY * 0.1}px)`,
            }}
          >
            HAPPY BIRTHDAY MY LOVE 💖
          </motion.h1>

          <motion.p
            className="subtitle"
            initial={{opacity: 0, y: 20}}
            animate={{opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20}}
            transition={{delay: 1.5, duration: 0.8}}
          >
            Forever and Always, Your Atharva ❤️
          </motion.p>

          {/* Story Book Introduction */}
          <motion.div
            className="story-introduction"
            initial={{opacity: 0, y: 50}}
            animate={{opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 50}}
            transition={{delay: 2, duration: 1}}
            style={{
              textAlign: "center",
              margin: "60px auto",
              padding: "30px",
              background: "rgba(255, 255, 255, 0.9)",
              borderRadius: "20px",
              border: "2px solid rgba(255, 107, 157, 0.3)",
              maxWidth: "600px",
              boxShadow: "0 15px 40px rgba(255, 107, 157, 0.2)",
            }}
          >
            <div style={{fontSize: "3rem", marginBottom: "20px"}}>📖</div>
            <h2
              style={{
                fontFamily: "'Brush Script MT', cursive",
                fontSize: "2rem",
                color: "#880e4f",
                marginBottom: "15px",
              }}
            >
              Our Love Story in 10 Chapters
            </h2>
            <p
              style={{
                fontFamily: "'Georgia', serif",
                fontSize: "1.1rem",
                color: "#555",
                fontStyle: "italic",
                lineHeight: "1.6",
              }}
            >
              As you scroll down, my dearest Mansi, each chapter will unfold our
              beautiful 2-year journey together. This is our love story, written
              especially for your special day. 💕
            </p>
          </motion.div>

          {/* Progress Bar */}
          <div className="progress-container">
            <motion.div
              className="birthday-progress"
              initial={{scaleX: 0}}
              animate={{scaleX: scrollProgress}}
              style={{transformOrigin: "left"}}
            />
          </div>

          {/* Messages */}
          <div className="messages-container">
            {messages.map((message, index) => (
              <Message
                key={index}
                text={message}
                delay={index * 0.5}
                index={index}
                totalMessages={messages.length}
              />
            ))}
          </div>

          {/* Birthday Special Section */}
          <motion.div
            className="birthday-special"
            initial={{opacity: 0, scale: 0.8, y: 100}}
            whileInView={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            viewport={{once: true, amount: 0.3}}
            transition={{
              duration: 1.2,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            <motion.h2
              className="glowing-text"
              initial={{opacity: 0, scale: 0.5}}
              whileInView={{opacity: 1, scale: 1}}
              viewport={{once: true}}
              transition={{delay: 0.3, duration: 0.8}}
            >
              Love You Mansi! 💖
            </motion.h2>
            <motion.p
              className="final-subtitle"
              initial={{opacity: 0, y: 30}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true}}
              transition={{delay: 0.6, duration: 0.8}}
            >
              Forever and Always, Your Atharva ❤️
            </motion.p>
            <motion.div
              className="birthday-wishes"
              initial={{opacity: 0, scale: 0.9}}
              whileInView={{opacity: 1, scale: 1}}
              viewport={{once: true}}
              transition={{delay: 0.9, duration: 0.8}}
            >
              <p>May all your dreams come true, my beautiful Mansi! 🌟✨</p>
            </motion.div>
          </motion.div>

          {/* FOOTER */}
          <div
            className="love-footer"
            style={{
              background: "#ffffff",
              color: "#880e4f",
              padding: "40px",
              margin: "40px auto",
              borderRadius: "20px",
              textAlign: "center",
              border: "3px solid #ff6b9d",
              maxWidth: "600px",
              boxShadow: "0 10px 30px rgba(255, 107, 157, 0.3)",
              position: "relative",
              zIndex: 100,
            }}
          >
            <div className="footer-content">
              <div
                className="footer-hearts"
                style={{
                  fontSize: "2.5rem",
                  marginBottom: "20px",
                }}
              >
                💕💖💕
              </div>

              <h3
                style={{
                  fontSize: "1.8rem",
                  color: "#880e4f",
                  marginBottom: "20px",
                  fontFamily: "'Brush Script MT', cursive",
                  fontWeight: "bold",
                }}
              >
                Happy Birthday My Love!
              </h3>

              <div
                className="footer-date"
                style={{
                  margin: "20px 0",
                  padding: "15px",
                  background: "rgba(255, 107, 157, 0.1)",
                  borderRadius: "15px",
                  border: "1px solid rgba(255, 107, 157, 0.3)",
                }}
              >
                <p
                  style={{
                    color: "#ad1457",
                    fontSize: "1rem",
                    margin: "8px 0",
                    fontWeight: "600",
                  }}
                >
                  🎂 Special Birthday Message for Mansi 🎂
                </p>
                <p
                  className="date"
                  style={{
                    color: "#c2185b",
                    fontSize: "0.9rem",
                    fontWeight: "500",
                  }}
                >
                  💖 From Your Loving Atharva 💖
                </p>
                <p
                  className="date"
                  style={{
                    color: "#c2185b",
                    fontSize: "0.9rem",
                    fontWeight: "500",
                  }}
                >
                  ✨ 17 September ✨
                </p>
              </div>

              <p
                className="footer-sparkles"
                style={{
                  fontSize: "1.2rem",
                  color: "#880e4f",
                  marginTop: "20px",
                  fontStyle: "italic",
                  fontWeight: "700",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                }}
              >
                You Make Every Day Magical! ✨🌟✨
              </p>
            </div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        {scrollY < 100 && (
          <motion.div
            className="scroll-indicator"
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{delay: 3, duration: 0.8}}
          >
            <motion.div
              className="scroll-arrow"
              animate={{y: [0, 10, 0]}}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              ⬇️
            </motion.div>
            <p>Scroll for more love messages</p>
          </motion.div>
        )}
      </div>
    </>
  );
};

export default App;
