import React, { useState } from "react";
import { BiSolidGame } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";

import { InputHTML } from "@/interfaces";

const InputText: React.FC<InputHTML> = ({
    onChange,
    name,
    value,
    placeholder,
    width,
}) => {
    return (
        <div className="flex items-center">
            <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <BiSolidGame className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                </div>
                <input
                    name={name}
                    type="text"
                    id="simple-search"
                    className={`${width} bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                    placeholder={placeholder}
                    value={value as string}
                    onChange={onChange}
                    required
                />
            </div>
        </div>
    );
};

export default InputText;
