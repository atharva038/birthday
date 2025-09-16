import React, {useState, useEffect, useRef} from "react";
import {motion} from "framer-motion";
import "../styles/Message.css";

const Message = ({text, delay, index, totalMessages}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [startTyping, setStartTyping] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [typingComplete, setTypingComplete] = useState(false);
  const messageRef = useRef(null);

  // Intersection Observer for scroll-triggered storytelling
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isInView) {
          setIsInView(true);
        }
      },
      {
        threshold: 0.3, // Trigger when 30% of message is visible
        rootMargin: "0px 0px -100px 0px", // Trigger a bit before fully visible
      }
    );

    if (messageRef.current) {
      observer.observe(messageRef.current);
    }

    return () => {
      if (messageRef.current) {
        observer.unobserve(messageRef.current);
      }
    };
  }, [isInView]);

  // Sequential storytelling - start animation when in view
  useEffect(() => {
    if (!isInView) return;

    // Immediate reveal when scrolled into view
    const revealTimer = setTimeout(() => {
      setIsVisible(true);

      // Start typing after brief pause for dramatic effect
      const typingTimer = setTimeout(() => {
        setStartTyping(true);
      }, 300);

      return () => clearTimeout(typingTimer);
    }, 100); // Minimal delay for immediate storytelling

    return () => clearTimeout(revealTimer);
  }, [isInView]);

  // Enhanced typewriter effect for storytelling
  useEffect(() => {
    if (!startTyping) return;

    let currentIndex = 0;
    const typeInterval = setInterval(() => {
      if (currentIndex <= text.length) {
        setDisplayedText(text.slice(0, currentIndex));
        currentIndex++;

        // Complete typing when done
        if (currentIndex > text.length) {
          setTypingComplete(true);
        }
      } else {
        clearInterval(typeInterval);
      }
    }, getTypingSpeed(currentIndex, text));

    return () => clearInterval(typeInterval);
  }, [startTyping, text]);

  // Storytelling typing speed - slower for dramatic effect
  const getTypingSpeed = (index, text) => {
    const char = text[index];

    // Dramatic pauses for punctuation
    if ([".", "!", "?"].includes(char)) {
      return 400; // Longer pause for sentences
    }
    if ([",", ";", ":"].includes(char)) {
      return 200; // Medium pause for commas
    }
    // Pause after ellipsis for suspense
    if (char === " " && text.slice(index - 3, index) === "...") {
      return 600; // Long dramatic pause
    }
    // Natural reading speed variation
    return Math.random() * 30 + 50; // 50-80ms for comfortable reading
  };

  // Updated 10-chapter titles extracted from your messages
  const getChapterTitle = (index) => {
    const titles = [
      "The Beginning", // Chapter 1
      "Your Special Day", // Chapter 2
      "Dreams & Reality", // Chapter 3
      "My Mistakes", // Chapter 4
      "Trust & Understanding", // Chapter 5
      "A Little Cheesiness", // Chapter 6
      "Gratitude", // Chapter 7
      "Our Forever", // Chapter 8
      "My Conditional Promise", // Chapter 9
      "The Truth That Never Changes", // Final Chapter
    ];
    return titles[index] || "Our Story";
  };

  // Updated 10-chapter emojis extracted from your messages
  const getChapterEmoji = (index) => {
    const emojis = [
      "🌸", // Chapter 1 - The Beginning
      "🎂🎉", // Chapter 2 - Your Special Day
      "🎓✨", // Chapter 3 - Dreams & Reality
      "💔🙏", // Chapter 4 - My Mistakes
      "🤝❤️", // Chapter 5 - Trust & Understanding
      "😘💕", // Chapter 6 - A Little Cheesiness
      "🌹", // Chapter 7 - Gratitude
      "🕰️❤️", // Chapter 8 - Our Forever
      "🌈🤞", // Chapter 9 - My Conditional Promise
      "💖", // Final Chapter - The Truth That Never Changes
    ];
    return emojis[index] || "💕";
  };

  // Fixed animation variants with consistent box-shadow format
  const messageVariants = {
    hidden: {
      opacity: 0,
      y: 80,
      scale: 0.9,
      filter: "blur(8px)",
      // FIXED: Use consistent box-shadow format
      boxShadow: "0px 10px 30px 0px rgba(255, 107, 157, 0.05)",
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      // FIXED: Consistent format for animation target
      boxShadow: "0px 20px 60px 0px rgba(255, 107, 157, 0.15)",
      transition: {
        duration: 1,
        ease: [0.25, 0.46, 0.45, 0.94],
        type: "spring",
        stiffness: 80,
        damping: 15,
      },
    },
  };

  const contentVariants = {
    hidden: {opacity: 0, scale: 0.95},
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.2,
        duration: 0.6,
      },
    },
  };

  return (
    <motion.div
      ref={messageRef}
      className={`story-message ${isVisible ? "visible" : ""} ${
        typingComplete ? "typing-complete" : ""
      } ${index === 0 ? "first-story" : ""} ${
        index === totalMessages - 1 ? "final-story" : ""
      }`}
      variants={messageVariants}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      whileHover={{
        scale: 1.02,
        // FIXED: Consistent box-shadow format for hover
        boxShadow: "0px 25px 70px 0px rgba(255, 107, 157, 0.25)",
        transition: {duration: 0.4},
      }}
      style={{
        // Make messages much bigger and more prominent
        minHeight:
          index === 0 || index === totalMessages - 1 ? "200px" : "160px",
        marginBottom: "80px", // More space between story messages
      }}
    >
      <motion.div
        className="story-content"
        variants={contentVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
      >
        {/* Story chapter indicator */}
        <motion.div
          className="story-chapter"
          initial={{opacity: 0, scale: 0, y: -20}}
          animate={isVisible ? {opacity: 1, scale: 1, y: 0} : {}}
          transition={{delay: 0.3, duration: 0.5}}
        >
          <span className="chapter-number">
            {index === totalMessages - 1
              ? "Final Chapter"
              : `Chapter ${index + 1}`}{" "}
            {getChapterEmoji(index)}
          </span>
          <span className="chapter-subtitle">{getChapterTitle(index)}</span>
        </motion.div>

        {/* Special decoration for first story */}
        {index === 0 && (
          <motion.div
            className="story-opening"
            initial={{opacity: 0, scale: 0, rotate: -180}}
            animate={isVisible ? {opacity: 1, scale: 1, rotate: 0} : {}}
            transition={{delay: 0.6, duration: 0.8}}
          >
            📖✨
          </motion.div>
        )}

        {/* Big story text container */}
        <div className="story-text-container">
          <div className="story-quote-mark opening">"</div>
          <span className="story-text">{displayedText}</span>
          <div className="story-quote-mark closing">"</div>

          {/* Enhanced animated cursor for storytelling */}
          {startTyping && !typingComplete && (
            <motion.span
              className="story-cursor"
              animate={{
                opacity: [1, 0],
                scaleY: [1, 0.8, 1],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            >
              |
            </motion.span>
          )}
        </div>

        {/* Story completion heart - Updated for 10 chapters */}
        <motion.div
          className="story-heart"
          initial={{opacity: 0, scale: 0, rotate: -180}}
          animate={
            typingComplete
              ? {
                  opacity: 1,
                  scale: [0, 1.4, 1],
                  rotate: [0, 15, -15, 0],
                }
              : {}
          }
          transition={{
            delay: 0.3,
            duration: 1,
            type: "spring",
            stiffness: 150,
          }}
        >
          {index === 0 && "💫🌸"}
          {index === 1 && "🎂👑"}
          {index === 2 && "🎓🏡"}
          {index === 3 && "🙏💗"}
          {index === 4 && "💍👩‍❤️‍👨"}
          {index === 5 && "✨⏸️"}
          {index === 6 && "🤗🌍"}
          {index === 7 && "🥂📖"}
          {index === 8 && "🤝✍️"}
          {index === 9 && "❤️✨"}
        </motion.div>

        {/* Special decoration for final story */}
        {index === totalMessages - 1 && (
          <motion.div
            className="story-finale"
            initial={{opacity: 0, scale: 0, y: 20}}
            animate={
              typingComplete
                ? {
                    opacity: 1,
                    scale: [0, 1.3, 1],
                    y: 0,
                  }
                : {}
            }
            transition={{delay: 1, duration: 1.2}}
          >
            <div className="finale-text">Forever & Always! 💖</div>
            <div className="finale-hearts">💕💖💕</div>
          </motion.div>
        )}
      </motion.div>

      {/* Enhanced story background glow */}
      <motion.div
        className="story-background-glow"
        initial={{opacity: 0, scale: 0.9}}
        animate={
          isVisible
            ? {
                opacity: 1,
                scale: 1,
              }
            : {}
        }
        transition={{delay: 0.8, duration: 2}}
      />

      {/* Story sparkle effects */}
      {typingComplete && (
        <>
          <motion.div
            className="story-sparkle story-sparkle-1"
            initial={{opacity: 0, scale: 0}}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.2, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              delay: 0.8,
              duration: 3,
              repeat: Infinity,
              repeatDelay: 4,
            }}
          >
            ✨
          </motion.div>
          <motion.div
            className="story-sparkle story-sparkle-2"
            initial={{opacity: 0, scale: 0}}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              rotate: [0, -180, -360],
            }}
            transition={{
              delay: 1.2,
              duration: 3,
              repeat: Infinity,
              repeatDelay: 4,
            }}
          >
            ✨
          </motion.div>
        </>
      )}
    </motion.div>
  );
};

export default Message;
