"use client";

import { useState, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface HoverCardProps {
    trigger: ReactNode;
    children: ReactNode;
    openDelay?: number;
    closeDelay?: number;
    className?: string;
}

export function HoverCard({
    trigger,
    children,
    openDelay = 200,
    closeDelay = 100,
    className = "",
}: HoverCardProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

    const handleMouseEnter = () => {
        if (timeoutId) clearTimeout(timeoutId);
        const id = setTimeout(() => setIsOpen(true), openDelay);
        setTimeoutId(id);
    };

    const handleMouseLeave = () => {
        if (timeoutId) clearTimeout(timeoutId);
        const id = setTimeout(() => setIsOpen(false), closeDelay);
        setTimeoutId(id);
    };

    return (
        <div
            className={`relative inline-block ${className}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {trigger}

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute left-1/2 top-full z-50 mt-3 -translate-x-1/2"
                    >
                        <div className="relative">
                            {/* Arrow */}
                            <div className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 bg-white shadow-lg" />

                            {/* Content */}
                            <div className="relative min-w-[280px] overflow-hidden rounded-xl bg-white p-4 shadow-xl ring-1 ring-black/5">
                                {children}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

interface HoverCardContentProps {
    children: ReactNode;
    className?: string;
}

export function HoverCardContent({ children, className = "" }: HoverCardContentProps) {
    return <div className={className}>{children}</div>;
}
