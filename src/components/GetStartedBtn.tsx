import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { useState } from "react";

const GetStartedBtn = () => {
  const initialtext = "Get Started 🚀";
  const hovertext = "NOW";
  const [text, setText] = useState<string>(initialtext);

  const variantFromLeft = {
    // slide right
    initial: {
      opacity: 0,
      x: -40,
    },
    final: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        mass: 0.35,
        // damping: 8,
        stiffness: 100,
      },
    },
  };

  const variantFromRight = {
    // slide left
    initial: {
      opacity: 0,
      x: 40,
    },
    final: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        mass: 0.35,
        // damping: 8,
        stiffness: 100,
      },
    },
  };

  return (
    <>
      <Link to={"/creation"} className="font-bold rounded-lg mt-4">
        <Button
          className="rounded-lg px-12 py-6 w-40 flex items-center justify-center"
          style={{
            boxShadow: "2px 2px 0 white",
          }}
        >
          <motion.span
            variants={text === hovertext ? variantFromLeft : variantFromRight}
            initial="initial"
            animate="final"
            key={text}
            onHoverStart={() => setText(hovertext)}
            onHoverEnd={() => setText(initialtext)}
          >
            {text}
          </motion.span>
        </Button>
      </Link>
    </>
  );
};

export default GetStartedBtn;
