"use client";

import landing from "../../../public/landing.png";
import Image from "next/image";
import { useState } from "react";
import InputText from "@/components/input-text";
import InputPassword from "@/components/input-password";

import { useRouter } from "next/navigation";

import { BsFillArrowLeftCircleFill } from "react-icons/bs";

import { AuthLogin, AuthRegister } from "@/interfaces";

import { Auth } from "@/services/auth";

import Loading from "@/components/loading";

export default function Home() {
    const auth = new Auth();
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isRegister, setIsRegister] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === "email") setEmail(value);
        if (name === "username") setUsername(value);
        if (name === "password") setPassword(value);
    };

    const handleLogin = async () => {
        setIsLoading(true);
        const authLogin: AuthLogin = {
            username,
            password,
        };
        const res = await auth.login(authLogin);
        if (res.status === false) {
            setIsLoading(false);
            alert(res.message);
        }
    };

    const handleRegister = async () => {
        const authRegister: AuthRegister = {
            email,
            username,
            password,
        };
        const res = await auth.register(authRegister);
        if (res.status === true) setIsRegister(false);
    };

    return (
        <main className="relative w-screen bg-[#141414] overflow-hidden">
            {isLoading && (
                <div className="absolute w-screen h-screen flex justify-center items-center z-50 backdrop-blur-sm">
                    <Loading />
                </div>
            )}
            <div className="relative h-screen px-44 flex items-center">
                <button
                    className="absolute left-20 top-10 flex items-center gap-3"
                    onClick={() => {
                        setIsLoading(true);
                        router.back();
                    }}
                >
                    <BsFillArrowLeftCircleFill className="w-8 h-8 text-white" />
                </button>
                <div
                    className={`relative h-screen flex items-center justify-center overflow-hidden text-black gap-24}`}
                >
                    <div className="border-2 p-8 rounded-xl border-white bg-transparent text-white">
                        <div className="flex flex-col items-start justify-center mb-7">
                            <h1 className=" font-semibold mb-3 text-[40px] ">
                                Login
                            </h1>
                            <div className="flex flex-col gap-3">
                                <div className="md:flex md:gap-3 md:flex-col">
                                    <div
                                        className={`${
                                            isRegister ? "block" : "hidden"
                                        }`}
                                    >
                                        <h1 className="text-[20px] mb-1">
                                            email
                                        </h1>
                                        <InputText
                                            onChange={handleChange}
                                            name="email"
                                            value={email}
                                            placeholder="Input Email..."
                                        />
                                    </div>
                                    <div className="">
                                        <h1 className="text-[20px] mb-1">
                                            username
                                        </h1>
                                        <InputText
                                            onChange={handleChange}
                                            name="username"
                                            value={username}
                                            width="w-[500px]"
                                            placeholder="Input Username..."
                                        />
                                    </div>
                                    <div className="">
                                        <h1 className="text-[20px] mb-1">
                                            password
                                        </h1>
                                        <InputPassword
                                            onChange={handleChange}
                                            name="password"
                                            value={password}
                                        />
                                    </div>
                                </div>

                                <div
                                    className={`mt-5 ${
                                        isRegister ? "hidden" : "block"
                                    }`}
                                >
                                    <button
                                        className="border border-black w-full bg-[#FF4C29] p-2 rounded-lg text-white font-bold uppercase"
                                        onClick={handleLogin}
                                    >
                                        LOGIN
                                    </button>
                                </div>
                                <div
                                    className={`mt-5 ${
                                        isRegister ? "block" : "hidden"
                                    }`}
                                >
                                    <button
                                        className="border border-black w-full bg-[#FF4C29] p-2 rounded-lg text-white font-bold uppercase"
                                        onClick={handleRegister}
                                    >
                                        REGISTER
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div
                            className={`text-white flex items-center gap-3 ${
                                isRegister ? "hidden" : "block"
                            }`}
                        >
                            <h1>Doesnt Have Account?</h1>
                            <button
                                className="text-[#FF4C29] font-bold"
                                onClick={() => setIsRegister(true)}
                            >
                                Register
                            </button>
                        </div>
                        <div
                            className={`text-white flex items-center gap-3 ${
                                isRegister ? "block" : "hidden"
                            }`}
                        >
                            <h1>Does Have Account?</h1>
                            <button
                                className="text-[#FF4C29] font-bold"
                                onClick={() => setIsRegister(false)}
                            >
                                Login
                            </button>
                        </div>
                    </div>
                </div>
                <Image
                    src={landing}
                    alt="landing"
                    className="absolute -right-72 -top-42 w-[70%]"
                ></Image>
            </div>
        </main>
    );
}
