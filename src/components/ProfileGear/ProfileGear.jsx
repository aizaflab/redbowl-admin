import { useNavigate } from 'react-router-dom';
import userAvator from '../../../public/userAvator/user.png'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../features/auth/authSlice';
import { HiOutlineLogout } from 'react-icons/hi';

export default function ProfileGear() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);

    // Handle log out
    const handleLogOut = () => {
        dispatch(logout());
        navigate("/login");
    };

    return (
        <div className='flex items-center gap-3 group h-full relative'>
            <img src={userAvator} alt="userAvator" className=' h-11 w-11 rounded-full ' />
            <div>
                <h2 title={user?.username?.length > 12 ? user?.username : ""} className='sm:text-[19px] text-lg font-semibold'>{user?.username?.length > 12 ? user?.username?.slice(0, 12) + ".." : user?.username}</h2>
                <p className='text-sm text-gray-700 -mt-0.5 capitalize'>{user?.role}</p>
            </div>
            <div className='absolute top-12 right-0 w-full bg-white group-hover:block hidden'>
                <button onClick={handleLogOut} className='w-full px-4 flex items-center gap-2 py-2.5 bg-gray-100 hover:bg-gray-200 font-medium'><HiOutlineLogout className='text-lg' /> Logout</button>
            </div>
        </div>
    )
}
