import "./style.css";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useEffect, useState } from "react";

const Bar = ({ value }: { value: number }) => {
  const [width, setWidth] = useState(0);
  const [score, setScore] = useState(0);
  useEffect(() => {
    setTimeout(() => {
      setWidth(value);
      setInterval(() => {
        setScore((prev) => {
          if (prev >= value) return value;
          return prev + 1;
        });
      }, 10);
    }, 1000 - value * 10);
  }, [value]);
  return (
    <div className="flex items-center gap-2">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div
        className="bar bg-blue/80 h-8 rounded-full"
        style={{ width: `${width}%` }}
      ></div>
      <span className="shrink-0 text-lg font-semibold">{score} Pts</span>
    </div>
  );
};

export default Bar;
