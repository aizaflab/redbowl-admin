/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import {
  useAddCategorieMutation,
  useGetCategorieQuery,
} from "../../features/categorie/categorieApiSlice";
import Button from "../../components/ui/button/Button";
import TableLayout from "../../components/table/TableLayout";
import ModalLayout from "../../components/modal/ModalLayout";
import Label from "../../components/ui/form/Label";
import Input from "../../components/ui/form/Input";
import CategoryTable from "../../components/table/categoryTable/CategoryTable";
import toast from "react-hot-toast";
import { IoIosAdd } from "react-icons/io";

const CategoryManage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [fromData, setFromData] = useState({
    title: "",
    slug: "",
  });

  const limit = 10;
  const [search, setSearch] = useState("");
  const pathname = `?page=${currentPage}&limit=${limit}&searchTerm=${search}`;

  const [createCategori, { isLoading: creatcityLoading }] =
    useAddCategorieMutation();
  const {
    data,
    isLoading: isFetchingCategories,
    error,
    refetch,
  } = useGetCategorieQuery(pathname);

  useEffect(() => {
    if (fromData.title && !fromData.slugEdited) {
      const generatedSlug = fromData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
      setFromData((prevData) => ({ ...prevData, slug: generatedSlug }));
    }
  }, [fromData.slugEdited, fromData.title]);

  const totalCount = data?.data?.totalItems || 0;
  const categorys = data?.data?.categorys || [];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createCategori({
        title: fromData.title,
        slug: fromData.slug,
      }).unwrap();
      setFromData({ title: "", slug: "" });
      toast.success("Category created successfully!");
      setOpenModal(false);
      refetch();
    } catch (error) {
      setOpenModal(false);
      toast.error("Something went wrong while creating the category.");
    }
  };

  const handleSearchChange = (e) => {
    const searchValue = e.target.value;
    setSearch(searchValue);
    setCurrentPage(1);
  };

  return (
    <section>
      {/* <h1 className="font-semibold hidden sm:block text-gray-0 ml-3">
        Manage Category
      </h1> */}
      <div className="flex items-center justify-between py-2 mt-7 rounded px-3 bg-[#0B1315]/10 border border-[#0B1315] text-gray-0">
        <div className="flex justify-start items-center gap-10">
          <input
            className="rounded border border-[#1b2d32] outline-none bg-transparent text-[15px] px-4 py-2 xl:w-[20vw]"
            type="search"
            placeholder="Search..."
            onChange={(e) => handleSearchChange(e)}
          />
        </div>
        <Button
          type="text"
          onClick={() => setOpenModal(true)}
          className="bg-[#1a2c31] dark:border-[#1a2c31] text-gray-0"
        >
          Add Category
        </Button>
      </div>

      {isFetchingCategories && (
        <div className="center h-[40vh] w-full bg-[#271042]/10 mt-5">
          <div className="loader "></div>
        </div>
      )}
      {error && (
        <div className="center h-[40vh] w-full bg-[#271042]/10 mt-5 text-center text-mainLight">
          Failed to load categories. Please try again later.
        </div>
      )}
      {categorys?.length > 0 ? (
        <TableLayout
          data={{
            isCSV: false,
            page: currentPage,
            setPage: setCurrentPage,
            totalCount,
            limit,
            refetch,
          }}
        >
          <CategoryTable data={categorys} currentPage={currentPage} />
        </TableLayout>
      ) : (
        !isFetchingCategories &&
        !error && (
          <div className="center h-[40vh] w-full bg-[#271042]/10 mt-5 text-center text-mainLight">
            No Product Found!
          </div>
        )
      )}

      <ModalLayout
        icon={<IoIosAdd />}
        title="Add Category"
        openModal={openModal}
        setOpenModal={setOpenModal}
        setFromData={setFromData}
      >
        <form onSubmit={handleSubmit}>
          <div className="mt-5 w-full">
            <Label text="Title" hfor="title" required={true} />
            <Input
              id="title"
              type="text"
              value={fromData.title}
              placeholder="Title"
              onChange={(e) =>
                setFromData({
                  ...fromData,
                  title: e.target.value,
                  slugEdited: false,
                })
              }
              required={true}
            />
          </div>
          <div className="mt-5 w-full">
            <Label text="Slug" hfor="slug" required={true} />
            <Input
              id="slug"
              type="text"
              value={fromData.slug}
              placeholder="Slug"
              onChange={(e) =>
                setFromData({
                  ...fromData,
                  slug: e.target.value,
                  slugEdited: true,
                })
              }
              required={true}
            />
          </div>
          <div className="mt-5 flex justify-end">
            <Button
              type="submit"
              className="bg-[#16272b] dark:border-[#16272b] hover:text-gray-0"
            >
              {!creatcityLoading ? "Submit" : "Loading..."}
            </Button>
          </div>
        </form>
      </ModalLayout>
    </section>
  );
};

export default CategoryManage;
