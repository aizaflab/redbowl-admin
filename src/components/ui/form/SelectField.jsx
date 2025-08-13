/* eslint-disable react/prop-types */
import { IoIosArrowDown } from 'react-icons/io'

export default function SelectField({ id, value, onChange, options, fortext, required }) {
    return (
        <div className='relative'>
            <select id={id} value={value} onChange={onChange}
                className={`mt-2 w-full p-[13px] rounded-md border border-gray-300 outline-none bg-transparent text-[15px] text-gray-700 appearance-none cursor-pointer`}
                required={required}
            >
                {required && <option className='cursor-pointer' value="" disabled selected >Select {fortext}</option>}
                {options?.map((option, index) => (
                    <option className='cursor-pointer' key={index} value={option.value}>{option.label}</option>
                ))}

            </select>
            <div className='absolute right-3 top-[26px] text text-gray-500'>
                <IoIosArrowDown />
            </div>
        </div>
    )
}
