"use client";
import InputFile from "@/components/input-file";
import InputText from "@/components/input-text";
import Image from "next/image";
import landing from "../../../../public/landing.png";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Game } from "@/services/game";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { useRouter } from "next/navigation";

import { GameData } from "@/interfaces";
import Loading from "@/components/loading";

import { Auth } from "@/lib/auth";
export default function Create() {
    const query = useSearchParams();
    const router = useRouter();
    const name = query.get("game");
    const auth = new Auth();
    auth.isLoginTeacher();
    const [gambarName, setGambarName] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState<GameData>({
        name: "",
        description: "",
        genres: [],
        link: "",
        gambar: "",
    });

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (name === "genres") {
            const genres = value.split(",");
            setData({ ...data, genres });
        } else if (name === "gambar") {
            const gambar = e.target.files?.[0];
            setGambarName(gambar?.name || "");
            setData({ ...data, gambar });
        } else if (name === "link") {
            const link = value;
            setData({ ...data, link });
        } else if (name === "name") {
            const name = value;
            setData({ ...data, name });
        } else if (name === "description") {
            const description = value;
            setData({ ...data, description });
        }
    };

    const handleCreate = async () => {
        setIsLoading(true);
        const formData = new FormData();
        if (
            data.name === "" ||
            data.description === "" ||
            data.genres.length === 0 ||
            data.link === "" ||
            gambarName === ""
        ) {
            setIsLoading(false);
            alert("Data tidak boleh kosong");
            return;
        } else {
            formData.append("name", data.name);
            formData.append("description", data.description);
            formData.append("genres", data.genres.join(","));
            formData.append("link", data.link);
            formData.append("gambar", data.gambar as Blob);

            const game = new Game();
            const response = await game.create(formData);
        }
    };
    return (
        <div className="h-screen w-screen flex items-center bg-[#141414] text-white relative overflow-hidden">
            {isLoading && (
                <div className="fixed w-screen h-screen flex justify-center items-center z-50 backdrop-blur-md">
                    <Loading />
                </div>
            )}
            <div className="flex relative p-28">
                <button
                    className="absolute left-15 top-10 flex items-center gap-3"
                    onClick={() => router.push("/")}
                >
                    <BsFillArrowLeftCircleFill className="w-8 h-8 text-white" />
                </button>
                <div className="">
                    <h1 className="text-4xl font-bold text-white">
                        Create Game Page
                    </h1>

                    <div className="py-2">
                        <h1>Judul Game</h1>
                        <InputText
                            onChange={handleInput}
                            name={"name"}
                            value={data?.name}
                            width="w-[500px]"
                            placeholder="Input Judul Game . . . "
                        />
                    </div>
                    <div className="py-2">
                        <h1>Deskripsi</h1>
                        <InputText
                            onChange={handleInput}
                            name={"description"}
                            value={data?.description}
                            width="w-[500px]"
                            placeholder="Input Deskripsi . . . "
                        />
                    </div>
                    <div className="py-2">
                        <h1>Genre</h1>
                        <InputText
                            onChange={handleInput}
                            name="genres"
                            value={data?.genres}
                            width="w-[500px]"
                            placeholder="Action, Adventure, RPG . . . "
                        />
                    </div>
                    <div className="py-2">
                        <h1>Link Game</h1>
                        <InputText
                            onChange={handleInput}
                            name="link"
                            value={data?.link}
                            width="w-[500px]"
                            placeholder="https://www.instagram.com/ricogann"
                        />
                    </div>
                    <div className="py-2">
                        <h1>Poster</h1>
                        <InputFile
                            onChange={handleInput}
                            name="gambar"
                            value={gambarName}
                        />
                    </div>
                    <button
                        className="py-2 px-5 mt-5 rounded-xl bg-red-500"
                        onClick={handleCreate}
                    >
                        <h1 className="text-[15px] font-semibold">Simpan</h1>
                    </button>
                </div>
            </div>
            <Image
                src={landing}
                alt="landing"
                className="absolute -right-52 -top-42 w-[70%]"
            ></Image>
        </div>
    );
}
