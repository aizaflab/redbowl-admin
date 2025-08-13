/* eslint-disable react/prop-types */
import Menu from "./Menu";
import { IoIosArrowForward } from "react-icons/io";

export default function SideBar({ openMenu, setOpenMenu }) {
  return (
    <div className="relative !z-[1000] ">
      <div
        onClick={() => setOpenMenu(false)}
        className={` bg-bg-[#090211] bg-opacity-25 w-screen min-h-[91vh] sm:hidden transition-all ease-in-out duration-500 fixed bottom-0   ${
          openMenu ? " visible  opacity-100" : "invisible opacity-0"
        }`}
      ></div>
      <div
        className={`fixed bottom-0 h-[91vh]  bg-[#0B1315]  border-r border-r-[#182a2e]  transition-all ease-in-out duration-500 scrollbar scroll-smooth ${
          openMenu
            ? " sm:w-[17.4rem] w-64 p-5 -left-0 sm:left-0"
            : "sm:w-[4.5rem] -left-20 sm:left-0 px-2 py-5"
        }`}
      >
        <div className=" relative">
          <Menu openMenu={openMenu} />
          <div
            onClick={() => setOpenMenu(!openMenu)}
            className={`h-8 w-8 border border-[#182a2e] cursor-pointer hover:bg-[#182a2e] flex items-center justify-center rounded text-xl absolute -top-5 transition-all ease-in-out duration-500 text-gray-0   ${
              openMenu ? " -right-[3.3rem] " : " -right-10 "
            } `}
          >
            <IoIosArrowForward className={`${openMenu ? "rotate-180" : ""}`} />
          </div>
        </div>
      </div>
    </div>
  );
}
