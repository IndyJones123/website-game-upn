import { IoLogoPlaystation } from "react-icons/io5";
import { FaGamepad } from "react-icons/fa";
import Link from "next/link";

import { SideNav } from "@/interfaces";

import { Auth } from "@/lib/auth";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const SideNavbar: React.FC<SideNav> = ({ name, onClick }) => {
    const [role, setRole] = useState("");
    const pathname = usePathname();
    useEffect(() => {
        const auth = new Auth();
        setRole(auth.checkRole());
    }, []);
    return (
        <div className="relative w-[50px] h-screen bg-black font-poppins p-4 flex flex-col justify-between px-16">
            <div className="flex flex-col items-center gap-14 text-white text-[15px]">
                <IoLogoPlaystation className="w-10 h-10 " />
                <button
                    onClick={() =>
                        onClick(
                            role === "student" ? "/detail" : "/admin/detail"
                        )
                    }
                >
                    <Link
                        href={{
                            pathname: `${
                                role === "student" ? "" : "/admin"
                            }/detail`,
                            query: { game: name },
                        }}
                    >
                        <h1 className="">Detail</h1>
                    </Link>
                </button>
                <div
                    className={`${
                        role === "student" ? "hidden" : ""
                    } flex flex-col items-center gap-14`}
                >
                    <button onClick={() => onClick("/admin/quest")}>
                        <Link
                            href={{
                                pathname: "/admin/quest",
                                query: { game: name },
                            }}
                        >
                            <h1 className="">Quest</h1>
                        </Link>
                    </button>
                    <button onClick={() => onClick("/admin/dialogue")}>
                        <Link
                            href={{
                                pathname: "/admin/dialogue",
                                query: { game: name },
                            }}
                        >
                            <h1 className="">Dialogue</h1>
                        </Link>
                    </button>
                    <button onClick={() => onClick("/admin/users")}>
                        <Link
                            href={{
                                pathname: "/admin/users",
                                query: { game: name },
                            }}
                        >
                            <h1 className="">Users</h1>
                        </Link>
                    </button>
                </div>
                <button
                    onClick={() => onClick(role === "student" ? "/" : "/admin")}
                >
                    <Link
                        href={{
                            pathname: `${role === "student" ? "/" : "/admin"}`,
                        }}
                    >
                        <h1>Home</h1>
                    </Link>
                </button>
            </div>
            <div className="text-white flex flex-col items-center gap-5">
                <h1>{role}</h1>
                <FaGamepad className="w-10 h-10" />
            </div>
        </div>
    );
};

export default SideNavbar;
