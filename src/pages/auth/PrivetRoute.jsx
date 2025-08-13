import { useSelector } from 'react-redux';
import Layout from '../../Layout';
import { Navigate, Outlet } from 'react-router-dom';

export default function PrivateRoute() {

    const { user } = useSelector(state => state.auth);
    const isAdmin = user?.role === 'admin';

    return isAdmin ? (
        <Layout>
            <Outlet />
        </Layout>
    ) : (
        <Navigate to={"/login"} />
    );
}
