const Header = () => {
  return (
    <div className="flex justify-between items-center">
      <h1 className="dm-serif text-3xl">Worldwide Health Survery</h1>
      {/* timer */}
      <div className="shrink-0 h-14 w-14 flex items-center justify-center text-2xl font-bold border-2 border-dashed border-black rounded-full">
        46
      </div>
    </div>
  );
};

export default Header;
