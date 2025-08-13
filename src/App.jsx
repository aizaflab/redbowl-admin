import { RouterProvider, } from "react-router-dom";
import router from "./routes/routes";
import { useUserDataQuery } from "./features/auth/authApiSlice";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { localDataRemove } from "./utils/localStorage";

function App() {
  const { data: userData, isLoading } = useUserDataQuery();

  useEffect(() => {
    if (!isLoading && userData?.data?.role !== "admin") {
      localDataRemove("authToken");
    }
  }, [isLoading, userData]);

  if (isLoading) {
    return <div className="h-screen w-full flex items-center justify-center">
      <div className="loader"></div>
    </div>;
  }
  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="right-bottom" />
    </>
  );
}

export default App;
