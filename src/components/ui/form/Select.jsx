/* eslint-disable react/prop-types */
export default function Select({ id, value, onChange, options, fortext, required }) {
  return (
    <div className='relative'>
      <select
        id={id}
        value={value}
        onChange={onChange}
        className={`mt-2 w-full p-[13px] rounded-md border border-gray-300 dark:border-[#60879b] outline-none bg-transparent text-[15px] text-gray-700 dark:text-gray-400 appearance-none cursor-pointer`}
        required={required}
      >
        <option className=' cursor-pointer' value="" disabled selected >Select {fortext}</option>
        {options?.map((option, index) => (
          <option className=' cursor-pointer leading-[5rem] bg-white' key={index} value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  )
}
