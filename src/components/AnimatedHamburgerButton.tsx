import { useState } from "react";
import { MotionConfig, motion } from "framer-motion";

export const Example = ({ handleClick }) => {
  return (
    <div className="grid h-screen place-content-center bg-gradient-to-br from-violet-500 to-indigo-500" onClick={handleClick}>
      <AnimatedHamburgerButton handleClick={handleClick} />
    </div>
  );
};

const AnimatedHamburgerButton = ({ handleClick }) => {
  const [active, setActive] = useState(false);

  const onButtonClick = () => {
    setActive((pv) => !pv);
    handleClick();
  };

  return (
    <MotionConfig
      transition={{
        duration: 0.5,
        ease: "easeInOut",
      }}
    >
      <motion.button
        initial={false}
        animate={active ? "open" : "closed"}
        // onClick={() => setActive((pv) => !pv)}
        onClick={onButtonClick}
        className="relative h-12 w-12 rounded-full transition-colors "
      >
        <motion.span
          variants={VARIANTS.top}
          className="absolute h-1 w-9 bg-lightGreen"
          style={{ y: "-50%", left: "50%", x: "-50%", top: "35%" }}
        />
        <motion.span
          variants={VARIANTS.middle}
          className="absolute h-1 w-9 bg-lightGreen"
          style={{ left: "50%", x: "-50%", top: "50%", y: "-50%" }}
        />
        <motion.span
          variants={VARIANTS.bottom}
          className="absolute h-1 w-4 bg-lightGreen"
          style={{
            x: "-50%",
            y: "50%",
            bottom: "35%",
            left: "calc(50% + 10px)",
          }}
        />
      </motion.button>
    </MotionConfig>
  );
};

export default AnimatedHamburgerButton;

const VARIANTS = {
  top: {
    open: {
      rotate: ["0deg", "0deg", "45deg"],
      top: ["35%", "50%", "50%"],
    },
    closed: {
      rotate: ["45deg", "0deg", "0deg"],
      top: ["50%", "50%", "35%"],
    },
  },
  middle: {
    open: {
      rotate: ["0deg", "0deg", "-45deg"],
    },
    closed: {
      rotate: ["-45deg", "0deg", "0deg"],
    },
  },
  bottom: {
    open: {
      rotate: ["0deg", "0deg", "45deg"],
      bottom: ["35%", "50%", "50%"],
      left: "50%",
    },
    closed: {
      rotate: ["45deg", "0deg", "0deg"],
      bottom: ["50%", "50%", "35%"],
      left: "calc(50% + 10px)",
    },
  },
};