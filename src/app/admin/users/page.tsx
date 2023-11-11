"use client";
import { User } from "@/services/users";
import { useEffect, useState } from "react";

import { useSearchParams } from "next/navigation";
import { ReturnUsers, DataUsers } from "@/interfaces";
export default function Users() {
    const query = useSearchParams();
    const name = query.get("game");
    const [users, setUsers] = useState<DataUsers[]>([]);
    const [quest, setQuest] = useState<number[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const user = new User();
            if (!name) return;
            const res: DataUsers[] = await user.getByName(name);
            setUsers(res);
            setQuest(res[0].dataUser.quest);
        };

        fetchData();
    }, []);
    console.log(quest);
    return (
        <div
            className={`h-screen w-screen flex items-center bg-[#141414] p-14 text-white relative`}
        >
            <div className="flex flex-col gap-5">
                <h1 className="text-4xl font-bold text-white">Users Page</h1>
                <div className="">
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-center w-[300px]"
                                    >
                                        Username
                                    </th>
                                    {quest.map((item, index) => {
                                        return (
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-center w-[195px]"
                                                key={index}
                                            >
                                                Quest {index + 1}
                                            </th>
                                        );
                                    })}
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((item, index) => {
                                    return (
                                        <tr
                                            className={` border-b text-center ${
                                                index % 2 === 0
                                                    ? "bg-white dark:bg-gray-900 dark:border-gray-700"
                                                    : "bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
                                            }`}
                                            key={index}
                                        >
                                            <th
                                                scope="row"
                                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                            >
                                                {item.dataUser.Username}
                                            </th>
                                            {item.dataUser.quest.map(
                                                (item, index) => {
                                                    return (
                                                        <td
                                                            className="px-6 py-4"
                                                            key={index}
                                                        >
                                                            {item}
                                                        </td>
                                                    );
                                                }
                                            )}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
