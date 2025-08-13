import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { HiOutlineDocumentPlus } from "react-icons/hi2";
import { PiNotebook } from "react-icons/pi";

// Menu data
const menuItems = [
  {
    id: 1,
    name: "Categorys Manage",
    icon: <HiOutlineDocumentPlus />,
    path: "/",
  },
  {
    id: 2,
    name: "Blogs Manage",
    icon: <PiNotebook />,
    path: "/manage-blogs",
  },
];

// eslint-disable-next-line react/prop-types
export default function Menu({ openMenu }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeSubItems, setActiveSubItems] = useState();
  const [activeItem, setActiveItem] = useState("Dashboard");
  // const [activeSubItemId, setActiveSubItemId] = useState(null);

  // To hold clicked menu
  useEffect(() => {
    const matchingItem = menuItems.find(
      (item) =>
        item.path === location.pathname ||
        (item.items &&
          item.items.some((subItem) => subItem.subPath === location.pathname))
    );
    if (matchingItem) {
      setActiveItem(matchingItem.name || "");
    } else {
      setActiveItem("");
    }
  }, [location.pathname]);

  // For activating the menu
  const handleClick = (item) => {
    if (item.items) {
      if (activeSubItems === item.id) {
        setActiveSubItems(null);
      } else {
        setActiveSubItems(item.id);
      }
    } else {
      setActiveItem(item.name || item.subName);
      if (item.path) {
        navigate(item.path);
        setActiveSubItems(null);
        // setActiveSubItemId(null)
      }
    }
  };

  // CSS classes
  const baseClasses = `flex gap-4 items-center h-11 w-full sm:px-3 px-2 ani3 relative overflow-visible ${
    openMenu ? "rounded" : "rounded-md"
  }`;
  const activeColor = "bg-[#1d3237] text-white ";
  const inactiveColor = "text-gray-200 hover:bg-[#1d3237]";
  const submenuActiveColor =
    "dark:text-gray-0 text-gray-1000 dark:bg-borderColor bg-light bg-opacity-20  dark:bg-opacity-50 rounded-t rounded-b-none ";

  return (
    <div className="relative w-full h-[90vh] overflow-hidden noBar">
      <div className="relative">
        {menuItems.map((item, index) => (
          <div key={index} className="cursor-pointer relative mb-2">
            <div
              onClick={() => handleClick(item)}
              title={item.name}
              className={`${baseClasses} ${
                activeSubItems === item.id
                  ? submenuActiveColor
                  : activeItem === item.name
                  ? activeColor
                  : inactiveColor
              }`}
            >
              <div className={`text-xl ani2 absolute left-4 `}>{item.icon}</div>

              <div className="flex items-center justify-between absolute left-0 xs:pl-[54px] pl-[50px] w-full pr-2">
                <p
                  className={`font-medium transition-all ease-linear text-[14px] whitespace-nowrap ${
                    openMenu
                      ? "opacity-100 -right-0 duration-200"
                      : "opacity-0 -right-16 duration-300"
                  }`}
                >
                  {item.name}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
