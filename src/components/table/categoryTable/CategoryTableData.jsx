/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { HiOutlineTrash } from "react-icons/hi";
import { LiaEditSolid } from "react-icons/lia";
import Delete from "../../modal/delete/Delete";
import ModalLayout from "../../modal/ModalLayout";
import toast from "react-hot-toast";
import Label from "../../ui/form/Label";
import Button from "../../ui/button/Button";
import Input from "../../ui/form/Input";
import {
  useDeleteCategorieMutation,
  useUpdateCategorieMutation,
} from "../../../features/categorie/categorieApiSlice";

export default function CategoryTableData({ title, slug, index, _id }) {
  const [openModal, setOpenModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [deleteCategorie] = useDeleteCategorieMutation();
  const [updateCategorie, { isLoading }] = useUpdateCategorieMutation();
  const [fromData, setFromData] = useState({
    title: title,
    slug: slug || title.replace(/\s+/g, "-").toLowerCase(), // Initialize slug based on title
  });

  const [isSlugEdited, setIsSlugEdited] = useState(false);

  // Handle deletion
  const handleDelete = async () => {
    try {
      await deleteCategorie(_id).unwrap();
      toast.success("Category deleted successfully!");
    } catch (error) {
      console.error("Failed to delete the Category:", error);
      toast.error("Failed to delete the Category.");
    }
  };

  // Handle update submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const categorieId = _id;
      const updatedData = await updateCategorie({
        categorieId,
        data: { ...fromData },
      }).unwrap();
      if (updatedData) {
        toast.success("Category updated successfully!");
      }
      setUpdateModal(false);
    } catch (error) {
      setUpdateModal(false);
      toast.error("Something went wrong while updating the Category.");
    }
  };

  // Handle title change and auto-generate slug
  const handleTitleChange = (e) => {
    const updatedTitle = e.target.value;
    setFromData((prevData) => ({
      ...prevData,
      title: updatedTitle,
      slug: !isSlugEdited
        ? updatedTitle.replace(/\s+/g, "-").toLowerCase() // Generate slug if not edited
        : prevData.slug, // Keep current slug if manually edited
    }));
  };

  // Handle slug change
  const handleSlugChange = (e) => {
    setIsSlugEdited(true);
    setFromData((prevData) => ({
      ...prevData,
      slug: e.target.value,
    }));
  };

  return (
    <>
      {/* Table Row */}
      <tr className="flex gap-2 justify-between py-2.5 bg-[#0f1a1d] border-b border-b-[#122024] hover:bg-[#122024] text-gray-300">
        <td className="px-6 font-medium  flex items-center w-14">
          {index + 1 < 10 ? `0${index + 1}` : index + 1}
        </td>
        <td className="px-2 flex items-center justify-start w-60 capitalize">
          {title}
        </td>
        <td className="px-2 flex items-center justify-start w-60 capitalize">
          {slug}
        </td>
        <td className="px-2 flex items-center justify-center w-60 gap-2 text-xl">
          <LiaEditSolid
            onClick={() => setUpdateModal(true)}
            className="cursor-pointer"
          />
          <HiOutlineTrash
            className="text-red-500 cursor-pointer"
            onClick={() => setOpenModal(true)}
          />
        </td>
      </tr>

      {/* Delete Confirmation Modal */}
      {openModal && (
        <ModalLayout
          openModal={openModal}
          setOpenModal={setOpenModal}
          icon={<HiOutlineTrash />}
          title={"Delete Category"}
        >
          <Delete
            title="Delete Category"
            message="Are you sure you want to delete the Category?"
            handelDelete={() => {
              handleDelete();
              setOpenModal(false);
            }}
            setOpenModal={setOpenModal}
          />
        </ModalLayout>
      )}

      {/* Update Modal */}
      {updateModal && (
        <ModalLayout
          openModal={updateModal}
          setOpenModal={setUpdateModal}
          title="Edit Category"
          icon={<LiaEditSolid />}
        >
          <form onSubmit={handleSubmit}>
            <div className="mt-5 w-full">
              <Label text="Title" hfor="title" required />
              <Input
                id="title"
                type="text"
                value={fromData?.title}
                placeholder="title"
                onChange={handleTitleChange}
                required
              />
            </div>
            <div className="mt-5 w-full">
              <Label text="Slug" hfor="slug" required />
              <Input
                id="slug"
                type="text"
                value={fromData?.slug}
                placeholder="slug"
                onChange={handleSlugChange}
                required
              />
            </div>
            <div className="mt-5 flex justify-end">
              <Button
                type="submit"
                className="bg-[#16272b] dark:border-[#16272b] hover:text-gray-0"
              >
                {isLoading ? "Loading.." : "Submit"}
              </Button>
            </div>
          </form>
        </ModalLayout>
      )}
    </>
  );
}
