/* eslint-disable react/prop-types */
export default function ShortHeading({ text, dec }) {
    return (
        <div className="pl-4 sm:pl-0">
            <h1 className=" text-primary font-medium">{text}</h1>
            <p className=" text-sm text-gray-500">{dec}</p>
        </div>
    )
}