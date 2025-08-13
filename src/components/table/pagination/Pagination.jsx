/* eslint-disable react/prop-types */
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import ReactPaginate from "react-paginate";

export default function Pagination({ setPage, totalCount, limit }) {
  const handlePageChange = (e) => {
    setPage(e.selected + 1);
  };
  return (
    <div>
      <ReactPaginate
        breakLabel="..."
        previousLabel={
          <div className="flex items-center justify-center text-xl size-7">
            <IoIosArrowBack />
          </div>
        }
        previousClassName="border-[#16272b] text-white border-2  rounded-lg text-center mr-auto hover:bg-[#16272b] hover:border-[#16272b] transition duration-200 select-none"
        nextClassName="border-[#16272b] text-white border-2  rounded-lg text-center mr-auto hover:bg-[#16272b] hover:border-[#16272b] transition duration-200 select-none"
        activeLinkClassName="size-7 grid place-items-center"
        nextLabel={
          <div className="flex items-center justify-center text-xl size-7">
            <IoIosArrowForward />
          </div>
        }
        onPageChange={(e) => handlePageChange(e)}
        pageRangeDisplayed={9}
        marginPagesDisplayed={1}
        pageCount={Math.ceil(totalCount / limit)}
        renderOnZeroPageCount={null}
        pageLinkClassName="h-8 w-8 grid place-items-center text-gray-0 "
        className="flex items-center gap-2"
        pageClassName="rounded-lg"
        activeClassName="bg-[#16272b] box-content text-gray-0 border border-[#16272b] font-bold h-8 w-8"
      />
    </div>
  );
}
