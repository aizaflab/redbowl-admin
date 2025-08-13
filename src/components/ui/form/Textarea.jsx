/* eslint-disable react/prop-types */
export default function Textarea({ type, id, placeholder, value, onChange, required, maxLength, minLength }) {
  return (
    <textarea
      rows={3}
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`mt-2 w-full p-[13px] rounded-md border border-gray-300 dark:border-[#60879b] outline-none bg-transparent text-[15px]`}
      required={required}
      maxLength={maxLength}
      minLength={minLength}
    />
  )
}