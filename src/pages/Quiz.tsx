import Header from "@/components/quiz/Header";
import Option from "@/components/quiz/Option";

const Quiz = () => {
  return (
    <section className="container py-8">
      <Header />

      <div className="flex flex-col sm:flex-row items-start gap-2 sm:items-center justify-between mt-12 text-xl font-semibold">
        <h2 className="bg-blue/20 text-blue font-bold px-4 py-2 rounded-lg text-base">
          Question 01
        </h2>
        <p>56 of 75 have answered</p>
      </div>
      {/* Questions */}

      {/* Sample question on Health Survey  */}

      <h1 className="text-2xl lg:text-5xl mt-8 font-medium">
        What is the most common cause of death in the world?
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-8 text-lg lg:text-2xl">
        <Option number={"A"} option={"Heart Disease"} />
        <Option number={"B"} option={"Cancer"} />
        <Option number={"C"} option={"Stroke"} />
        <Option number={"D"} option={"Diabetes"} />
      </div>
    </section>
  );
};

export default Quiz;
