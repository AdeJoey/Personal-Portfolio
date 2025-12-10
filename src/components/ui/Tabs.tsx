"use client";

import { useState, createContext, useContext, ReactNode } from "react";
import { motion } from "framer-motion";

interface TabsContextType {
    activeTab: string;
    setActiveTab: (id: string) => void;
}

const TabsContext = createContext<TabsContextType | null>(null);

interface TabsProps {
    defaultValue: string;
    children: ReactNode;
    className?: string;
}

export function Tabs({ defaultValue, children, className = "" }: TabsProps) {
    const [activeTab, setActiveTab] = useState(defaultValue);

    return (
        <TabsContext.Provider value={{ activeTab, setActiveTab }}>
            <div className={className}>{children}</div>
        </TabsContext.Provider>
    );
}

interface TabsListProps {
    children: ReactNode;
    className?: string;
}

export function TabsList({ children, className = "" }: TabsListProps) {
    return (
        <div
            className={`relative inline-flex items-center gap-0 rounded-full border border-gray-300 p-1 ${className}`}
        >
            {children}
        </div>
    );
}

interface TabsTriggerProps {
    value: string;
    children: ReactNode;
    className?: string;
}

export function TabsTrigger({ value, children, className = "" }: TabsTriggerProps) {
    const context = useContext(TabsContext);
    if (!context) throw new Error("TabsTrigger must be used within Tabs");

    const { activeTab, setActiveTab } = context;
    const isActive = activeTab === value;

    return (
        <button
            onClick={() => setActiveTab(value)}
            className={`relative z-10 px-6 py-2 text-xs font-medium uppercase tracking-wider transition-colors duration-300 ${isActive ? "text-white" : "text-gray-700 hover:text-gray-900"
                } ${className}`}
        >
            {isActive && (
                <motion.div
                    layoutId="tab-indicator"
                    className="absolute inset-0 rounded-full bg-gray-900"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 35 }}
                />
            )}
            <span className="relative z-10">{children}</span>
        </button>
    );
}

interface TabsContentProps {
    value: string;
    children: ReactNode;
    className?: string;
}

export function TabsContent({ value, children, className = "" }: TabsContentProps) {
    const context = useContext(TabsContext);
    if (!context) throw new Error("TabsContent must be used within Tabs");

    const { activeTab } = context;

    if (activeTab !== value) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
