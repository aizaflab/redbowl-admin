/* eslint-disable react/prop-types */
export default function Info({ data }) {
    return (
        <div>
            <div className='mt-5 flex items-start gap-3 text-sm mb-1'>
                <div className='text-lg'>
                    {data.icon}
                </div>
                <p className='dark:text-gray-300 font-medium text-gray-600'>{data.taile}</p>
            </div>
            <p className='text-sm text-gray-400'>{data.dec}</p>
        </div>
    );
}
