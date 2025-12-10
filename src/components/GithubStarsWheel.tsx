"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

interface GithubStarsWheelProps {
    count?: number;
    className?: string;
}

export function GithubStarsWheel({ count = 1362, className = "" }: GithubStarsWheelProps) {
    const numStars = 12;
    const radius = 60;

    return (
        <div className={`relative ${className}`}>
            {/* Rotating stars wheel */}
            <motion.div
                className="relative"
                style={{ width: radius * 2 + 40, height: radius * 2 + 40 }}
                animate={{ rotate: 360 }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                }}
            >
                {Array.from({ length: numStars }).map((_, i) => {
                    const angle = (i / numStars) * Math.PI * 2;
                    const x = Math.cos(angle) * radius;
                    const y = Math.sin(angle) * radius;

                    return (
                        <motion.div
                            key={i}
                            className="absolute"
                            style={{
                                left: "50%",
                                top: "50%",
                                x: x - 8,
                                y: y - 8,
                            }}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1, duration: 0.3 }}
                        >
                            <Star
                                size={16}
                                className={`${i % 3 === 0
                                        ? "fill-yellow-400 text-yellow-400"
                                        : i % 3 === 1
                                            ? "fill-gray-300 text-gray-300"
                                            : "fill-gray-500 text-gray-500"
                                    }`}
                            />
                        </motion.div>
                    );
                })}
            </motion.div>

            {/* Center count */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        className="flex flex-col items-center"
                    >
                        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400 mb-1" />
                        <span className="text-lg font-bold text-gray-900">
                            {count.toLocaleString()}
                        </span>
                        <span className="text-xs text-gray-500 uppercase tracking-wider">
                            Stars
                        </span>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
