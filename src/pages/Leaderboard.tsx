import Bar from "@/components/leaderboard/Bar";

const Leaderboard = () => {
  return (
    <section className="container py-12">
      <h2 className="text-4xl font-semibold">Leaderboard🏆</h2>

      <div className="flex items-center justify-between mt-12 text-xl font-semibold">
        <h2 className="bg-blue/20 text-blue font-bold px-4 py-2 rounded-lg text-base">
          Question 01
        </h2>
        <p>56 of 75 have answered</p>
      </div>

      <h1 className="text-2xl mt-8 font-medium">
        What is the most common cause of death in the world?
      </h1>

      <div className="flex flex-col gap-1 mt-8">
        <Bar value={89} />
        <Bar value={80} />
        <Bar value={78} />
        <Bar value={75} />
        <Bar value={70} />
        <Bar value={65} />
        <Bar value={60} />
        <Bar value={55} />
        <Bar value={48} />
        <Bar value={40} />
      </div>
    </section>
  );
};

export default Leaderboard;
