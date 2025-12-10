"use client";

import { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface DialogProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    title?: string;
    className?: string;
}

export function Dialog({
    isOpen,
    onClose,
    children,
    title,
    className = "",
}: DialogProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={onClose}
                        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
                    />

                    {/* Dialog */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className={`fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white shadow-2xl ${className}`}
                    >
                        {/* Header */}
                        {title && (
                            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                                <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
                                <button
                                    onClick={onClose}
                                    className="flex h-8 w-8 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
                                >
                                    <X size={18} />
                                </button>
                            </div>
                        )}

                        {/* Content */}
                        <div className="p-6">{children}</div>

                        {/* Close button if no title */}
                        {!title && (
                            <button
                                onClick={onClose}
                                className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
                            >
                                <X size={18} />
                            </button>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

interface DialogTriggerProps {
    children: ReactNode;
    onClick: () => void;
    className?: string;
}

export function DialogTrigger({
    children,
    onClick,
    className = "",
}: DialogTriggerProps) {
    return (
        <button onClick={onClick} className={className}>
            {children}
        </button>
    );
}
