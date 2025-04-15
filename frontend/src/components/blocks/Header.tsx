import React, { useState, useEffect } from "react";
// @ts-ignore
import Github from "@/components/ui/star.tsx";

const Header: React.FC = () => {
    const [scrollingDown, setScrollingDown] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > lastScrollY) {
                setScrollingDown(true);
            } else {
                setScrollingDown(false);
            }
            setLastScrollY(window.scrollY);
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 bg-white transition-transform duration-300 shadow-md ${
                scrollingDown ? "-translate-y-full" : "translate-y-0"
            }`}
        >
            <div className="flex justify-between items-center p-2">
                <a href="https://klubi.com.br"><img src="src/assets/logo.png" alt="logo" className="h-10 w-auto" /></a>
                <Github></Github>
            </div>
        </header>
    );
};

export default Header;
