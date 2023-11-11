import React, { useState } from "react";
import Image from "next/image";
import logoFooter from "../../public/logo-white.png";

const Footer = () => {
    return (
        <div className="w-screen p-6 bg-black flex items-center justify-center gap-3 text-white">
            <h1 className="font-bold">Developed By </h1>
            <button
                onClick={() => window.open("https://instagram.com/ricogann")}
            >
                <Image
                    src={logoFooter}
                    alt="logo-footer"
                    className="w-[50px] h-10 mt-1"
                ></Image>
            </button>
        </div>
    );
};

export default Footer;
