import Logo from "@/components/Logo";
import QR from "../assets/dummyqr.webp";
import { Button } from "@/components/ui/button";

const JoinUsers = () => {
  return (
    <>
      <section className="container py-8">
        <Logo variant="coloured" />
        <div className="flex justify-between gap-6 py-12 mt-12">
          {/* Quiz Info */}
          <div className="flex flex-col gap-3">
            <h1 className="text-6xl dm-serif">Worldwide Health Survery</h1>
            <h1 className="text-3xl dm-serif">
              <span> Quiz ID: </span>
              <span className="italic font-semibold"> 123 456 </span>
            </h1>
            <p className="text-2xl">Or scan the QR code to join</p>

            <div className="mt-8">
              <h1 className="font-medium text-5xl">43</h1>
              <p className="text-2xl">Participants joined</p>
            </div>

            <Button className="self-start text-xl mt-6">Start Now</Button>
          </div>
          {/* QR */}
          <div>
            <img src={QR} alt="qr" className="w-80 h-80" />
          </div>
        </div>
      </section>
    </>
  );
};

export default JoinUsers;
