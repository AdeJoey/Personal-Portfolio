"use client";

import { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, AlertTriangle } from "lucide-react";

interface AlertDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    description: string;
    confirmText?: string;
    cancelText?: string;
    variant?: "default" | "destructive";
}

export function AlertDialog({
    isOpen,
    onClose,
    onConfirm,
    title,
    description,
    confirmText = "Confirm",
    cancelText = "Cancel",
    variant = "default",
}: AlertDialogProps) {
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
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 shadow-2xl"
                    >
                        <div className="flex items-start gap-4">
                            {variant === "destructive" && (
                                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-red-100">
                                    <AlertTriangle className="h-5 w-5 text-red-600" />
                                </div>
                            )}
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                                <p className="mt-2 text-sm text-gray-600">{description}</p>
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                onClick={onClose}
                                className="rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
                            >
                                {cancelText}
                            </button>
                            <button
                                onClick={() => {
                                    onConfirm();
                                    onClose();
                                }}
                                className={`rounded-full px-4 py-2 text-sm font-medium text-white transition-colors ${variant === "destructive"
                                        ? "bg-red-600 hover:bg-red-700"
                                        : "bg-gray-900 hover:bg-gray-800"
                                    }`}
                            >
                                {confirmText}
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

interface AlertDialogTriggerProps {
    children: ReactNode;
    onClick: () => void;
    className?: string;
}

export function AlertDialogTrigger({
    children,
    onClick,
    className = "",
}: AlertDialogTriggerProps) {
    return (
        <button onClick={onClick} className={className}>
            {children}
        </button>
    );
}
