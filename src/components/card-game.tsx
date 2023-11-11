import React, { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Valorant from "../../public/valorant.jpg";
import { BiSolidDownload, BiDetail } from "react-icons/bi";
import { FaPlay } from "react-icons/fa";

import { GameCard } from "@/interfaces";
import { Auth } from "@/lib/auth";
import { useEffect } from "react";

const CardGame: React.FC<GameCard> = ({ name, link, handleLoading }) => {
    const [role, setRole] = useState("");
    useEffect(() => {
        const auth = new Auth();
        setRole(auth.checkRole());
    }, []);
    return (
        <div className="relative h-[450px] w-[350px] bg-white rounded-xl overflow-hidden">
            <Image src={Valorant} className="" alt="logo"></Image>
            <div className="absolute bottom-0 bg-[#FF4C29] h-[70px] w-full rounded-b-xl opacity-90"></div>
            <div className="absolute bottom-0 h-[70px] flex items-center justify-between w-full px-7 text-black">
                <h1 className="font-bold">{name}</h1>
                <div className="flex gap-3 items-center">
                    <button onClick={() => window.open(link)}>
                        <FaPlay className="w-5 h-5" />
                    </button>
                    <div
                        className={`${role === undefined ? "hidden" : "block"}`}
                        onClick={handleLoading}
                    >
                        <Link
                            href={{
                                pathname: `${
                                    role === "student" ? "" : "/admin"
                                }/detail`,
                                query: { game: name },
                            }}
                        >
                            <BiDetail className="w-6 h-6" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardGame;
