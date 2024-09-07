import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { icons } from "../components/ui/assets";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { useDispatch } from "react-redux";
import { deleteHackathon } from "@/redux/hackathonsSlice";

export default function DetailPage() {
  const { id } = useParams<{ id: string }>();
  const { hackathons } = useSelector((state: RootState) => state.hackathons);
  const event = hackathons.find((event) => event.id === parseInt(id as string));

  const dispatch = useDispatch();
  const naviate = useNavigate();

  if (!event) {
    return <div>Event not found</div>;
  }

  
  const handleDelete = () => {
    if (id) {
      dispatch(deleteHackathon(parseInt(id)));

      naviate("/");
    }
  };
  return (
    <div className="min-h-screen w-full bg-gray-100 flex flex-col justify-start items-center ">
      <header className="bg-[#003145] w-full flex flex-col justify-between items-start p-6">
        <div className="container  w-full max-w-[1280px]  mx-auto text-white flex flex-col justify-between items-start gap-4 py-12  ">
          <div className="flex items-center space-x-2">
            <div className="bg-yellow-500 text-black text-sm font-semibold py-2 px-4 rounded-md flex justify-center items-center gap-2 ">
              <img src={icons.tick} alt="tick" />
              Starts on {event.startDate?.toLocaleString()} (India Standard
              Time)
            </div>
          </div>
          <h1 className="mt-4 text-4xl  font-bold">{event.name}</h1>
          <p className="mt-2 text-lg font-medium text-wrap max-w-2xl ">
            {event.description}
          </p>
          <div className="mt-2 flex items-center justify-center gap-2 bg-[#F8F9FD] rounded-md px-4 py-2 ">
            <img src={icons.skill_level_basic} alt="skill" />
            <span className=" text-black ">{event.level}</span>
          </div>
        </div>
      </header>
      <main className=" mx-auto w-full h-[calc(100vh-64px)] p-6 bg-white shadow-md rounded-md ">
        <div className="flex justify-between items-center border-b pb-2 flex-wrap-reverse  w-full  md:px-24 mb-4">
          <div className="flex space-x-4">
            <button className="text-black border-b-4 border-green-600 font-bold px-2 pb-1">
              Overview
            </button>
          </div>
          <div className="flex space-x-2">
            <button className="text-white font-semibold  bg-[#44924C] py-3 px-6 rounded-md">
              <Link to={`/hackathon/${id}/edit`}>Edit</Link>
            </button>
            <AlertDialog>
              <AlertDialogTrigger className="text-[#DC1414] font-semibold border-2 border-red-600 py-3 px-6 rounded-md">Delete</AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    hackathon and remove data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
        <div className="space-y-4 max-w-2xl w-full md:px-24 ">
          <p className=" text-[#64607D] font-medium text-lg text-left w-full ">
            {event.description}
          </p>
        </div>
      </main>
    </div>
  );
}
