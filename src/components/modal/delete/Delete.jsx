/* eslint-disable react/prop-types */

import { PiWarningFill } from "react-icons/pi";

export default function Delete({ title, message, handelDelete, setOpenModal }) {
  return (
    <div className=" text-center pb-4">
      <div className="h-12 w-12 rounded-full flex items-center justify-center bg-[#16272b] text-2xl mx-auto">
        <PiWarningFill className="text-[#4ea9bd]" />
      </div>
      <h2 className=" mt-3 text-xl text-gray-0">{title || "Confirm Delete"}</h2>
      <p className="text-gray-400">
        {message || "Are you sure you want to delete this item?"}
      </p>
      <div className="flex justify-center mt-4 gap-4">
        <button
          type="button"
          className="text-sm bg-gray-100 px-3 py-1.5 rounded border border-gray-100 hover:bg-gray-200 "
          onClick={() => setOpenModal(false)}
        >
          No, Keep It.
        </button>
        <button
          type="button"
          className="text-sm bg-[#264248] px-3 py-1.5 rounded border border-[#16272b] hover:bg-[#1b2e32] dark:hover:border-[#1e0e30] text-white"
          onClick={handelDelete}
        >
          Yes, Delete!
        </button>
      </div>
    </div>
  );
}
