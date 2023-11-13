"use client";

import { User } from "@/services/users";
import { AiFillWindows } from "react-icons/ai";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Game } from "@/services/game";

import { GameData } from "@/interfaces";
import { ReturnUsers, DataUsers, User as Users } from "@/interfaces";
import { Auth } from "@/lib/auth";
import Loading from "@/components/loading";

export default function Detail() {
    const query = useSearchParams();
    const name = query.get("game");
    const [data, setData] = useState<GameData>();
    const [users, setUsers] = useState<Users>();
    const [quest, setQuest] = useState<number[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function Fetch() {
            const game = new Game();
            const auth = new Auth();
            const username = auth.parse()?.username;
            auth.isLogin();

            if (name) {
                const data: GameData = await game.getByName(name);
                setData(data);
            }

            const user = new User();
            if (!username) return;
            const res: DataUsers[] = await user.getByUsername(username);
            setUsers(res[0].dataUser);
            setQuest(res[0].dataUser.quest);
        }
    }, []);

    return (
        <div className="bg-[#141414]">
            <div className="relative h-screen px-44 flex items-center w-screen">
                {isLoading && (
                    <div className="fixed w-screen h-screen flex justify-center items-center z-50 backdrop-blur-md">
                        <Loading />
                    </div>
                )}
                <div className="flex flex-col items-start gap-5 w-full text-white">
                    <h1 className="font-bold text-7xl">{data?.name}</h1>
                    <h5 className="text-white w-[500px] break-all">
                        {data?.description}
                    </h5>
                    <div className="flex gap-5 items-center">
                        <h1 className="text-[20px]">Genres:</h1>
                        {data?.genres.map((item, index) => {
                            return (
                                <h1
                                    className="py-2 px-5 bg-gray-700 rounded-xl text-[13px]"
                                    key={index}
                                >
                                    {item}
                                </h1>
                            );
                        })}
                    </div>
                    <div className="flex gap-5 items-center">
                        <h1 className="text-[20px]">Platfroms:</h1>
                        <AiFillWindows className="w-10 h-10" />
                    </div>
                    <h1 className="font-bold text-3xl mt-10">User Log</h1>
                    <div className="rounded-lg">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 rounded-xl">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-center w-[200px]"
                                    >
                                        Username
                                    </th>
                                    {quest.map((item, index) => {
                                        return (
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-center w-[150px]"
                                                key={index}
                                            >
                                                Quest {index + 1}
                                            </th>
                                        );
                                    })}
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    <tr className="bg-gray-900">
                                        <td className="px-6 py-4 text-center">
                                            {users?.Username}
                                        </td>
                                        {quest.map((item, index) => {
                                            return (
                                                <td
                                                    className="px-6 py-4 text-center"
                                                    key={index}
                                                >
                                                    {item}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
