import { RiUser6Fill } from "react-icons/ri";
import Logo from "../../logo/Logo";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../features/auth/authSlice";
import { AiOutlineUser, AiOutlineUserDelete } from "react-icons/ai";

export default function TopNav() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const LogoutHandel = async () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="bg-[#0B1315]  border-b border-b-[#182a2e] w-full h-[9vh] flex items-center justify-between sm:pr-10 pr-5 sticky top-0 !z-[1000]">
      <Logo />
      <div className="flex items-center gap-8 relative group  py-[14px]">
        <p className="text-white text-sm">{user?.name}</p>
        <div className="h-10 w-10 rounded-full bg-gray-200 items-center justify-center flex text-2xl text-gray-700 cursor-pointer">
          {user?.profileImage ? (
            <img src={user?.profileImage} />
          ) : (
            <RiUser6Fill />
          )}
        </div>

        {/* Dropdown menu */}
        <div className="absolute right-0 w-48 mt-[9.8rem] bg-[#0B1315] border border-[#182a2e] shadow-md rounded hidden group-hover:block z-50">
          <ul className="flex flex-col p-2">
            <Link to="/profile">
              <li className="px-4 py-2 hover:bg-[#1d3237] text-gray-0  rounded text-sm cursor-pointer flex items-center gap-3">
                <AiOutlineUser className="text-xl" /> View Profile
              </li>
            </Link>
            <li
              onClick={() => LogoutHandel()}
              className="px-4 py-2 hover:bg-[#1d3237] text-gray-0   rounded text-sm cursor-pointer flex items-center gap-3"
            >
              <AiOutlineUserDelete className="text-xl" />
              Logout
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
