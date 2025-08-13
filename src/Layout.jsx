/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import SideBar from "./components/Nav/sideBar/SideBar";
import TopNav from "./components/Nav/topNav/TopNav";

export default function Layout({ children }) {
  const [openMenu, setOpenMenu] = useState(true);
  useEffect(() => {
    const handleResize = () =>
      setOpenMenu(window.innerWidth >= 1280 ? true : false);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div>
      <TopNav />
      <div className="flex bg-darkBg relative">
        <SideBar openMenu={openMenu} setOpenMenu={setOpenMenu} />
        <div
          className={` w-screen transition-all ease-in-out duration-500 z-[10] relative ${
            openMenu ? "xl:pl-[18.5rem] md:pr-4" : "sm:pl-[5.5rem] md:pr-4 pr-0"
          }`}
        >
          <div className="lg:pl-4 pl-2 pr-5 md:pr-3 pt-1">{children}</div>
        </div>
        <div className="darkMes h-[45rem] w-[35rem]  rounded-full fixed -bottom-[20rem] -right-40 rotate-45 opacity-15"></div>
      </div>
    </div>
  );
}
