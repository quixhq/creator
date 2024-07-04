import React from "react";
import Navbar from "@/components/Navbar";
import Logo from "@/components/Logo";
import { motion } from "framer-motion";
import GetStartedBtn from "@/components/GetStartedBtn";

const childVariants = {
  // transition style: pop up
  initial: {
    opacity: 0,
    scale: 0.8,
  },
  final: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      mass: 0.35,
      damping: 8,
      stiffness: 100,
    },
  },
};

const animateWords = {
  // transition style: bounce number
  initial: {
    opacity: 0,
    y: 20,
  },
  final: {
    opacity: 1,
    y: [0, -10, 5, -5, 0],
    transition: {
      type: "spring",
      mass: 0.35,
      damping: 8,
      stiffness: 100,
      y: {
        duration: 0.6,
      },
    },
  },
};

const Home = () => {
  const [active, setActive] = React.useState(1);
  const words = ["Polls", "Surveys", "Quizzes"];

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (active === 3) {
        setActive(1);
      } else {
        setActive(active + 1);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [active]);

  return (
    <section className="h-screen bg-blue relative">
      <Navbar />
      <motion.section
        variants={childVariants}
        initial="initial"
        animate="final"
        className="flex flex-col justify-center items-center gap-12 h-[calc(100vh-75px)] mx-6"
      >
        <div className="flex flex-col items-center gap-6">
          <Logo variant="funcky" />
          <p className="text-slate-200 text-4xl text-center">
            Gain valuable insights from everyone around the world with
          </p>
          <p className="text-slate-200 text-5xl text-center">
            <motion.span
              variants={animateWords}
              initial="initial"
              animate="final"
              key={active}
              className="text-peach font-bold h-[54px] overflow-clip flex flex-col self-center dm-serif"
            >
              {words[active - 1].toUpperCase()}
            </motion.span>
          </p>
        </div>

        <GetStartedBtn />
      </motion.section>
    </section>
  );
};

export default Home;
