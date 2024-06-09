const Option = ({ option, number }: { option: string; number: string }) => {
  return (
    <div className="px-2 lg:px-6 py-2 lg:py-4 rounded-lg border-2 border-blue/40 text-blue font-bold flex items-center">
      <span className="mr-4 rounded-full h-8 lg:h-12 w-8 lg:w-12 flex items-center justify-center bg-blue/20">
        {number}
      </span>
      {option}
    </div>
  );
};

export default Option;
