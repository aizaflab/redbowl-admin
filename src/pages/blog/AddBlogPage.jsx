import AddBlogForm from "../../components/page/blog/AddBlogForm";

export default function AddBlogPage() {
  return (
    <div>
      <div className="flex flex-col items-center justify-center mt-6">
        <h1 className="text-xl font-medium text-gray-0">Add Blog</h1>
        <div className="h-[1px] w-60 bg-[#1d3136]"></div>
      </div>
      <AddBlogForm />
    </div>
  );
}
