import React, { useState } from "react";
import { BiSolidGame } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";

const InputSearch = () => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    return (
        <div className="flex items-center">
            <label htmlFor="simple-search" className="sr-only">
                Search
            </label>
            <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <BiSolidGame className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                </div>
                <input
                    type="text"
                    id="simple-search"
                    className="w-[400px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search game..."
                    required
                />
            </div>
            <button
                type="submit"
                className="p-2.5 ml-2 text-sm font-medium text-white bg-[#FF4C29] hover:bg-[#f52800] rounded-lg"
            >
                <AiOutlineSearch className="w-4 h-4" />
                <span className="sr-only">Search</span>
            </button>
        </div>
    );
};

export default InputSearch;
