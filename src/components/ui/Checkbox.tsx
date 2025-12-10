"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface CheckboxProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    label?: string;
    className?: string;
}

export function Checkbox({
    checked,
    onChange,
    label,
    className = "",
}: CheckboxProps) {
    return (
        <label className={`flex cursor-pointer items-center gap-3 ${className}`}>
            <div
                onClick={() => onChange(!checked)}
                className={`relative flex h-5 w-5 items-center justify-center rounded border-2 transition-colors duration-200 ${checked
                        ? "border-gray-900 bg-gray-900"
                        : "border-gray-300 bg-white hover:border-gray-400"
                    }`}
            >
                <motion.div
                    initial={false}
                    animate={{
                        scale: checked ? 1 : 0,
                        opacity: checked ? 1 : 0,
                    }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                >
                    <Check className="h-3 w-3 text-white" strokeWidth={3} />
                </motion.div>
            </div>
            {label && (
                <span className="text-sm text-gray-700 select-none">{label}</span>
            )}
        </label>
    );
}
