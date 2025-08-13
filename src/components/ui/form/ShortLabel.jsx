/* eslint-disable react/prop-types */
export default function ShortLabel({ text, hfor, require }) {
    return (
        <label htmlFor={hfor ? hfor : null} className="text-sm font-medium text-primary cursor-pointer" > {text} {require === true && <span className="text-red-500">*</span>}</label >
    )
}