import Header from "@/components/quiz/Header";
import Option from "@/components/quiz/Option";
import { useEffect, useState } from "react";
import Leaderboard from "./Leaderboard";

const questionsList = [
  {
    question: "What is the most common cause of death in the world?",
    options: ["Heart Disease", "Cancer", "Stroke", "Diabetes"],
    correctOption: 0,
  },
  {
    question: "How many bones are in the human body?",
    options: ["206", "203", "200", "209"],
    correctOption: 2,
  },
  {
    question: "What is the largest organ in the human body?",
    options: ["Skin", "Heart", "Liver", "Kidney"],
    correctOption: 1,
  },
  {
    question: "What is the powerhouse of the cell?",
    options: ["Mitochondria", "Nucleus", "Ribosome", "Endoplasmic Reticulum"],
    correctOption: 0,
  },
];

const Quiz = () => {
  const [time, setTime] = useState<number>(30);
  const [questions, setQuestions] = useState<any[]>(questionsList);
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState<number>(0);
  const [showLeaderboard, setShowLeaderboard] = useState<boolean>(false);
  // sample questions array

  // simulate timer
  const timer = setTimeout(() => {
    setTime(time - 1);
  }, 1000);

  useEffect(() => {
    if (time === 0) {
      clearTimeout(timer);
      // move to the next question
      if (currentQuestionNumber !== questions.length - 1) {
        setCurrentQuestionNumber(currentQuestionNumber + 1);
      }
      setTime(30);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [time, currentQuestionNumber]);

  // handle key press
  const handleKeyPress = (e: any) => {
    setShowLeaderboard(false);
    if (e.key === "Enter") {
      if (currentQuestionNumber !== questions.length - 1) {
        setCurrentQuestionNumber(currentQuestionNumber + 1);
      } else {
        setShowLeaderboard(true);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    setTime(30);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [currentQuestionNumber]);

  return (
    <>
      {showLeaderboard ? (
        <Leaderboard />
      ) : (
        <section className="container py-8 h-screen relative">
          <Header time={time} />

          <div className="flex flex-col sm:flex-row items-start gap-2 sm:items-center justify-between mt-12 text-xl font-semibold">
            <h2 className="bg-blue/20 text-blue font-bold px-4 py-2 rounded-lg text-base">
              Question {currentQuestionNumber + 1}
            </h2>
            <p>56 of 75 have answered</p>
          </div>
          {/* Questions */}

          {/* Sample question on Health Survey  */}
          <div key={currentQuestionNumber} className="animate-question">
            <h1 className="text-2xl lg:text-5xl mt-8 font-medium">
              {questions[currentQuestionNumber].question}
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-8 text-lg lg:text-2xl">
              {questions[currentQuestionNumber].options.map(
                (option: string, index: number) => (
                  <Option
                    key={index}
                    option={option}
                    number={(index + 1).toString()}
                  />
                )
              )}
            </div>
          </div>

          <div className="absolute right-4 bottom-4">
            <p>
              <button
                onClick={() => setShowLeaderboard(true)}
                className="text-blue/75 hover:text-blue font-semibold underline underline-offset-3 px-4 py-1 rounded-lg mt-2"
              >
                Show Leaderboard
              </button>
            </p>
          </div>
        </section>
      )}

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
        {currentQuestionNumber === questions.length - 1 ? (
          <p className="text-lg">
            End of the Quiz. Press <span className="font-bold">Enter</span> for
            Leaderboard
          </p>
        ) : (
          <p className="text-lg">
            Press <span className="font-bold">Enter</span> for next question
          </p>
        )}
      </div>
    </>
  );
};

export default Quiz;
