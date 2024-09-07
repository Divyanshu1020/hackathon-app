import { cardImage } from "@/components/ui/assets";
import { Hackathon } from "@/types/staticData";

export const hackathons: Hackathon[] = [
  {
    id: 1725578697013,
    image: `${cardImage.one}`,
    status: "Upcoming",
    name: "Data Science Bootcamp - Graded Datathon",
    startDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // starts in 24 hours
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // ends in 7 days
    level: "Medium",
    description:
      "Join the Data Science Bootcamp and participate in a graded datathon to test your skills in real-world scenarios.",
  },
  {
    id: 2,
    image: `${cardImage.two}`,
    status: "Upcoming",
    name: "Data Sprint 72 - Butterfly Identification",
    startDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // starts in 3 days
    endDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // ends in 10 days
    level: "Easy",
    description:
      "Identify different species of butterflies in this beginner-friendly data sprint focused on image recognition.",
  },
  {
    id: 3,
    image: `${cardImage.three}`,
    status: "Active",
    name: "Data Sprint 71 - Weather Recognition",
    startDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // started 2 days ago
    endDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // ends in 1 day
    level: "Medium",
    description:
      "Predict weather conditions using historical data in this challenging and exciting data sprint.",
  },
  {
    id: 4,
    image: `${cardImage.four}`,
    status: "Active",
    name: "Data Sprint 70 - Airline Passenger Satisfaction",
    startDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // started 1 day ago
    endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // ends in 3 days
    level: "Hard",
    description:
      "Analyze factors affecting airline passenger satisfaction in this advanced-level data sprint.",
  },
  {
    id: 5,
    image: `${cardImage.five}`,
    status: "Past",
    name: "Engineering Graduates Employment Outcomes",
    startDate: new Date("2022-05-01T09:00:00"), // started in the past
    endDate: new Date("2022-05-16T21:00:00"), // ended in the past
    level: "Medium",
    description:
      "Explore employment outcomes for engineering graduates in this past data sprint focused on career analytics.",
  },
  {
    id: 6,
    image: `${cardImage.six}`,
    status: "Past",
    name: "Travel Insurance Claim Prediction",
    startDate: new Date("2022-04-10T09:00:00"), // started in the past
    endDate: new Date("2022-05-10T21:00:00"), // ended in the past
    level: "Easy",
    description:
      "Predict travel insurance claims in this beginner-level challenge using historical claim data.",
  },
];

// const Status = ["Upcoming", "Active", "Past"];
// const Level = ["Easy", "Medium", "Hard"];

export const filterSelectOptions = [
  {
    heading: "Status",
    options: ["Active", "Upcoming",  "Past"],
  },
  {
    heading: "Level",
    options: ["Easy", "Medium", "Hard"],
  },
];

export const sortSelectOptions = [ "Newest", "Oldest"];
