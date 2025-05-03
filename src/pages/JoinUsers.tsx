import Logo from "@/components/Logo";
import QR from "../assets/dummyqr.webp";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { SOCKET_SERVER_URL } from "@/SocketContext";
import { motion } from "framer-motion";
import { useSocket } from "@/SocketContext";

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

const animateNumberVariants3 = {
  // transition style: bounce number
  initial: {
    opacity: 0,
    scale: 0.8,
    y: 20,
  },
  final: {
    opacity: 1,
    scale: 1,
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
const socket: Socket = io(SOCKET_SERVER_URL); // adjust URL as needed

const sendNextQuestion = () => {
  const sessionId = localStorage.getItem("sessionId") || "1234"; // Retrieve session ID
  const questionId = "2"; // Update to the next question ID
  const decryptionKey = Math.random().toString(36).substring(2, 15); // Generate a random key
  const timestamp = Date.now(); // Current timestamp
  socket.emit("next-question-from-creator", {
    sessionId,
    questionId,
    decryptionKey,
    timestamp, 
  });

  console.log(
    `Sent question ${questionId} with decryption key: ${decryptionKey} at ${timestamp}`
  );
};
const JoinUsers = () => {
  const navigate = useNavigate();
  const [usersJoined, setUsersJoined] = useState(0);
  const { socket } = useSocket(); // Access the socket instance from the context
  useEffect(() => {
    if (socket) {
      socket.on("user-joined", (data) => {
        console.log("New user joined:", data);
        setUsersJoined((prevCount) => prevCount + 1); // Increment the number of users
      });

      // Cleanup listener on component unmount
      return () => {
        socket.off("user-joined");
      };
    }
  }, [socket]);

  return (
    <>
      <motion.section
        variants={routeVariants}
        initial="initial"
        animate="final"
        className="container py-8"
      >
        <Logo variant="coloured" />
        <motion.div
          variants={childVariants}
          initial="initial"
          animate="final"
          className="flex flex-col-reverse items-center lg:flex-row justify-between gap-6 py-12 mt-12"
        >
          {/* Quiz Info */}
          <div className="flex flex-col gap-3">
            <h1 className="text-4xl lg:text-6xl dm-serif text-center">
              Worldwide Health Survery
            </h1>
            <h1 className="text-xl lg:text-3xl dm-serif">
              <span> Quiz ID: </span>
              <span className="italic font-semibold">
                {localStorage.getItem("sessionId")
                  ? localStorage.getItem("sessionId")
                  : "XXXX-XXXX"}
              </span>
            </h1>
            <p className="text-lg lg:text-2xl">Or scan the QR code to join</p>

            <div className="mt-8">
              <motion.h1
                variants={animateNumberVariants3}
                initial="initial"
                animate="final"
                key={usersJoined}
                className="font-medium text-6xl mb-2 dm-serif inline-block"
              >
                {usersJoined}
              </motion.h1>
              <p className="text-2xl">Participants joined</p>
            </div>

            <Button
              className="self-start text-xl mt-6"
              onClick={() => {
                navigate("/quiz");
              }}
            >
              Start Now
            </Button>
          </div>
          {/* QR */}
          <div className="shrink-0">
            <img src={QR} alt="qr" className="w-64 lg:w-80 h-6w-64 lg:h-80" />
          </div>
        </motion.div>
      </motion.section>
      <Button
        onClick={sendNextQuestion}
        className="mt-4 w-full bg-green-500 text-white font-semibold hover:bg-green-600"
      >
        Send Next Question
      </Button>
    </>
  );
};

export default JoinUsers;
