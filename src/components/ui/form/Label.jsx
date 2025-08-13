/* eslint-disable react/prop-types */
export default function Label({ text, hfor, required }) {
  return (
    <label
      htmlFor={hfor ? hfor : null}
      className="text-sm font-semibold text-gray-200 cursor-pointer"
    >
      {" "}
      {text} {required === true && <span className="text-red-500">*</span>}
    </label>
  );
}
