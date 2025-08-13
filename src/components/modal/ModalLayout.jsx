/* eslint-disable react/prop-types */
import { RxCross1 } from "react-icons/rx";

export default function ModalLayout({
  openModal,
  setOpenModal,
  children,
  title,
  icon,
  setModalData,
}) {
  return (
    <div className=" mx-auto flex items-center justify-center !z-[1000] relative overflow-hidden ">
      <div
        onClick={() => {
          setOpenModal(false), setModalData(null);
        }}
        className={`fixed flex justify-center items-center z-[100] ${
          openModal ? "visible opacity-1" : "invisible opacity-0"
        } inset-0 w-full h-full backdrop-blur-sm bg-black/20 duration-100`}
      >
        <div
          onClick={(e_) => e_.stopPropagation()}
          className={`absolute w-full lg:w-[450px] overflow-hidden bg-[#0B1315] border border-[#16272b] drop-shadow-2xl rounded-md p-5 ${
            openModal
              ? "opacity-1 duration-300 translate-y-0"
              : "-translate-y-20 opacity-0 duration-150"
          }`}
        >
          <div className="flex items-center justify-between mb-4 border-b border-b-[#16272b] z-[6] relative  pb-2">
            <div className="flex items-center gap-2 ">
              {icon && (
                <div className="h-8 w-8 bg-[#16272b] flex items-center justify-center text-xl rounded text-gray-0">
                  {icon}
                </div>
              )}

              <p className="text-lg font-medium text-white ">{title}</p>
            </div>
            <RxCross1
              onClick={() => {
                setOpenModal(false), setModalData(null);
              }}
              className=" hover:rotate-90 transition-all duration-200 ease-in-out text-gray-200  cursor-pointer hover:text-red-500"
            />
          </div>
          <div className="z-[6] relative ">{children}</div>
          <div className="darkMes size-[45rem]  rounded-full absolute bottom-[6rem] -right-96 rotate-45 opacity-30 "></div>
        </div>
      </div>
    </div>
  );
}
