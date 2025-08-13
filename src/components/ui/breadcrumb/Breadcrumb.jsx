/* eslint-disable react/prop-types */

import { Link } from 'react-router-dom';
import { IoIosArrowForward } from "react-icons/io";

const Breadcrumb = ({ items }) => {
    return (
        <ol className="flex items-center gap-2 py-2  font-medium text-sm">
            {items.map((item, index) => (
                <li className="" key={index}>
                    {index < items.length - 1 ? (
                        <div className='flex items-center gap-2'>
                            <Link to={item.path} className='hover:text-[#FE822C]'>{item.label}</Link>
                            <IoIosArrowForward className="text-black" />
                        </div>
                    ) : (
                        <span className='text-[#ee8438]'>{item.label}</span>
                    )}
                </li>
            ))}
        </ol>
    );
};

export default Breadcrumb;
