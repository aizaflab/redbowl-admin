import { useParams } from "react-router-dom";
import { useGetBlogSingleQuery } from "../../features/blogFeatures/blog/blogApiSlice";
import EditBlogFrom from "../../components/page/blog/EditBlogFrom";

export default function EditBlogPage() {
  const { id } = useParams();
  const { data, isLoading, error } = useGetBlogSingleQuery(id);

  // Handle loading state
  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <div className="loader"></div>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        Error fetching orders: {error.data.message}
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col items-center justify-center mt-6">
        <h1 className="text-xl font-medium text-gray-0">Edit Blog</h1>
        <div className="h-[1px] w-60 bg-mainLight/50"></div>
      </div>
      <EditBlogFrom blogData={data?.data} />
    </div>
  );
}
