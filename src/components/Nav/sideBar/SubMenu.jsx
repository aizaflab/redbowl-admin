/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

export default function SubMenu({ handleClick, item, activeSubItem, openMenu, activeSubItems }) {
    const navRef = useRef(null);
    const [submenuHeight, setSubmenuHeight] = useState(0);

    useEffect(() => {
        if (activeSubItems === item.id) {
            setSubmenuHeight(navRef.current?.clientHeight || 0);
        } else {
            setSubmenuHeight(0);
        }
    }, [activeSubItems, item.id]);


    return (
        <div
            className={`overflow-hidden relative pl-4 transition-all ease-linear duration-300  ${activeSubItems === item.id ? 'visible' : 'invisible'} `}
            style={{
                height: submenuHeight,
                transition: "height ease-in-out 0.3s",
            }}
        >
            <div ref={navRef} className="flex flex-col gap-2">
                {item?.items?.map((subItem, subIndex) => (
                    <Link
                        key={subIndex}
                        to={subItem.subPath}
                        onClick={() => handleClick(subItem)}
                        title={subItem?.subName}
                        className={`flex gap-4 items-center h-10 px-4 rounded transition-all ease-linear duration-300  ${activeSubItem === subItem.subId ? 'bg-emerald-100 text-black' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
                    >
                        {subItem.icon && <div className={`text-xl ${openMenu ? '' : '-ml-1'}`}>{subItem.icon}</div>}
                        <span className={`font-medium transition-all ease-linear text-sm  ${openMenu ? 'visible opacity-100 -right-0 duration-300 delay-300' : 'invisible opacity-0 absolute -right-40 duration-300  '}`}>{subItem.subName}</span>
                    </Link>
                ))}
            </div>

        </div>
    );
}
