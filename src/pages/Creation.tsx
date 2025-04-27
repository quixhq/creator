import Logo from "@/components/Logo";
import Question from "@/components/Question";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { InfoIcon } from "lucide-react";
import React, { useEffect } from "react";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import "../index.css";
import CreationNav from "@/components/creation/CreationNav";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Settings from "@/components/creation/Settings";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { io, Socket } from "socket.io-client";
import { SOCKET_SERVER_URL } from "@/SocketContext";

const routeVariants = {
  // transition style: slide right
  initial: {
    opacity: 0,
    y: "-100vh",
  },
  final: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      mass: 0.35,
      damping: 8,
      stiffness: 100,
    },
  },
};

const childVariants = {
  // transition style: slide right
  initial: {
    opacity: 0,
    y: "-100vh",
  },
  final: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      mass: 0.35,
      damping: 8,
      stiffness: 100,
    },
  },
};

const driverObj = driver({
  popoverClass: "driverjs-theme",
  showProgress: true,
  steps: [
    {
      element: "#quiz-title",
      popover: {
        title: "Quiz Title✨",
        description: "Craft an irresistible title for your quiz here.",
      },
    },
    {
      element: "#add-question",
      popover: {
        title: "Add Question➕",
        description: "Click to effortlessly add a new engaging question.",
      },
    },
    {
      element: "#presentation-mode",
      popover: {
        title: "Presentation Mode🎦",
        description: "Toggle for a seamless and captivating presentation.",
      },
    },
    {
      element: "#settings",
      popover: {
        title: "Settings⚙️",
        description:
          "Customize with a click – tailor the experience effortlessly.",
      },
    },
    {
      element: "#go-live",
      popover: {
        title: "Go Live🚀",
        description: "Launch your quiz into the spotlight with just a click.",
      },
    },
  ],
});

const getQuestions = () => {
  return JSON.parse(localStorage.getItem("questions") || "[]");
};

type Question = {
  id: number;
  content: string;
};
const socket: Socket = io(SOCKET_SERVER_URL); // adjust URL as needed
const Creation = () => {
  const navigate = useNavigate();

  const [questions, setQuestions] = React.useState<Question[]>(getQuestions());
  useEffect(() => {
    setTimeout(() => {
      localStorage.getItem("tourCompleted") || driverObj.drive();
      // driverObj.drive()
      localStorage.setItem("tourCompleted", "true");
    }, 1500);
  }, []);

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }
    const items = Array.from(questions);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setQuestions(items);
  };
  useEffect(() => {
    console.log(questions);
    localStorage.setItem("questions", JSON.stringify(questions));
  }, [questions]);

  const launchQuiz = () => {
    const sessionId = "1234"; // or generate dynamically
    socket.emit("launch-quiz", { sessionId });
    // console the received sessionId
    socket.on("launch-quiz-response", (data) => {
      console.log("Quiz launched with session ID:", data.sessionId);
      localStorage.setItem("sessionId", data.sessionId);
    });
    navigate("/join");
  };
  return (
    <>
      <CreationNav />
      <motion.section
        variants={routeVariants}
        initial="initial"
        animate="final"
        className="container relative bottom-8"
      >
        <Logo variant="coloured" />
        <motion.div
          variants={childVariants}
          initial="initial"
          animate="final"
          className="flex justify-between gap-4 flex-col md:flex-row"
        >
          <form className="mt-12 w-full md:w-1/2">
            <input
              type="text"
              autoFocus
              id="quiz-title"
              placeholder="Enter quiz title"
              className="focus:outline-none text-blue dm-serif font-medium border-b-2 focus:border-b-blue border-b-blue/50 text-4xl p-2 placeholder:text-blue/70 w-11/12"
            />
            {/* ==========Questions========== */}
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="questions">
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="mt-6 flex flex-col gap-3 z-40"
                  >
                    {questions.map((div, i) => (
                      <Question key={i} index={i} title={div.content} />
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
            <Button
              type="button"
              variant={"secondary"}
              className="mt-4 w-full font-semibold"
              id="add-question"
              onClick={() =>
                setQuestions([
                  ...questions,
                  {
                    id: questions.length + 1,
                    content: `Question ${questions.length + 1}`,
                  },
                ])
              }
            >
              Add Question +
            </Button>
          </form>

          <aside className="flex flex-col gap-5 sm:sticky sm:top-12">
            {/* Start QuiX */}

            <div className="bg-cyan/30 p-4 rounded-xl border border-foreground">
              <div
                className="flex items-center gap-2 mt-2"
                id="presentation-mode"
              >
                <Switch className="w-10 h-6 data-[state=checked]:bg-black data-[state=unchecked]:bg-black/50" />
                <p>Presentation Mode</p>
                <InfoIcon className="text-slate-700" />
              </div>
              <Button
                onClick={() => {
                  launchQuiz();
                }}
                className="mt-4 w-full"
                id="go-live"
              >
                Go Live
              </Button>
            </div>
            {/* More Options */}
            <Settings />
            <Button
              onClick={() => {
                driverObj.drive();
              }}
              className="bg-blue text-white font-semibold hover:bg-blue"
            >
              Take a tour
            </Button>
          </aside>
        </motion.div>
      </motion.section>
    </>
  );
};

export default Creation;
