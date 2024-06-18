import { useEffect, useState } from "react";

const Header = ({ time }: { time: number }) => {
  const [spin, setSpin] = useState<number>(0);
  const [timerColor, setTimerColor] = useState<string>("black");

  useEffect(() => {
    setSpin(time * 12);
    if (time < 10) {
      setTimerColor("red");
    }
  }, [time]);

  return (
    <div className="flex justify-between items-center">
      <h1 className="dm-serif text-3xl">Worldwide Health Survery</h1>
      {/* timer */}
      <div className="relative">
        <div
          className={`shrink-0 h-14 w-14 flex items-center justify-center text-2xl border-[3.5px] border-dashed rounded-full`}
          style={{
            transform: `rotate(-${spin}deg)`,
            borderColor: `${timerColor}`,
          }}
        ></div>
        <h2
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl font-semibold"
          style={{
            color: `${timerColor}`,
            animation: `${
              time < 10 && time > 0 ? "blinker 1s linear infinite" : "none"
            }`,
          }}
        >
          {time}
        </h2>
      </div>
    </div>
  );
};

export default Header;
