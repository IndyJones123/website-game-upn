"use client";
import SideNavbar from "@/components/side-navbar";

import { useSearchParams } from "next/navigation";

import { Auth } from "@/lib/auth";
import { useState } from "react";
import Loading from "@/components/loading";
export default function Layout({ children }: { children: React.ReactNode }) {
    const query = useSearchParams();
    const name = query.get("game");
    const auth = new Auth();
    auth.isLoginTeacher();
    const [isLoading, setIsLoading] = useState(false);
    const handleLoading = (pathname: string) => {
        setIsLoading(true);
        if (pathname === "/admin/dialogue") {
            setIsLoading(false);
        }
    };
    return (
        <div className="relative flex h-screen flex-col md:flex-row md:overflow-hidden">
            {isLoading && (
                <div className="fixed w-screen h-screen flex justify-center items-center z-50 backdrop-blur-md">
                    <Loading />
                </div>
            )}
            <div className="">
                <SideNavbar name={name} onClick={handleLoading} />
            </div>
            <div className="">{children}</div>
        </div>
    );
}
