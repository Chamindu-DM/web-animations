import React from "react";
import HungerLinkLogo from "../assets/HungerLink_Logo.svg";
import { Button } from "./Button";
import { Download, Menu } from "lucide-react";

export const Navbar = () => {
    return(
        <header className="sticky bg-white/50 backdrop-blur-md top-0 z-50 w-full flex justify-center items-center">
            <nav className="w-full max-w-3xl px-4 sm:px-6 py-3 rounded-none flex items-center justify-between gap-2 sm:gap-6">
                <a href="#" className="flex items-center flex-shrink-0">
                    <img
                        src={HungerLinkLogo}
                        alt="HungerLink Logo"
                        className="h-8 sm:h-9 w-auto object-contain"
                    />
                </a>
                
                <div className="flex items-center gap-2 sm:gap-3">
                    <Button
                        variant="secondary"
                        className="hidden sm:inline-flex"
                    >
                    Contact
                    </Button>
                    <Button
                        variant="primary"
                        icon={Download}
                    >
                        <span className="hidden sm:inline">Download App</span>
                        <span className="sm:hidden">App</span>
                    </Button>
                    <Button
                        variant="secondary"
                        icon={Menu}
                        isIconOnly
                        aria-label="Open menu"
                    />
                </div>
            </nav>
        </header>
    );
};

export default Navbar;