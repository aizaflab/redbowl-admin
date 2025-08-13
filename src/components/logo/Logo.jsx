import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
export default function Logo() {
  return (
    <div className="sm:w-72 h-full flex items-center justify-start pl-5 sm:pl-5 text-white text-2xl font-semibold font-sans">
      <Link to={"/"} className="center">
        <img src={logo} alt="logoimg" className="h-11" />
      </Link>
    </div>
  );
}
