import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const Bar = ({ value }: { value: number }) => {
  return (
    <div className="flex items-center gap-2">
      <div
        className="bg-blue/80 h-8 rounded-full"
        style={{ width: `${value}%` }}
      ></div>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
  );
};

export default Bar;
