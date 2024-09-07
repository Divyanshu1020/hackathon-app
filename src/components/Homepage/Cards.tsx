import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import clock from "../../assets/icons/clock.png";

import { RootState } from "@/redux/store";
import { Hackathon } from "@/types/staticData";
import { useSelector } from "react-redux";

const statusColors: Record<"Upcoming" | "Active" | "Past", string> = {
  Upcoming: "bg-yellow-200 text-yellow-800",
  Active: "bg-green-200 text-green-800",
  Past: "bg-red-200 text-red-800",
};

function formatTime(time: number) {
  return time.toString().padStart(2, "0");
}

function Timer({ targetDate }: { targetDate: Date }) {
  const [timeLeft, setTimeLeft] = useState(targetDate.getTime() - Date.now());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(targetDate.getTime() - Date.now());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  return (
    <div className="font-bold text-lg ">
      {formatTime(days)} : {formatTime(hours)} : {formatTime(minutes)} :{" "}
      {formatTime(seconds)}
    </div>
  );
}

function getImageSrc(image: string | File | undefined): string | undefined {
  if (typeof image === "string") {
    return image;
  } else if (image instanceof File) {
    return URL.createObjectURL(image);
  }
  return undefined;
}

function determineStatus(event: Hackathon) {
  const now = new Date();
  if (event.startDate && event.endDate) {
    if (now < event.startDate) return "Upcoming";
    if (now >= event.startDate && now <= event.endDate) return "Active";
    if (now > event.endDate) return "Past";
  } else if (event.endDate && now > event.endDate) {
    return "Past";
  }
  return "Upcoming"; // Fallback status if dates are missing
}

export default function Cards() {
  const { hackathons, filter, sortOrder } = useSelector(
    (state: RootState) => state.hackathons
  );

  const filteredAndSortedHackathons = hackathons
  .filter(hackathon => {
    const matchesLevel = filter.level.length === 0 || filter.level.includes(hackathon.level);
    const matchesStatus = filter.status.length === 0 || filter.status.includes(hackathon.status);
    const matchesSearch = hackathon.name.toLowerCase().includes(filter.search.toLowerCase());
    return matchesLevel && matchesStatus && matchesSearch;
  })
  .sort((a, b) => {
    if (sortOrder === 'Newest') {
      return new Date(b.startDate ?? "").getTime() - new Date(a.startDate ?? "").getTime();
    } else {
      return new Date(a.startDate ?? "").getTime() - new Date(b.startDate ?? "").getTime();
    }
  });

  return (
    <div className=" w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full ">
        {filteredAndSortedHackathons.map((event: Hackathon) => {
          const status = determineStatus(event);
          return (
            <Card key={event.id} className=" flex flex-col overflow-hidden">
              <CardHeader className="p-0">
                <img
                  src={getImageSrc(event.image)}
                  alt={event.name}
                  className="w-full h-48 object-cover"
                />
              </CardHeader>
              <CardContent className="p-4 text-center flex-1 flex flex-col justify-around">
                <div className="flex justify-center mb-2">
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded ${
                      statusColors[status as "Upcoming" | "Active" | "Past"]
                    }`}
                  >
                    {status}
                  </span>
                </div>
                <h3 className="text-lg line-clamp-2 font-semibold mb-2">
                  {event.name}
                </h3>
                {status === "Upcoming" && event.startDate && (
                  <div className="text-sm text-[#4F4F4F] ">
                    Starts in
                    <Timer targetDate={event.startDate} />
                    <div className="text-xs font-semibold text-[#4F4F4F] flex justify-center items-center gap-4 mt-1">
                      <span>Days</span>
                      <span>Hours</span>
                      <span>Mins</span>
                      <span>Secs</span>
                    </div>
                  </div>
                )}
                {status === "Active" && event.endDate && (
                  <div className="text-sm text-gray-600">
                    Ends in
                    <Timer targetDate={event.endDate} />
                    <div className="text-xs font-semibold text-[#4F4F4F] flex justify-center items-center gap-4 mt-1">
                      <span>Days</span>
                      <span>Hours</span>
                      <span>Mins</span>
                      <span>Secs</span>
                    </div>
                  </div>
                )}
                {status === "Past" && event.endDate && (
                  <div className="text-sm text-[#4F4F4F] ">
                    Ended on
                    <div className="font-bold text-lg ">
                      {event.endDate.toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "short",
                        year: "2-digit",
                      })}{" "}
                      {event.endDate.toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className=" mt-auto">
                <Button className=" mx-auto bg-[#44924C] hover:bg-[#397c3f] text-white py-4 px-2 ">
                  <Link
                    to={`/hackathon/${event.id}/details`}
                    className="  flex justify-center items-center gap-4  "
                  >
                    <img src={clock} alt="icon" />
                    Participate Now
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
      {filteredAndSortedHackathons.length === 0 && (
        <div className="flex justify-center items-center w-full h-full">
          <p className=" text-center text-4xl text-white font-semibold">
            No hackathons found
          </p>
        </div>
      )}
    </div>
  );
}
