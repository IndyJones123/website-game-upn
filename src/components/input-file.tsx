import React, { useState } from "react";

import { InputHTML } from "@/interfaces";
const InputFile: React.FC<InputHTML> = ({ onChange, name, value }) => {
    const [selectedFile, setSelectedFile] = useState("No file chosen");
    return (
        <div>
            <div className="flex flex-row items-center w-[500px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <input
                    name={name}
                    type="file"
                    id="custom-input"
                    className=""
                    onChange={onChange}
                    hidden
                />
                <label
                    htmlFor="custom-input"
                    className="block text-sm mr-4 py-2 px-4 rounded-l-md border-0 bg-gray-600
                    text-whitecursor-pointer"
                >
                    Choose file
                </label>
                <label className="text-sm ">
                    {value ? (value as string) : (selectedFile as string)}
                </label>
            </div>
        </div>
    );
};

export default InputFile;
