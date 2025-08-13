/* eslint-disable react/prop-types */
import { useState } from "react";
import { FiSearch } from "react-icons/fi";


export default function TableFilter({ data }) {

	// props data
	const { SEARCH_OPTIONS, FILTER_OPTIONS, setSearchParams, refetch } = data;

	const [searchBy, setSearchBy] = useState("");
	const [searchInput, setSearchInput] = useState("");

	const handleSearch = () => {
		setSearchParams(prev => {
			let searchParams = prev;
			SEARCH_OPTIONS.forEach(property => {
				if (Object.prototype.hasOwnProperty.call(searchParams, property.value)) {
					delete searchParams[property.value];
				}
			});
			if (searchBy) {
				searchParams = { ...searchParams, [searchBy]: searchInput };
			}
			return searchParams;
		})
		refetch();
	};

	return (
		<div className=" flex-wrap flex items-center sm:justify-between justify-center mb-5 pr-3 gap-3 mt-8">
			<div className="flex-wrap flex items-center sm:justify-normal justify-center gap-3 ">
				<div className="relative sm:mb-0 ">
					<input
						type="text"
						value={searchInput}
						onChange={(e) => setSearchInput(e.target.value)}
						placeholder="Search users"
						className="w-[15.4rem] bg-[#F9FAFB] focus:outline-none pl-8 py-[9px] font-medium focus:border-gray-200 border border-[#F9FAFB] pr-2 placeholder:text-sm text-sm rounded "
					/>
					<FiSearch className="absolute top-3 left-2 text-gray-600" />
				</div>
				<select
					value={searchBy}
					onChange={(e) => setSearchBy(e.target.value)}
					className="border border-gray-300 text-gray-900 py-2 px-4 rounded font-medium focus:outline-none text-sm "
				>
					{SEARCH_OPTIONS?.map((option) => (
						<option key={option.value} value={option.value}>
							{option.label}
						</option>
					))}
				</select>
				<button
					onClick={handleSearch}
					className="py-2 px-4 font-medium bg-[#F0F3F8] text-[#001B36] border border-[#F0F3F8] hover:bg-transparent rounded xl:block hidden text-sm"
				>
					Search
				</button>
			</div>

			<select
				onChange={(e) => setSearchParams(prev => ({ ...prev, status: e.target.value }))}
				className="border border-gray-300 text-gray-900 py-2 text-sm px-4 rounded font-medium focus:outline-none"
			>
				{FILTER_OPTIONS?.map((option) => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
		</div>
	);
}
