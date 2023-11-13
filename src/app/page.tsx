"use client";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { AiFillWindows, AiFillFire } from "react-icons/ai";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FaPlus } from "react-icons/fa";
import CardGame from "@/components/card-game";
import landing from "../../public/landing.png";
import Image from "next/image";
import { useEffect, useState } from "react";
import Loading from "@/components/loading";

import { Game } from "@/services/game";
import { Games, ReturnGame } from "@/interfaces";
import { useRouter } from "next/navigation";

export default function Home() {
    const [data, setData] = useState<ReturnGame>();
    const [index, setIndex] = useState(0);
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function Fetch() {
            const game = new Game();

            const data: ReturnGame = await game.get();
            setData(data);
        }

        Fetch();
    }, [isLoading]);

    const handleIncrement = (index: number) => {
        const length = data?.data.length;
        if (length && index >= length - 1) {
            setIndex(0);
        } else {
            setIndex(index + 1);
        }
    };

    const handleDecrement = (index: number) => {
        const length = data?.data.length;
        if (length && index <= 0) {
            setIndex(length - 1);
        } else {
            setIndex(index - 1);
        }
    };

    const handleLoading = () => {
        setIsLoading(true);
    };

    console.log(data);

    return (
        <main className="relative w-screen ">
            {isLoading && (
                <div className="fixed w-screen h-screen flex justify-center items-center z-50 backdrop-blur-md">
                    <Loading />
                </div>
            )}
            <div className="relative w-screen bg-[#141414]">
                <div className="absolute w-full z-10">
                    <Navbar onClick={handleLoading} />
                </div>
                <div className="relative h-screen px-44 flex items-center">
                    <div className="flex flex-col items-start gap-5 w-1/2 mt-20 text-white">
                        <div className="flex gap-3">
                            <button
                                className="border-2 border-white p-2 rounded-lg"
                                onClick={() => handleDecrement(index)}
                            >
                                <IoIosArrowBack className="w-6 h-6" />
                            </button>
                            <button
                                className="border-2 border-white p-2 rounded-lg"
                                onClick={() => handleIncrement(index)}
                            >
                                <IoIosArrowForward className="w-6 h-6" />
                            </button>
                        </div>
                        <h1 className="font-bold text-7xl">
                            {data?.data[index].gameData.name}
                        </h1>
                        <h5 className="text-white w-[600px] break-all">
                            {data?.data[index].gameData.description}
                        </h5>
                        <div className="flex gap-5 items-center">
                            <h1 className="text-[20px]">Genres:</h1>
                            {data?.data[index].gameData.genres.map(
                                (genre, index) => (
                                    <h1
                                        className="py-2 px-5 bg-gray-700 rounded-xl text-[13px]"
                                        key={index}
                                    >
                                        {genre}
                                    </h1>
                                )
                            )}
                        </div>
                        <div className="flex gap-5 items-center">
                            <h1 className="text-[20px]">Platfroms:</h1>
                            <AiFillWindows className="w-10 h-10" />
                        </div>
                        <button className="py-3 px-5 mt-2 rounded-xl bg-[#FF4C29]">
                            <h1
                                className="text-[20px] font-semibold"
                                onClick={() =>
                                    window.open(data?.data[index].gameData.link)
                                }
                            >
                                Play Now!
                            </h1>
                        </button>
                    </div>
                    <Image
                        src={landing}
                        alt="landing"
                        className="absolute -right-72 -top-32 w-[70%]"
                    ></Image>
                </div>
                <div
                    className="h-full px-44 flex flex-col gap-10"
                    id="list-games"
                >
                    <div className="mt-10">
                        <div className="flex items-center justify-center mb-5">
                            <div className="p-3 rounded-full bg-[#FF4C29]">
                                <AiFillFire className="text-white text-2xl" />
                            </div>
                        </div>
                        <h1 className="text-center text-white font-bold text-3xl">
                            List of the Games
                        </h1>
                    </div>
                    <div className="grid grid-cols-3 justify-center text-white gap-20">
                        {data &&
                            data.data.map((game: Games, index) => (
                                <div className="" key={index}>
                                    <CardGame
                                        name={game.gameData.name}
                                        link={game.gameData.link}
                                        handleLoading={handleLoading}
                                        gambar={game.gameData.gambar as string}
                                    />
                                </div>
                            ))}
                    </div>
                </div>
                <div className="mt-32">
                    <Footer />
                </div>
            </div>
        </main>
    );
}
