"use client";

import { useState, useRef, useEffect, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface DropdownMenuProps {
    trigger: ReactNode;
    children: ReactNode;
    align?: "left" | "right" | "center";
    className?: string;
}

export function DropdownMenu({
    trigger,
    children,
    align = "left",
    className = "",
}: DropdownMenuProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const alignClasses = {
        left: "left-0",
        right: "right-0",
        center: "left-1/2 -translate-x-1/2",
    };

    return (
        <div ref={dropdownRef} className={`relative inline-block ${className}`}>
            <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className={`absolute top-full z-50 mt-2 min-w-[180px] overflow-hidden rounded-xl bg-white py-1 shadow-xl ring-1 ring-black/5 ${alignClasses[align]}`}
                    >
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

interface DropdownMenuItemProps {
    children: ReactNode;
    onClick?: () => void;
    icon?: ReactNode;
    disabled?: boolean;
    className?: string;
}

export function DropdownMenuItem({
    children,
    onClick,
    icon,
    disabled = false,
    className = "",
}: DropdownMenuItemProps) {
    return (
        <motion.button
            whileHover={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
            onClick={onClick}
            disabled={disabled}
            className={`flex w-full items-center gap-2 px-4 py-2 text-left text-sm transition-colors ${disabled
                    ? "cursor-not-allowed text-gray-400"
                    : "text-gray-700 hover:text-gray-900"
                } ${className}`}
        >
            {icon && <span className="flex-shrink-0">{icon}</span>}
            <span>{children}</span>
        </motion.button>
    );
}

interface DropdownMenuSeparatorProps {
    className?: string;
}

export function DropdownMenuSeparator({ className = "" }: DropdownMenuSeparatorProps) {
    return <div className={`my-1 h-px bg-gray-200 ${className}`} />;
}

interface DropdownMenuLabelProps {
    children: ReactNode;
    className?: string;
}

export function DropdownMenuLabel({ children, className = "" }: DropdownMenuLabelProps) {
    return (
        <div
            className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider text-gray-500 ${className}`}
        >
            {children}
        </div>
    );
}
