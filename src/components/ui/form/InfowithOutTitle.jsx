/* eslint-disable react/prop-types */
export default function InfowithOutTitle({ data }) {
    return (
        <div className='flex gap-2 mt-5'>
            <div className='text-lg mt-0.5'>{data?.icon}</div>
            <p className='text-[14px] text-gray-600 dark:text-gray-400'>{data?.text}</p>
        </div>
    )
}
