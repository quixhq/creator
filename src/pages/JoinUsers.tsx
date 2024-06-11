import Logo from "@/components/Logo";
import QR from "../assets/dummyqr.webp";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const JoinUsers = () => {
  const navigate = useNavigate();
  return (
    <>
      <section className="container py-8">
        <Logo variant="coloured" />
        <div className="flex flex-col-reverse items-center lg:flex-row justify-between gap-6 py-12 mt-12">
          {/* Quiz Info */}
          <div className="flex flex-col gap-3">
            <h1 className="text-4xl lg:text-6xl dm-serif text-center">
              Worldwide Health Survery
            </h1>
            <h1 className="text-xl lg:text-3xl dm-serif">
              <span> Quiz ID: </span>
              <span className="italic font-semibold"> 123 456 </span>
            </h1>
            <p className="text-lg lg:text-2xl">Or scan the QR code to join</p>

            <div className="mt-8">
              <h1 className="font-medium text-3xl lg:text-5xl">43</h1>
              <p className="text-lg lg:text-2xl">Participants joined</p>
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
        </div>
      </section>
    </>
  );
};

export default JoinUsers;
