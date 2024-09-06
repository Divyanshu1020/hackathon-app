import { Link } from "react-router-dom";
import { icons } from "../ui/assets";
export default function HeroSection() {
  return (
    <div className=" w-full min-h-[calc(100vh-64px)] flex items-center justify-center p-4 bg-[#003145] ">
      <div className="max-w-[1280px] w-full flex flex-col md:flex-row items-center justify-around">
        <div className="flex justify-start items-start gap-8 w-full h-full ">
          <div className="w-3 h-[124px] bg-[#FFCE5C]  hidden md:block place-self-start "></div>
          <div className="text-white max-w-xl w-full flex flex-col justify-between items-center md:items-start gap-4 h-full ">
            <h1 className="text-3xl md:text-5xl font-semibold mb-4 w-full text-nowrap leading-loose  ">
              Accelerate Innovation <br /> with Global AI Challenges
            </h1>
            <p className="text-gray-300 mb-6 leading-relaxed ">
              AI Challenges at DPhi simulate real-world problems. It is a great
              place to put your AI/Data Science skills to test on diverse
              datasets allowing you to foster learning through competitions.
            </p>
            <button className="bg-white text-primary hover:bg-gray-200 transition-colors rounded-lg p-3 px-6 font-semibold  ">
              <Link to="/hackathon/create">Create Challenge</Link>
            </button>
          </div>
        </div>
        <div className="w-full max-w-[200px] md:max-w-[400px]">
          <img src={icons.rocket} alt="rocketimg" className=" w-[400px] h-full " />
        </div>
      </div>
    </div>
  );
}
