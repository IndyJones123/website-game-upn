import React from "react";
import { IoLogoPlaystation } from "react-icons/io5";
import { FaGamepad } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import InputSearch from "./input-search";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Auth } from "@/lib/auth";
import { Cookie } from "@/lib/cookies";

import { Account, Navbar } from "@/interfaces";

const Navbar: React.FC<Navbar> = ({ onClick }) => {
    const router = useRouter();
    const [isLogin, setIsLogin] = useState(false);
    const [account, setAccount] = useState<Account | null>(null);

    useEffect(() => {
        const auth = new Auth();
        const cookie = new Cookie();

        const data: Account | null = auth.parse();
        setAccount(data);

        const isLogin = auth.checkLogin();
        if (isLogin) {
            setIsLogin(true);
        }
    }, []);

    const Logout = () => {
        const logout = new Cookie();
        logout.erase("CERT");
        setIsLogin(false);
        window.location.reload();
    };

    const Login = () => {
        onClick();
        router.push("/auth");
    };
    return (
        <div className="w-full bg-black font-poppins p-4 flex justify-between px-44">
            <div className="flex items-center gap-16 text-white text-[15px]">
                <IoLogoPlaystation className="w-10 h-10 " />
                <button className="">Daftar Game</button>
            </div>
            <div className="mr-12">
                <InputSearch />
            </div>
            <div className="text-white flex items-center gap-5">
                <button className={`${isLogin ? "block" : "hidden"}`}>
                    {account?.role}
                </button>
                <button
                    className={`${isLogin ? "hidden" : "block"}`}
                    onClick={Login}
                >
                    Login
                </button>
                <FaGamepad className="w-10 h-10" />
                <button
                    className={`${isLogin ? "block" : "hidden"}`}
                    onClick={Logout}
                >
                    <FiLogOut className="w-6 h-6" />
                </button>
            </div>
        </div>
    );
};

export default Navbar;
