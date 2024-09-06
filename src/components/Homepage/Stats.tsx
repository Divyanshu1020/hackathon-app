import { icons } from "../ui/assets";

interface StatItemProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  className?: string;
}

export default function Stats() {
  return (
    <div className=" w-full md:min-h-[200px] min-h-[100px] flex items-center justify-center md:py-8  bg-[#002A3B]">
      <div className=" w-full max-w-[1280px] flex flex-wrap justify-between items-center px-16 space-y-6 md:space-y-0 md:space-x-6">
        <StatItem
          icon={<img src={icons.cpu} alt="CPU" className="" />}
          value="100K+"
          label="AI model submissions"
        />
        <div className="hidden md:block w-px h-10 bg-[#C4C4C4]" />
        <StatItem
          icon={<img src={icons.user} alt="USERS" className="" />}
          value="50K+"
          label="Data Scientists"
        />
        <div className="hidden md:block w-px h-10 bg-[#C4C4C4]" />
        <StatItem
          icon={<img src={icons.trophy} alt="TROPHY" className="" />}
          value="100+"
          label="AI Challenges hosted"
        />
      </div>
    </div>
  );
}

function StatItem({ icon, value, label }: StatItemProps) {
  return (
    <div className="flex items-center space-x-4">
      <div className=" p-3 rounded-lg">{icon}</div>
      <div>
        <p className="text-2xl font-semibold text-white">{value}</p>
        <p className="text-sm font-semibold text-gray-400">{label}</p>
      </div>
    </div>
  );
}
