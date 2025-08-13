/* eslint-disable react/prop-types */
import Pagination from "./Pagination";

export default function TableFooter({ data }) {
  const { page, setPage, totalCount, limit } = data || {};
  const startEntry = (page - 1) * limit + 1;
  const endEntry = Math.min(page * limit, totalCount);
  const totalEntry = Math.ceil(totalCount / limit);

  return (
    <div className="sm:flex-row flex-col flex items-center justify-between mt-7 mb-4 gap-3 sm:gap-0">
      <h2 className="text-gray-300 text-sm">
        Showing{" "}
        <span className="font-medium">
          {startEntry}-{endEntry}
        </span>{" "}
        of <span className="font-medium">{totalEntry}</span> Pages
      </h2>
      <div className=" flex-1 flex items-center justify-end">
        <Pagination setPage={setPage} totalCount={totalCount} limit={limit} />
      </div>
    </div>
  );
}
