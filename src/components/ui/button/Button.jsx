/* eslint-disable react/prop-types */
import { RiLoader3Fill } from "react-icons/ri";

export default function Button({
  children,
  type = "button",
  disabled = false,
  isLoading = false,
  icon = true,
  className = "",
  ...res
}) {
  return (
    <button
      type={type}
      className={`relative center  ${
        icon && "px-4 py-2"
      }   text-[13px] font-medium rounded cursor-pointer ani3  hover:bg-transparent hover:text-gray-0 border border-[#1D3237]  text-white  ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }  ${className}`}
      disabled={disabled}
      {...res}
      aria-label={children}
    >
      {isLoading ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <RiLoader3Fill className="animate-spin w-5 h-5 text-current" />
        </div>
      ) : (
        <>
          {children}
          {isLoading && (
            <span className="ml-2">
              {" "}
              <RiLoader3Fill className="w-4 h-4 text-current animate-spin" />
            </span>
          )}
        </>
      )}
    </button>
  );
}
