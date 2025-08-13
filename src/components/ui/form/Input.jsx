/* eslint-disable react/prop-types */
export default function Input({
  type,
  id,
  placeholder,
  value,
  defaultValue,
  onChange,
  required,
  maxLength,
  minLength,
  readOnly,
}) {
  return (
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      defaultValue={defaultValue}
      readOnly={readOnly}
      onChange={onChange}
      className={`mt-2 w-full p-[13px] rounded-md border border-[#375861] text-gray-0 outline-none bg-transparent text-[15px] ${
        readOnly && "text-gray-300"
      }`}
      required={required}
      maxLength={maxLength}
      minLength={minLength}
    />
  );
}
