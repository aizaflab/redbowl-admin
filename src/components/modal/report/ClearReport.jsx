/* eslint-disable react/prop-types */

import { PiWarningFill } from 'react-icons/pi'

export default function ClearReport({ title, message, handelDelete, setOpenModal, setClearData }) {
    return (
        <div className=" text-center pb-4">
            <div className='h-12 w-12 rounded-full flex items-center justify-center bg-blue-50 text-2xl mx-auto' >
                <PiWarningFill className='text-blue-600' />
            </div>
            <h2 className=' mt-3 text-xl'>{title || 'Clear Report'}</h2>
            <p className='text-gray-600  text-[15px] px-5'>{message || 'Are you sure you want to clear report and remove all report of this item?'}</p>
            <div className="flex justify-center mt-4 gap-4">
                <button
                    type="button"
                    className="text-sm bg-gray-100 px-3 py-1.5 rounded border border-gray-100 hover:bg-gray-200 "
                    onClick={() => { setOpenModal(false), setClearData(null) }}
                >
                    No, Keep It.
                </button>
                <button
                    type="button"
                    className="text-sm bg-blue-600 px-3 py-1.5 rounded border border-blue-600 hover:bg-blue-700 text-white"
                    onClick={handelDelete}
                >
                    Yes, Clear!
                </button>
            </div>
        </div>
    )
}
