"use client";

import { useState, createContext, useContext, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";

interface AccordionContextType {
    openItems: string[];
    toggleItem: (id: string) => void;
    type: "single" | "multiple";
}

const AccordionContext = createContext<AccordionContextType | null>(null);

interface AccordionProps {
    children: ReactNode;
    type?: "single" | "multiple";
    defaultOpen?: string[];
    className?: string;
}

export function Accordion({
    children,
    type = "single",
    defaultOpen = [],
    className = "",
}: AccordionProps) {
    const [openItems, setOpenItems] = useState<string[]>(defaultOpen);

    const toggleItem = (id: string) => {
        if (type === "single") {
            setOpenItems((prev) => (prev.includes(id) ? [] : [id]));
        } else {
            setOpenItems((prev) =>
                prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
            );
        }
    };

    return (
        <AccordionContext.Provider value={{ openItems, toggleItem, type }}>
            <div className={className}>{children}</div>
        </AccordionContext.Provider>
    );
}

interface AccordionItemProps {
    value: string;
    children: ReactNode;
    className?: string;
}

export function AccordionItem({ value, children, className = "" }: AccordionItemProps) {
    const context = useContext(AccordionContext);
    if (!context) throw new Error("AccordionItem must be used within Accordion");

    const { openItems } = context;
    const isOpen = openItems.includes(value);

    return (
        <div
            className={`group transition-all duration-300 ${isOpen
                    ? "bg-gray-900 text-white rounded-full my-1"
                    : "border-b border-gray-200"
                } ${className}`}
        >
            {children}
        </div>
    );
}

interface AccordionTriggerProps {
    value: string;
    index: number;
    children: ReactNode;
    className?: string;
}

export function AccordionTrigger({
    value,
    index,
    children,
    className = "",
}: AccordionTriggerProps) {
    const context = useContext(AccordionContext);
    if (!context) throw new Error("AccordionTrigger must be used within Accordion");

    const { openItems, toggleItem } = context;
    const isOpen = openItems.includes(value);

    return (
        <button
            onClick={() => toggleItem(value)}
            className={`flex w-full items-center justify-between py-4 px-4 text-left transition-all duration-300 ${className}`}
        >
            <div className="flex items-center gap-6">
                <span
                    className={`flex h-10 w-10 items-center justify-center rounded-full border ${isOpen
                            ? "border-white text-white"
                            : "border-gray-300 text-gray-600"
                        } text-sm font-medium`}
                >
                    {index}
                </span>
                <span className="text-sm font-medium uppercase tracking-wider">
                    {children}
                </span>
            </div>
            <span
                className={`flex h-10 w-10 items-center justify-center rounded-full ${isOpen ? "bg-white text-gray-900" : "border border-gray-300"
                    } transition-all duration-300`}
            >
                {isOpen ? (
                    <ArrowRight size={16} />
                ) : (
                    <ChevronDown size={16} />
                )}
            </span>
        </button>
    );
}

interface AccordionContentProps {
    value: string;
    children: ReactNode;
    className?: string;
}

export function AccordionContent({
    value,
    children,
    className = "",
}: AccordionContentProps) {
    const context = useContext(AccordionContext);
    if (!context) throw new Error("AccordionContent must be used within Accordion");

    const { openItems } = context;
    const isOpen = openItems.includes(value);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                >
                    <div className={`px-4 pb-4 pt-0 ${className}`}>{children}</div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
