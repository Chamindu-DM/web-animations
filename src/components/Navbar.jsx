import React from "react";
import HungerLinkLogo from "../assets/HungerLink_Logo.svg";
import { Button } from "./Button";
import { Download, Menu } from "lucide-react";

export const Navbar = () => {
    return(
        <header className="sticky bg-white/50 backdrop-blur-md top-0 z-50 w-full flex justify-center items-center">
            <nav className="w-full max-w-3xl px-6 py-3 rounded-none flex items-center justify-between gap-6">
                <a href="#" className="flex items-center">
                    <img
                        src={HungerLinkLogo}
                        alt="HungerLink Logo"
                        className="h-9 w-auto object-contain"
                    />
                </a>
                
                <div className="flex items-center gap-3">
                    <Button
                        variant="secondary"
                    >
                    Contact
                    </Button>
                    <Button
                        variant="primary"
                        icon={Download}
                    >
                        Download App
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