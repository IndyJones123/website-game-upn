"use client";

import { AiFillWindows } from "react-icons/ai";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Game } from "@/services/game";

import Loading from "@/components/loading";
import { GameData } from "@/interfaces";

export default function Detail() {
    const [isLoading, setIsLoading] = useState(false);
    const query = useSearchParams();
    const name = query.get("game");
    const [data, setData] = useState<GameData>();
    useEffect(() => {
        async function Fetch() {
            const game = new Game();

            if (name) {
                const data: GameData = await game.getByName(name);
                setData(data);
            }
        }

        Fetch();
    }, []);

    const handleDelete = async () => {
        setIsLoading(true);
        const game = new Game();
        if (name) {
            await game.delete(name);
        }
        setIsLoading(false);
    };
    return (
        <div className="bg-[#141414]">
            {isLoading && (
                <div className="fixed w-screen h-screen flex justify-center items-center z-50 backdrop-blur-md">
                    <Loading />
                </div>
            )}
            <div className="relative h-screen px-44 flex items-center w-screen">
                <div className="flex flex-col items-start gap-5 w-full text-white">
                    <h1 className="font-bold text-7xl">{data?.name}</h1>
                    <h5 className="text-white w-[500px] break-all">
                        {data?.description}
                    </h5>
                    <div className="flex gap-5 items-center">
                        <h1 className="text-[20px]">Genres:</h1>
                        <h1 className="py-2 px-5 bg-gray-700 rounded-xl text-[13px]">
                            Adventure
                        </h1>
                        <h1 className="py-2 px-5 bg-gray-700 rounded-xl text-[13px]">
                            Action
                        </h1>
                        <h1 className="py-2 px-5 bg-gray-700 rounded-xl text-[13px]">
                            Open World
                        </h1>
                    </div>
                    <div className="flex gap-5 items-center">
                        <h1 className="text-[20px]">Platfroms:</h1>
                        <AiFillWindows className="w-10 h-10" />
                    </div>
                    <div className="flex gap-5">
                        <button onClick={() => setIsLoading(true)}>
                            <Link
                                href={{
                                    pathname: "/admin/detail/edit",
                                    query: { game: name },
                                }}
                            >
                                <button className="py-3 px-5 mt-2 rounded-xl bg-[#FF4C29]">
                                    <h1 className="text-[20px] font-semibold">
                                        Edit
                                    </h1>
                                </button>
                            </Link>
                        </button>
                        <button
                            className="py-3 px-5 mt-2 rounded-xl bg-red-500"
                            onClick={handleDelete}
                        >
                            <h1 className="text-[20px] font-semibold">
                                Delete
                            </h1>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
