/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { formatAndTruncateCell, showTooltip } from "../../../utils/utils";
import {
  useDeletedBlogMutation,
  useUpdateBlogMutation,
} from "../../../features/blogFeatures/blog/blogApiSlice";
import { useEffect, useState } from "react";
import dummyImage from "../../../assets/dummyImage.png";
import { LiaEditSolid } from "react-icons/lia";
import { HiOutlineTrash } from "react-icons/hi2";
import ModalLayout from "../../modal/ModalLayout";
import Delete from "../../modal/delete/Delete";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { FaRegImage } from "react-icons/fa";

export default function ManageBlogData({
  _id,
  banner,
  title,
  slug,
  category,
  isPublished,
  index,
  currentPage,
}) {
  const [updateBlog, { isSuccess }] = useUpdateBlogMutation();
  const [deleteBlog] = useDeletedBlogMutation();
  const [openModal, setOpenModal] = useState(false);

  const handleBlogNavigate = (slug) => {
    const clientSideUrl = import.meta.env.VITE_APP_PURPLELINESECURITYUSA;
    const blogTab = window.open(`${clientSideUrl}blog/${slug}`, "_blank");
    blogTab.focus();
  };

  const handleBlogStatus = async (blogId, value) => {
    if (!_id) return;
    const status = Boolean(value);
    await updateBlog({ blogId: blogId, data: { isPublished: status } });
  };

  // Function to handle order deletion
  const handleDelete = async () => {
    try {
      await deleteBlog(_id).unwrap();
      toast.success("Blog deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete the Blog.");
    }
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success("Blog Update successfully!");
    }
  }, [currentPage, isSuccess]);

  return (
    <>
      <tr className="flex gap-2 justify-between  bg-[#0f1a1d] border-b border-b-[#122024] hover:bg-[#122024]/70 text-gray-300">
        <td className="px-6  font-medium flex items-center w-14">
          {index + 1 < 10 ? `0${index + 1}` : index + 1}
        </td>

        <td className="px-2 flex items-center justify-center w-28 py-2.5">
          {banner?.image ? (
            <img
              src={banner?.image}
              alt="userAvator"
              className="h-9 w-14 rounded-sm bg-[#19091220242e]"
            />
          ) : (
            <div className="h-9 w-14 rounded-sm bg-[#122024] center text-mainLight/60">
              <FaRegImage />
            </div>
          )}
        </td>

        <td
          title={showTooltip(title, 25)}
          className="px-2 flex items-center justify-start w-60"
        >
          {formatAndTruncateCell(title, 25)}{" "}
        </td>

        <td
          title={showTooltip(category?.title, 15)}
          className="px-2 flex items-center justify-start w-48"
        >
          {" "}
          {formatAndTruncateCell(category?.title, 15)}
        </td>

        <td className="px-2 flex items-center justify-center w-28">
          <button onClick={() => handleBlogNavigate(slug)}>view</button>
        </td>
        <td className="px-2 flex items-center justify-center w-32">
          <select
            value={isPublished ? "true" : "false"}
            onChange={(e) => handleBlogStatus(_id, e.target.value === "true")}
            className="cursor-pointer bg-[#122024] px-4 py-1.5 rounded-sm focus:outline-none w-full"
          >
            <option value="true">Active</option>{" "}
            <option value="false">InActive</option>{" "}
          </select>
        </td>

        <td className="px-2 flex items-center justify-center gap-4 w-32">
          <Link to={`/edit-blog/${_id}`}>
            {" "}
            <LiaEditSolid className="cursor-pointer" size={20} />
          </Link>
          <HiOutlineTrash
            onClick={() => setOpenModal(true)}
            className="text-red-500 cursor-pointer"
            size={20}
          />
        </td>
      </tr>

      {/* Delete Confirmation Modal */}
      {openModal && (
        <ModalLayout
          openModal={openModal}
          setOpenModal={setOpenModal}
          icon={<HiOutlineTrash />}
          title="Delete Blog"
        >
          <Delete
            title="Delete Blog"
            message={`Are you sure you want to delete the blog"?`}
            handelDelete={() => {
              handleDelete();
              setOpenModal(false);
            }}
            setOpenModal={setOpenModal}
          />
        </ModalLayout>
      )}
    </>
  );
}
