import React, { useState } from "react";
import { BiSolidGame } from "react-icons/bi";

import { InputHTML } from "@/interfaces";

const InputPassword: React.FC<InputHTML> = ({ onChange, name }) => {
    return (
        <div className="flex items-center">
            <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <BiSolidGame className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                </div>
                <input
                    name={name}
                    type="password"
                    className="w-[500px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Input Password..."
                    onChange={onChange}
                    required
                />
            </div>
        </div>
    );
};

export default InputPassword;
