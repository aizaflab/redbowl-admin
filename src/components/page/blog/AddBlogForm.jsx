import toast from "react-hot-toast";
import Label from "../../ui/form/Label";
import Input from "../../ui/form/Input";
import { BsImageAlt } from "react-icons/bs";
import Button from "../../ui/button/Button";
import { MdNearbyError } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { handleGetContent } from "../../utils/AddBlogHelper";
import { CloudinarhandleUpload } from "../../../config/Cloudinar";
import { useGetCategorieQuery } from "../../../features/categorie/categorieApiSlice";
import { useAddBlogMutation } from "../../../features/blogFeatures/blog/blogApiSlice";
import JoditEditorComponent from "../../../pages/blog/JoditEditorComponent";
import TextEditor from "../../ui/editor/TextEditor";

export default function AddBlogForm() {
  const navigate = useNavigate();

  // Initial form state
  const initialValue = {
    title: "",
    sub_title: "",
    slug: "",
    content: "",
    pictureImageTitle: "",
    category: "",
    metaTitle: "",
    metaDescription: "",
  };

  const [formData, setFormData] = useState(initialValue);
  const [liveimg, setLiveImg] = useState(null);
  const [imgError, setImgError] = useState(false);
  const [content, setContent] = useState("");

  const [addBlog, { isError, isLoading, isSuccess, error, data: addBlogData }] =
    useAddBlogMutation();
  const { data, isLoading: catesIsLoading } = useGetCategorieQuery("");

  const categories = useMemo(
    () => (data?.data?.categorys ? data?.data?.categorys : []),
    [catesIsLoading]
  );

  useEffect(() => {
    const savedContent = handleGetContent();
    if (savedContent) {
      setFormData((prevData) => ({ ...prevData, content: savedContent }));
    }
    if (isSuccess) {
      toast.success(addBlogData?.message);
      navigate("/manage-blogs");
    }
    if (error) {
      toast.error(error?.data.message);
    }
  }, [isError, isLoading, isSuccess, error]);

  useEffect(() => {
    if (formData.title && !formData.slugEdited) {
      const generatedSlug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
      setFormData((prevData) => ({ ...prevData, slug: generatedSlug }));
    }
  }, [formData.title]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let imagUrl = "";
    let formDataToSubmit = new FormData();

    if (formData?.image) {
      const result = await CloudinarhandleUpload(
        formData?.image,
        "blog_section"
      );
      if (result.status) {
        imagUrl = result.url;
      } else {
        toast.error("Image upload failed!");
        return;
      }
    }
    // Append form data to formDataToSubmit
    formDataToSubmit.append("title", formData.title);
    formDataToSubmit.append("sub_title", formData.sub_title);
    formDataToSubmit.append("slug", formData.slug);
    formDataToSubmit.append("content", content);
    formDataToSubmit.append("category", formData.category);
    const seoContent = {
      metaTitle: formData.metaTitle,
      metaDescription: formData.metaDescription,
    };
    formDataToSubmit.append("seoContent", JSON.stringify(seoContent));
    const banner = {
      title: formData.pictureImageTitle,
      image: imagUrl,
    };
    formDataToSubmit.append("banner", JSON.stringify(banner));
    await addBlog(formDataToSubmit);
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setFormData((prevData) => ({ ...prevData, category: selectedCategory }));
  };
  const handleMetaTitleChange = (e) => {
    setFormData((prevData) => ({ ...prevData, metaTitle: e.target.value }));
  };

  const handleMetaDescriptionChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      metaDescription: e.target.value,
    }));
  };
  const handleLogoUpload = (e) => {
    setImgError(false);
    console.log(e.target.files[0]?.name);
    const file = e.target.files[0];
    setFormData((prevData) => ({ ...prevData, image: file }));
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const logoDataUrl = event.target.result;
        setLiveImg(logoDataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="h-full pb-10">
      {/* Title, Subtitle, and Slug */}
      <div className="xl:flex items-start justify-center my-10 gap-5 add-post-editor">
        <div className="sm:p-7 p-4 rounded-md xl:w-9/12 mt-5 xl:mt-0 bg-[#0B1315] border border-[#142225] relative overflow-hidden">
          <div className="mt-5 w-full z-[6] relative">
            <Label text="Title" hfor="title" required />
            <Input
              id="title"
              type="text"
              value={formData.title}
              placeholder="Enter title"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  title: e.target.value,
                  slugEdited: false,
                })
              }
              required
            />
          </div>
          <div className="mt-5 w-full z-[6] relative">
            <Label text="Subtitle" hfor="sub_title" required />
            <Input
              id="sub_title"
              type="text"
              value={formData.sub_title}
              placeholder="Enter subtitle"
              onChange={(e) =>
                setFormData({ ...formData, sub_title: e.target.value })
              }
              required
            />
          </div>
          <div className="mt-5 w-full z-[6] relative">
            <Label text="Slug" hfor="slug" required />
            <Input
              id="slug"
              type="text"
              value={formData.slug}
              placeholder="Enter slug"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  slug: e.target.value,
                  slugEdited: true,
                })
              }
              required
            />
          </div>
          <div className="mt-5 w-fullz-[6] relative">
            <Label text="Category Select" hfor="category" required />
            <select
              id="category"
              value={formData.category}
              onChange={handleCategoryChange}
              className="mt-2 w-full p-[13px] rounded-md border border-[#375861] text-gray-0 outline-none bg-transparent text-[15px]"
              required
            >
              <option
                value=""
                className="cursor-pointer text-gray-0 bg-[#0B1315]"
              >
                Choose Category
              </option>
              {categories?.map((categ) => (
                <option
                  key={categ?._id}
                  value={categ?._id}
                  className="cursor-pointer text-gray-0 bg-[#0B1315]"
                >
                  {categ?.title}
                </option>
              ))}
            </select>
          </div>
          <div className="darkMes size-[45rem]  rounded-full absolute bottom-[6rem] -right-64 rotate-45 opacity-30 "></div>
        </div>
      </div>

      <div className=" xl:flex items-start justify-center my-10 gap-5 add-post-editor ">
        <div className=" sm:p-7 p-4 rounded-md xl:w-9/12 mt-5 xl:mt-0  bg-[#0B1315] border border-[#142225]  relative overflow-hidden">
          <div className="z-[6] relative">
            <Label text="Banner Image" hfor="" />
            <div className=" flex flex-col-reverse sm:flex-row items-center mt-4 justify-between sm:gap-12 gap-8 ">
              <div className="flex items-center justify-center h-44 sm:w-44 w-full  ">
                <label
                  htmlFor="blogImg"
                  className={`flex flex-col items-center justify-center w-full h-full border-2  border-[#375861]  border-dashed rounded-md cursor-pointer bg-base-100  `}
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6 mx-auto">
                    <svg
                      className="w-6 h-6 mb-3 text-[#4f9bae]"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className=" text-sm text-[#4f9bae] font-medium text-center">
                      Upload image
                    </p>
                  </div>
                  <input
                    id="blogImg"
                    name="blogImg"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleLogoUpload(e)}
                    className="hidden"
                  />
                </label>
              </div>
              <div
                className={` bg-base-100 rounded-md flex items-center justify-center border mx-auto sm:mx-0 border-[#375861]  text-3xl text-[#4f9bae] sm:flex-1 sm:h-44 h-44 w-full sm:w-auto`}
              >
                {liveimg ? (
                  <img
                    src={liveimg}
                    alt="Blog Image"
                    className="h-full w-full rounded-xl"
                  />
                ) : (
                  <BsImageAlt />
                )}
              </div>
            </div>
            {imgError && (
              <span className="text-sm text-[#4f9bae] flex items-center gap-2 mt-1.5 justify-end">
                <MdNearbyError /> <p>Please upload an image for your blog.</p>
              </span>
            )}
          </div>

          {/* Image title */}
          <div className="mt-3 z-[6] relative">
            <Label text="Image Title" hfor="imgtitle" />
            <Input
              type="text"
              id="imgtitle"
              placeholder="Blog image title here . . ."
              value={formData?.pictureImageTitle}
              onChange={(e) =>
                setFormData((prevData) => ({
                  ...prevData,
                  pictureImageTitle: e.target.value,
                }))
              }
              required
            />
          </div>
          <div className="darkMes size-[45rem]  rounded-full absolute bottom-[6rem] -right-64 rotate-45 opacity-30 "></div>
        </div>
      </div>

      <div className="xl:flex items-start justify-center my-10 gap-5 add-post-editor">
        <div className="sm:p-7 p-4 rounded-md xl:w-9/12 mt-5 xl:mt-0 bg-[#0B1315] border border-[#142225]  relative overflow-hidden">
          <div className="mt-5 w-full z-[6] relative">
            <Label text="SEO Meta Title" hfor="metaTitle" />
            <Input
              id="metaTitle"
              type="text"
              value={formData.metaTitle}
              placeholder="Enter SEO Meta Title"
              onChange={handleMetaTitleChange}
            />
          </div>
          <div className="mt-5 w-full z-[6] relative">
            <Label text="SEO Meta Description" hfor="metaDescription" />
            <textarea
              id="metaDescription"
              value={formData.metaDescription}
              onChange={handleMetaDescriptionChange}
              className="mt-2 w-full p-[13px] rounded-md border border-[#375861] text-gray-0 outline-none bg-transparent text-[15px]"
              placeholder="Enter SEO Meta Description"
            />
          </div>
          <div className="darkMes size-[45rem]  rounded-full absolute bottom-[6rem] -right-64 rotate-45 opacity-30 "></div>
        </div>
      </div>

      {/* Blog Content */}
      <div className="xl:flex items-start justify-center my-10 gap-5 add-post-editor">
        <div className="sm:p-7 p-4 rounded-md xl:w-9/12 mt-5 xl:mt-0 bg-[#0B1315] border border-[#142225]  relative overflow-hidden">
          <div className="relative z-[50]">
            <JoditEditorComponent value={content} setValue={setContent} />
          </div>
          <div className="darkMes size-[45rem]  rounded-full absolute bottom-[6rem] -right-64 rotate-45 opacity-30 "></div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="text-center xl:w-9/12 mx-auto flex items-center justify-end">
        <Button
          type="submit"
          disabled={isLoading}
          className="bg-[#2f535b] dark:border-[#16272b]"
        >
          {isLoading ? "Creating..." : "Add Blog"}
        </Button>
      </div>

      <TextEditor />
    </form>
  );
}
