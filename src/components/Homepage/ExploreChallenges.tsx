import Cards from "./Cards";
import SearchInput from "./SearchInput";

export default function ExploreChallenges() {
  return (
    <div className="w-full  ">
      <div className=" min-h-[324px] w-full p-6 sm:p-8 md:p-12 lg:p-16 text-white bg-[#002A3B] flex flex-col justify-center items-center ">
        <div className=" w-full max-w-[1280px] flex flex-col justify-between items-center gap-8  ">
          <h1 className=" w-full text-center font-bold text-3xl ">
            Explore Challenges
          </h1>
          <div className=" w-full flex justify-center items-center gap-8 ">
            <SearchInput />
          </div>
        </div>
      </div>
      <div className=" w-full min-h-screen  grid place-items-center  bg-[#003145] ">
        <div className=" w-full max-w-[1280px] grid place-items-center p-6 sm:p-8 md:p-12 lg:p-16  ">
          <Cards />
        </div>
      </div>
    </div>
  );
}
