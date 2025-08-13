import { IoNotifications } from 'react-icons/io5'

export default function Notification() {
    return (
        <div className=" w-11 h-11 rounded-full bg-gray-100 text-black sm:flex items-center justify-center text-2xl border border-gray-100 hover:border-gray-200 hover:bg-transparent cursor-pointer  hidden">
            <IoNotifications />
        </div>
    )
}
