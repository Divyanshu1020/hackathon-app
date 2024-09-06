import { Link } from "react-router-dom";
import { icons } from "../ui/assets";

export default function Navbar() {
  return (
    <div className=" w-full min-h-16 bg-white flex justify-start items-center px-16 ">
      <Link to="/">
        <img src={icons.logo} alt="logo" className="w-16 h-16" />
      </Link>
    </div>
  );
}
