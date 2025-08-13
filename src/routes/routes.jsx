import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "../pages/auth/PrivetRoute";
import DashBoard from "../pages/dashboard/DashBoard";
import Login from "../pages/auth/Login";
import NotFound from "../pages/NotFound/NotFound";
import CategoryManage from "../pages/category/CategoryManage";
import ProfilePage from "../pages/profile/Profile";
import ManageBlogPage from "../pages/blog/ManageBlogPage";
import AddBlogPage from "../pages/blog/AddBlogPage";
import EditBlogPage from "../pages/blog/EditBlogPage";

const router = createBrowserRouter([
  {
    path: "/",
    element:
      <PrivateRoute>
        <DashBoard />
      </PrivateRoute>,
    children: [
      { path: "", element: <CategoryManage /> },
      { path: "/manage-blogs", element: <ManageBlogPage /> },
      { path: "/add-blog", element: <AddBlogPage /> },
      { path: "/edit-blog/:id", element: <EditBlogPage /> },
      { path: "/profile", element: <ProfilePage /> },

      { path: "*", element: <NotFound /> },
    ],
  },
  {
    path: '/login',
    element: <Login />
  }
]);

export default router;
