import { BackgroundLines } from "@/components/ui/background-lines";
import { Link } from "react-router";

import imageSrc from "@/assets/shin-chan-crayon-shin-chan.gif";

export default function MainPage() {
  return (
    <main className="bg-black overflow-hidden cursor- relative">
      <BackgroundLines className="flex items-center justify-center w-full flex-col px-4">
        <div className="text-white flex flex-col gap-4">
          <div className="flex flex-col gap-0">
            <h1 className="arcivo-fonts font-bold text-[6.5vw] lg:text-[4.5vw] z-10">
              RAMADHAN PERKASA
            </h1>

            <h6 className="text-[3.5vw] lg:text-[1.5vw] font-semibold text-white/60 capitalize flex flex-row items-center gap-1">
              front end developer at -{" "}
              <h6 className="text-white/90 font-bold arcivo-fonts">PT.ASLI</h6>
            </h6>
          </div>

          <div className="flex flex-col gap-1 mt-2 lg:mt-6 z-10">
            <h6 className="text-[3vw] lg:text-[1.5vw] uppercase arcivo-fonts text-white/70 font-semibold">
              about me
            </h6>
            <p className="lg:w-187.5 text-[2.5vw] lg:text-[1vw] text-white/50">
              Hey fam, I’m a front-end dev who’s absolutely obsessed with
              design. My go-to tech stack? Oh, just a lil' React JS, TypeScript,
              Zustand, TailwindCSS, React Native, React-Hook-Form, Zod
              Validation... you get the vibe.
              <br />
              <br />
              And why should you hire me? Well, because I’m the type who thrives
              under pressure. Plus, you won’t have to waste your time hunting
              for another candidate. Trust me, I’m your guy. HAHA.
            </p>
          </div>

          <div className="flex flex-col gap-1 mt-2 lg:mt-6 z-10">
            <h6 className="text-[3vw] arcivo-fonts lg:text-[1.5vw] text-white/70 font-semibold">
              <span className="uppercase">let's connect : </span>

              <Link
                to="https://www.linkedin.com/in/ramadhan-perkasa/"
                target="_blank"
                className="text-white font-semibold hover:border-b hover:border-blue-600 transition-all duration-200 ease-linear"
              >
                LinkedIn
              </Link>
            </h6>
          </div>
        </div>
      </BackgroundLines>

      <div className="absolute bottom-20 right-10 lg:bottom-20 lg:right-20">
        <img src={imageSrc} alt="sincan" className="w-[30vw] h-[30vw] lg:w-[10vw] lg:h-[10vw] rounded-full" draggable={false} />
      </div>
    </main>
  );
}
