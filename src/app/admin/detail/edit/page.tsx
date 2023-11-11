"use client";
import InputFile from "@/components/input-file";
import InputText from "@/components/input-text";
import Image from "next/image";
import landing from "../../../../../public/landing.png";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Game } from "@/services/game";

import { GameData } from "@/interfaces";
import Loading from "@/components/loading";

export default function Edit() {
    const query = useSearchParams();
    const name = query.get("game");
    const [data, setData] = useState<GameData>({
        name: "",
        description: "",
        genres: [],
        link: "",
        gambar: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [file, setFile] = useState<File>();
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

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setData((prevData) => {
            if (!prevData) return prevData;
            return { ...prevData, [name]: value };
        });
    };

    const handleInputFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, files } = e.target;

        setData((prevData) => {
            if (!prevData || !files) return prevData;
            setFile(files[0]);
            return { ...prevData, [name]: files[0].name };
        });
    };

    const handleEdit = async () => {
        setIsLoading(true);
        const formData = new FormData();
        const game = new Game();
        if (
            data.name === "" ||
            data.description === "" ||
            data.genres.length === 0 ||
            data.link === "" ||
            data.gambar === ""
        ) {
            alert("Data tidak boleh kosong");
            setIsLoading(false);
            return;
        } else if (file === undefined) {
            formData.append("name", data.name);
            formData.append("description", data.description);
            formData.append("genres", data.genres as unknown as string);
            formData.append("link", data.link);
            formData.append("gambar", "");
            formData.append("oldGambar", data.gambar as string);
            if (!name) return;
            await game.update(name, formData);
        } else {
            formData.append("name", data.name);
            formData.append("description", data.description);
            formData.append("genres", data.genres as unknown as string);
            formData.append("link", data.link);
            formData.append("gambar", file);
            formData.append("oldGambar", data.gambar as string);
            if (!name) return;
            await game.update(name, formData);
        }
    };
    return (
        <div className="h-screen w-screen flex items-center bg-[#141414] text-white relative">
            {isLoading && (
                <div className="fixed w-screen h-screen flex justify-center items-center z-50 backdrop-blur-md">
                    <Loading />
                </div>
            )}
            <div className="p-14">
                <div className="">
                    <h1 className="text-4xl font-bold text-white">Edit Page</h1>

                    <div className="py-2">
                        <h1>Judul Game</h1>
                        <InputText
                            onChange={handleInput}
                            name={"name"}
                            value={data?.name}
                            width="w-[500px]"
                        />
                    </div>
                    <div className="py-2">
                        <h1>Deskripsi</h1>
                        <InputText
                            onChange={handleInput}
                            name={"description"}
                            value={data?.description}
                            width="w-[500px]"
                        />
                    </div>
                    <div className="py-2">
                        <h1>Genre</h1>
                        <InputText
                            onChange={handleInput}
                            name="genres"
                            value={data?.genres}
                            width="w-[500px]"
                        />
                    </div>
                    <div className="py-2">
                        <h1>Link Game</h1>
                        <InputText
                            onChange={handleInput}
                            name="link"
                            value={data?.link}
                            width="w-[500px]"
                        />
                    </div>
                    <div className="py-2">
                        <h1>Poster</h1>
                        <InputFile
                            onChange={handleInputFile}
                            name="gambar"
                            value={data?.gambar}
                        />
                    </div>
                    <button
                        className="py-2 px-5 mt-5 rounded-xl bg-red-500"
                        onClick={handleEdit}
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
